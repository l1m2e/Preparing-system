<script lang="ts" setup>
import dayjs from 'dayjs'
import UploadModal from './components/upload-modal.vue'
import type { File } from '~/components/file-manager/interface'
import type { Type课件返回类 } from '~/api/api'
import { baseUrl } from '~/config/baseUrl'
import { useUserInfo } from '~/composables'
import MoveFileModal from './components/move-file-modal.vue'
import ShareSelect from './components/share-select.vue'
import { setReactive } from '~/utils'

const fileList = ref<Array<Type课件返回类>>([]) // 文件列表原始数据
const fileListFormat = ref<Array<File>>([]) // 文件列表格式化
const isMe = ref(true) // 是否是共享文件夹
const selectFile = ref<Array<number>>([]) // 选中的列表
const courseName = computed(() => breadcrumbList[1] && breadcrumbList[1].title) //课程名称

watch(isMe, () => {
	getCourse()
	breadcrumbList.length = 1
	selectFile.value.length = 0
})

interface BreadcrumbLastList {
	title: string
	id: string | number
}

// 面包屑展示文件路径
// 文件夹目录写死的层级 不参与请求 层级 -1001 全部 -1002 课程
const breadcrumbList = reactive<Array<BreadcrumbLastList>>([{ title: '我的课件库', id: -1001 }])
const breadcrumbLastId = computed(() => breadcrumbList.slice().pop()?.id || 0)
const isHome = computed(() => (isMe.value ? breadcrumbList.length === 1 : breadcrumbList.length <= 2))

const clickBreadcrumb = (id: number | string) => {
	clearFileList()
	resetPagination()
	const index = breadcrumbList.findIndex((item) => item.id === id)

	if (index !== -1) breadcrumbList.splice(index + 1)

	if (!isMe.value && id === -1002) return getTeacher()

	update()
}

// 获取本学期科目列表 或者分享的科目列表
const getCourse = async () => {
	const query = isMe.value ? api.courseTable.getCourseNameBySemester : api.courseware.getShareCourseName

	const res = await query()

	const formatData = res.data.map((item) => ({ fileName: item, id: -1002, fid: -1002, createdTimestamp: dayjs().valueOf(), type: 0 }))
	fileListFormat.value = formatData
}
getCourse()

const pagination = reactive({
	current: 1,
	size: 40,
	pages: 1
})

const resetPagination = () => setReactive(pagination, { current: 1, size: 40, pages: 1 })

// 根据课程名称获取文件列表
const getFileList = async () => {
	const teacherId = isMe.value ? '' : breadcrumbList[2] && (breadcrumbList[2].id as string)
	const type = isMe.value ? 0 : 1
	let id

	if (isMe.value) {
		id = breadcrumbList.length > 2 ? (breadcrumbLastId.value as number) : undefined
	} else {
		id = breadcrumbList.length > 3 ? (breadcrumbLastId.value as number) : undefined
	}

	const res = await api.courseware.queryCourseware({
		courseName: courseName.value,
		id,
		jobNum: teacherId || '',
		type,
		current: pagination.current,
		size: pagination.size
	})

	if (res.status === 200) {
		// fileList.value = res.data.records
		res.data.records.forEach((item) => fileList.value.push(item))
		res.data.records.map((item) => formatFile(item)).forEach((item) => fileListFormat.value.push(item))
		pagination.pages = res.data.pages || 1
	}

	return res.status === 200
}

// 下拉到底部加载更多
const scrollTobottomLoad = () => {
	/** 如果当前页大于总页数,则直接返回不请求 */
	pagination.current++
	if (pagination.current > pagination.pages) return

	console.log(pagination)

	if (isMe.value && breadcrumbLastId.value !== -1001) {
		getFileList()
	}

	if (!isMe.value && breadcrumbLastId.value !== -1001 && breadcrumbLastId.value !== -1002) {
		getFileList()
	}
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
	const res = await api.courseware.addFileH({
		fid: breadcrumbLastId.value === -1002 ? 0 : (breadcrumbLastId.value as number),
		courseName: courseName.value,
		coursewareName: name
	})
	if (res.status === 200) {
		fileListFormat.value.unshift(formatFile(res.data))
		createdFolderShow.value = false
	} else {
		Message.error('新建文件夹失败')
	}
}

const formatFile = (data: Type课件返回类) => {
	const { updateTimestamp: createdTimestamp, coursewareName: fileName, id, fid, shareType, folderFlag } = data
	return { createdTimestamp, fileName, id, fid, shareType, type: folderFlag ? 0 : 10 }
}

// 打开文件夹
const open = async (data: File) => {
	if (data.type === 0) {
		clearFileList()
		resetPagination()
		isMe.value ? openMeFolder(data) : openShareFolder(data)
	} else {
		openFile(data)
	}
}

// 我的文件夹： 全部文件 课程-> 文件
const openMeFolder = (file: File) => {
	const { fileName, id } = file
	breadcrumbList.push({ title: fileName, id })
	selectFile.value.length = 0
	if (breadcrumbList.length !== 1) getFileList()
}

// 共享文件夹： 全部文件 课程-> 老师 -> 文件
const openShareFolder = async (file: File) => {
	breadcrumbList.push({ title: file.fileName, id: file.id })
	if (breadcrumbList.length === 2) await getTeacher()
	if (breadcrumbList.length >= 3) await getFileList()
}

// 清空文件列表
const clearFileList = () => {
	fileList.value.length = 0
	fileListFormat.value.length = 0
	selectFile.value.length = 0
}

// 打开文件
const openFile = (file: File) => {
	const { fileName, id } = file
	const fileExtension = fileName.split('.').pop()

	switch (fileExtension) {
		case 'png':
		case 'jpg':
		case 'svg':
			openImagePreview(id as number)
			break

		default:
			Message.success('暂时不支持打开该类型的文件,请下载后查看')
			break
	}
}

// 获取分享科目下的老师
const getTeacher = async () => {
	const res = await api.courseware.getJobNameByCourseName({ courseName: courseName.value })
	if (res.status === 200) {
		//过滤掉自己共享的文件夹
		const filterMe = res.data.records.filter((item) => item.jobNum !== useUserInfo.value.schoolUser.studentId)
		fileListFormat.value = filterMe.map((item) => ({
			fileName: item.teachName!,
			id: item.jobNum! as any, // 用户的 老师的id card 存放在 面包屑上 类型为 string 需要兼容
			fid: 0,
			createdTimestamp: dayjs().valueOf(),
			type: 0
		}))
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
	clearFileList()
	if (isHome.value) {
		getCourse()
	} else {
		getFileList()
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
	console.log(id)
	if (!Array.isArray(id)) {
		selectFile.value = [id]
	} else {
		selectFile.value = [...id]
	}
	moveFileModalRef.value.open()
}

const shareSelectRef = ref()
//共享操作
const shareFile = async (file: File) => {
	if (file.shareType !== 0) {
		const res = await api.courseware.shareBatchCourseware({ ids: [file.id as number], shareType: 0 })
		if (res.status === 200) {
			const item = fileListFormat.value.find((item) => item.id === file.id)
			if (item) {
				item.shareType = 0
			}
			Message.success('取消共享成功')
		} else {
			Message.error('取消共享失败')
		}
		return
	}

	shareSelectRef.value.open(file)
}

const donwloadFile = async (file: File) => {
	const item = fileList.value.find((item) => item.id === file.id)
	if (!item) return Message.error('没有找到文件')
	window.location.href = `${baseUrl.httpUrl}/file/download/courseware/teacher/${item.srcId}`
}

const shareSuccess = (data: { id: number; shareType: number }) => {
	const item = fileListFormat.value.find((item) => item.id === data.id)

	if (item) {
		item.shareType = data.shareType
	}
}

const fileIconsMap = [
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
		<div class="flex justify-between items-center mb-10px">
			<div>
				<a-dropdown trigger="hover" :disabled="isHome">
					<div
						class="btn p-y-10px rounded-xl bg-blue-5 hover:bg-blue-4"
						:class="(isHome || !isMe) && ' cursor-not-allowed bg-gray1 text-gray hover:bg-gray1! dark:(bg-dark1 hover:bg-dark1!)'">
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
			<div class="h-80vh w-100% overflow-y-auto scroll-bar" v-on-reach-bottom="{ cb: scrollTobottomLoad }">
				<FileManger
					v-model="selectFile"
					@delete="deleteFile"
					@open="open"
					@refresh="update"
					@created="createdFolderShow = true"
					@resetFolderName="openResetFolderName"
					@move="singleMove"
					@onShare="shareFile"
					@download="donwloadFile"
					:download="true"
					:disabledCreated="isHome || !isMe"
					:disabled-file-operation="!isMe"
					:file-list="fileListFormat"
					:share="true"
					:disabled="isHome">
					<template #fileIcon="{ file }">
						<div
							class="w-30px h-30px absolute left-[calc(50%-15px)] top-40% text-white"
							:class="fileIconsMap.find((item) => item.text === file.fileName.split('.').pop())?.icon || 'i-ri-apps-2-fill'"></div>
						<div :class="`absolute w-30px  text-center left-[calc(50%-15px)] top-65% text-white `">
							{{ fileIconsMap.find((item) => item.text === file.fileName.split('.').pop())?.text || '未知' }}
						</div>
					</template>
					<template #footerPopup v-if="!isMe">
						<div class="btn p-y-15px rounded-2xl elevation-3" @click="moveFileModalRef.open('import')">导入到我的课件库</div>
					</template>
					image.png
				</FileManger>
			</div>
		</div>
		<UploadModal ref="uploadModalRef" @ok="update" />
		<InputModel title="新建文件夹" v-model="createdFolderShow" @ok="createdFolderOk" placeholder="请输入新建文件夹名称"></InputModel>
		<InputModel title="重命名" v-model="resetFolderNameShow" @ok="resetFolderName" placeholder="请输入重命名的名称"></InputModel>
		<a-image-preview :src="imagePreviewSrc" v-model:visible="imagePreview" />
		<MoveFileModal ref="moveFileModalRef" v-model="selectFile" @ok="update"></MoveFileModal>
		<ShareSelect ref="shareSelectRef" @ok="shareSuccess"></ShareSelect>
	</div>
</template>
