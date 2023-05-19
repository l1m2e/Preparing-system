<script lang="ts" setup>
import dayjs from 'dayjs'
import UploadModal from './components/upload-modal.vue'
import type { File } from '~/components/file-manager/interface'
import type { CoursewareVo } from '~/api/api'
// import { setReactive } from '~/utils'

const fileList = ref<Array<File>>([]) // 文件列表
const isMe = ref(true) // 是否是共享文件夹
const selectFile = ref<Array<number>>([]) // 选中的列表
let courseName = '' // 课程名

// 面包屑展示文件路径
const breadcrumbList = reactive([{ title: '我的课件库', id: -1 }])
const breadcrumbLastId = computed(() => breadcrumbList.slice().pop()?.id || 0)
const isHome = computed(() => breadcrumbList.length === 1)

const clickBreadcrumb = (id: number) => {
	selectFile.value.length = 0
	const index = breadcrumbList.findIndex((item) => item.id === id)

	if (index !== -1) breadcrumbList.splice(index + 1)

	fileList.value.length = 0
	update()
}

// 获取本学期科目列表
const getCourse = async () => {
	const res = await api.courseTable.getCourseNameBySemester()
	const formatData = res.data.map((item) => ({ fileName: item, id: 0, fid: -1, createdTimestamp: dayjs().valueOf(), type: 0 }))
	fileList.value = formatData
}
getCourse()

// 根据课程名称获取文件列表
const getFileList = async (id: number) => {
	const res = await api.courseware.queryCourseware({ courseName, id })

	if (res.status === 200) {
		fileList.value = res.data.records.map((item) => formatFile(item))
		return true
	}

	return false
}

// 上传文件
const uploadModalRef = ref()

const uploadSuccess = (fileIdList: Array<number>) => {
	console.log(fileIdList)
}

// 新建文件夹
const createdFolderShow = ref(false)
// 新建按钮
const createdBtnMenu = [
	{ name: '新建文件夹', icon: 'i-ri-folder-open-line', click: () => (createdFolderShow.value = true) },
	{ name: '上传文件', icon: 'i-ri-upload-2-line', click: () => uploadModalRef.value.open() }
]

const createdFolderOk = async (name: string) => {
	const res = await api.courseware.addFileH({ fid: breadcrumbLastId.value, courseName, coursewareName: name })
	if (res.status === 200) {
		fileList.value.unshift(formatFile(res.data))
		createdFolderShow.value = false
	} else {
		Message.error('新建文件夹失败')
	}
}

const formatFile = (data: CoursewareVo) => {
	const { updateTimestamp: createdTimestamp, coursewareName: fileName, id, fid, shareType, folderFlag } = data
	return { createdTimestamp, fileName, id, fid, shareType, type: folderFlag ? 0 : 1 }
}

// 打开文件夹
const openFile = (data: File) => {
	const { fileName, id, fid } = data
	// 第一层 科目文件夹
	if (fid === -1) courseName = fileName
	breadcrumbList.push({ title: fileName, id })
	selectFile.value.length = 0
	getFileList(data.id)
}

//删除选中的文件或者文件夹
const deleteFile = async (data: number | Array<number>) => {
	const res = await api.courseware.delCourseware(Array.isArray(data) ? data : [data])
	if (res.status === 200) {
		Message.success('删除成功')
		update()
		return
	}
	Message.error('删除失败')
}

//刷新数据
const update = () => {
	if (isHome.value) {
		getCourse()
	} else {
		getFileList(breadcrumbLastId.value)
	}
}

//切换课件库
const switchingLibrary = () => {
	const titleName = isMe.value ? '我的课件库' : '共享课件库'
	breadcrumbList[0].title = titleName
}

// 重命名文件夹
const resetFolderNameShow = ref(false)
let folderId = 0

const openResetFolderName = (id: number) => {
	folderId = id
	resetFolderNameShow.value = true
}
const resetFolderName = async (coursewareName: string) => {
	const res = await api.courseware.updateCourseware({ id: folderId, coursewareName })
	if (res.status === 200) {
		update()
		Message.success('重命名文件夹成功')
		resetFolderNameShow.value = false
	}
}
</script>

<template>
	<div class="box-border rounded mt-10px bg-[var(--color-bg-2)] select-none p-10px">
		<!-- 头部导航栏 -->
		<div class="flex justify-between items-center">
			<div>
				<a-dropdown trigger="hover" :disabled="isHome">
					<div
						class="btn p-y-10px rounded-xl bg-blue-5 hover:bg-blue-4"
						:class="isHome && ' cursor-not-allowed bg-gray1 text-gray hover:bg-gray1! dark:(bg-dark1 hover:bg-dark1!)'">
						新建
					</div>
					<template #content>
						<a-doption v-for="item in createdBtnMenu" @click="item.click">
							<div class="center">
								<div class="mr-10px" :class="item.icon"></div>
								<span>{{ item.name }}</span>
							</div>
						</a-doption>
					</template>
				</a-dropdown>
				<a-breadcrumb separator=">" :max-count="4" class="ml-10px">
					<a-breadcrumb-item v-for="item in breadcrumbList" @click="clickBreadcrumb(item.id)">{{ item.title }}</a-breadcrumb-item>
				</a-breadcrumb>
			</div>

			<div>
				<a-radio-group type="button" size="large" v-model="isMe" @change="switchingLibrary">
					<a-radio :value="true">我的课件库</a-radio>
					<a-radio :value="false">共享课件库</a-radio>
				</a-radio-group>
			</div>
		</div>
		<div>
			<div class="h-80vh w-100%">
				<FileManger
					@delete="deleteFile"
					@open="openFile"
					@refresh="update"
					@created="createdFolderShow = true"
					@resetFolderName="openResetFolderName"
					v-model="selectFile"
					:file-list="fileList"
					:disabled="isHome"></FileManger>
			</div>
		</div>
		<UploadModal ref="uploadModalRef" @ok="uploadSuccess" />
		<InputModel title="新建文件夹" v-model="createdFolderShow" @ok="createdFolderOk" placeholder="请输入新建文件夹名称"></InputModel>
		<InputModel title="重命名文件夹" v-model="resetFolderNameShow" @ok="resetFolderName" placeholder="请输入新建文件夹名称"></InputModel>
	</div>
</template>
