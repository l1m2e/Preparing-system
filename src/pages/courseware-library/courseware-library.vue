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

// 文件路径
const breadcrumbList = reactive([{ title: '全部课程', id: 0 }])
const breadcrumbLastId = computed(() => breadcrumbList.slice().pop()?.id || 0)

const clickBreadcrumb = (id: number) => {
	const index = breadcrumbList.findIndex((item) => item.id === id)
	console.log(index)
	if (index !== -1) breadcrumbList.splice(index + 1)

	fileList.value.length = 0
	console.log(breadcrumbList)
	//如果是首页
	if (breadcrumbList.length === 0) return getCourse()
	getFileList(breadcrumbLastId.value)
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
		console.log(res.data)
		fileList.value = res.data.records.map((item) => formatFile(item))
	}
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
		console.log(res.data)
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
	const { fileName, id } = data
	// 第一层 科目文件夹
	if (data.fid === -1) {
		courseName = fileName
	}
	breadcrumbList.push({ title: fileName, id })
	getFileList(data.id)
}
</script>

<template>
	<div class="box-border rounded mt-10px bg-[var(--color-bg-2)] select-none p-10px">
		<!-- 头部导航栏 -->
		<div class="flex justify-between items-center">
			<div>
				<a-dropdown trigger="hover">
					<div class="btn p-y-10px rounded-xl bg-blue-5 hover:bg-blue-4">新建</div>
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
				<a-radio-group type="button" size="large" v-model="isMe">
					<a-radio :value="true">我的课件库</a-radio>
					<a-radio :value="false">共享课件库</a-radio>
				</a-radio-group>
			</div>
		</div>
		<div>
			<div class="h-80vh w-100%">
				<FileManger v-model="selectFile" :file-list="fileList" @open="openFile" disabled></FileManger>
			</div>
		</div>
		<UploadModal ref="uploadModalRef" @ok="uploadSuccess" />
		<InputModel title="新建文件夹" v-model="createdFolderShow" @ok="createdFolderOk"></InputModel>
	</div>
</template>
