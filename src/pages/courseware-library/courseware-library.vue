<script lang="ts" setup>
import dayjs from 'dayjs'
import UploadModal from './components/upload-modal.vue'
import type { File } from '~/components/file-manager/interface'
import type { Type课件返回类 } from '~/api/api'
import { baseUrl } from '~/config/baseUrl'
import MoveFileModal from './components/move-file-modal.vue'

const fileList = ref<Array<Type课件返回类>>([]) // 文件列表原始数据
const fileListFormat = ref<Array<File>>([]) // 文件列表格式化
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

	fileListFormat.value.length = 0
	update()
}

// 获取本学期科目列表
const getCourse = async () => {
	const res = await api.courseTable.getCourseNameBySemester()

	const formatData = res.data.map((item) => ({ fileName: item, id: 0, fid: -1, createdTimestamp: dayjs().valueOf(), type: 0 }))
	fileListFormat.value = formatData
}
getCourse()

// 根据课程名称获取文件列表
const getFileList = async (id: number) => {
	const res = await api.courseware.queryCourseware({ courseName, id })
	if (res.status === 200) {
		fileList.value = res.data.records
		fileListFormat.value = res.data.records.map((item) => formatFile(item))
		return true
	}
	return false
}

// 上传文件
const uploadModalRef = ref()

// 新建文件夹
const createdFolderShow = ref(false)

// 新建按钮
const createdBtnMenu = [
	{ name: '新建文件夹', icon: 'i-ri-folder-open-line', click: () => (createdFolderShow.value = true) },
	{ name: '上传文件', icon: 'i-ri-upload-2-line', click: () => uploadModalRef.value.open(breadcrumbList[1].title, breadcrumbLastId.value) }
]

const createdFolderOk = async (name: string) => {
	const res = await api.courseware.addFileH({ fid: breadcrumbLastId.value, courseName, coursewareName: name })
	if (res.status === 200) {
		fileListFormat.value.unshift(formatFile(res.data))
		createdFolderShow.value = false
	} else {
		Message.error('新建文件夹失败')
	}
}

const formatFile = (data: Type课件返回类) => {
	const { updateTimestamp: createdTimestamp, coursewareName: fileName, id, fid, shareType, folderFlag } = data
	return { createdTimestamp, fileName, id, fid, shareType, type: folderFlag ? 0 : 1 }
}

// 打开文件夹
const openFile = (data: File) => {
	const { fileName, id, fid } = data
	// 第一层 科目文件夹
	if (fid === -1) courseName = fileName
	if (data.type === 0) {
		//打开文件夹
		breadcrumbList.push({ title: fileName, id })
		selectFile.value.length = 0
		getFileList(data.id)
	} else {
		// 打开文件
		const fileExtension = data.fileName.split('.').pop()
		switch (fileExtension) {
			case 'png':
			case 'jpg':
			case 'svg':
				openImagePreview(data.id)
				break

			default:
				Message.success('暂时不支持打开该类型的文件,请下载后查看')
				break
		}
	}
}

//打开图片预览
const imagePreview = ref(false)
const imagePreviewSrc = ref('')

const openImagePreview = (id: number) => {
	const res = fileList.value.find((item) => item.id === id)
	if (res && res.srcId) {
		imagePreviewSrc.value = `${baseUrl.httpUrl}/file/download/courseware/teacher/${res.srcId}`
		imagePreview.value = true
	} else {
		Message.success('暂时无法查看')
	}
}

//删除选中的文件或者文件夹
const deleteFile = async (data: number | Array<number>) => {
	const res = await api.courseware.delCourseware(Array.isArray(data) ? data : [data])
	if (res.status === 200) {
		Message.success('删除成功')
		update()
		selectFile.value.length = 0
		return
	}
	Message.error('删除失败')
}

//刷新数据
const update = () => {
	selectFile.value.length = 0
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

// 移动文件夹
const moveFileModalRef = ref()

const singleMove = (id: number | Array<number>) => {
	if (!Array.isArray(id)) {
		selectFile.value = [id]
	}
	moveFileModalRef.value.open()
}

//题目icon样式
const fileIconTextList = [
	{ text: 'doc', icon: 'i-ri-file-word-2-line' },
	{ text: 'docx', icon: 'i-ri-file-word-2-line' },
	{ text: 'docm', icon: 'i-ri-file-word-2-line' },
	{ text: 'dotx', icon: 'i-ri-file-word-2-line' },
	{ text: 'dotm', icon: 'i-ri-file-word-2-line' },
	{ text: 'xls', icon: 'i-ri-file-word-2-line' },
	{ text: 'xlsm', icon: 'i-ri-file-excel-2-line' },
	{ text: 'xltx', icon: 'i-ri-file-excel-2-line' },
	{ text: 'xltm', icon: 'i-ri-file-excel-2-line' },
	{ text: 'xlsb', icon: 'i-ri-file-excel-2-line' },
	{ text: 'xlam', icon: 'i-ri-file-excel-2-line' },
	{ text: 'pptx', icon: 'i-ri-file-ppt-2-line' },
	{ text: 'pptm', icon: 'i-ri-file-ppt-2-line' },
	{ text: 'ppsx', icon: 'i-ri-file-ppt-2-line' },
	{ text: 'ppsm', icon: 'i-ri-file-ppt-2-line' },
	{ text: 'potx', icon: 'i-ri-file-ppt-2-line' },
	{ text: 'ppam', icon: 'i-ri-file-ppt-2-line' },
	{ text: 'PPt', icon: 'i-ri-file-ppt-2-line' },
	{ text: 'exe', icon: 'i-ri-terminal-window-line' },
	{ text: 'png', icon: 'i-ri-image-line' },
	{ text: 'jpg', icon: 'i-ri-image-line' },
	{ text: 'svg', icon: 'i-ri-image-line' },
	{ text: 'mp4', icon: 'i-ri-video-line' }
]
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
					@move="singleMove"
					v-model="selectFile"
					:file-list="fileListFormat"
					:disabled="isHome">
					<template #fileIcon="{ file }">
						<div
							class="w-30px h-30px absolute left-[calc(50%-15px)] top-40% text-white"
							:class="fileIconTextList.find((item) => item.text === file.fileName.split('.').pop())?.icon || 'i-ri-apps-2-fill'"></div>
						<div :class="`absolute w-30px  text-center left-[calc(50%-15px)] top-65% text-white `">
							{{ fileIconTextList.find((item) => item.text === file.fileName.split('.').pop())?.text || '未知' }}
						</div>
					</template>
				</FileManger>
			</div>
		</div>
		<UploadModal ref="uploadModalRef" @ok="update" />
		<InputModel title="新建文件夹" v-model="createdFolderShow" @ok="createdFolderOk" placeholder="请输入新建文件夹名称"></InputModel>
		<InputModel title="重命名文件夹" v-model="resetFolderNameShow" @ok="resetFolderName" placeholder="请输入新建文件夹名称"></InputModel>
		<a-image-preview :src="imagePreviewSrc" v-model:visible="imagePreview" />
		<MoveFileModal ref="moveFileModalRef" v-model="selectFile" @ok="update"></MoveFileModal>
	</div>
</template>
