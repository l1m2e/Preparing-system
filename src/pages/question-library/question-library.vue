<script lang="ts" setup>
import type { File } from '~/components/file-manager/interface.d'
import type { AxiosResponse } from 'axios'
import { isArray } from 'lodash-es'
import ShareSelect from './components/share-select.vue'
import MoveFileModal from './components/move-file-modal.vue'

const isMe = ref<boolean>(true)
//切换课件库
const switchingLibrary = () => {
	resetFileList()
	selectFile.value.length = 0
}

const selectFile = ref<Array<number>>([]) // 被选中的列表
const {
	fileList,
	breadcrumbList,
	breadcrumbLastId,
	isHome,
	courseName,
	clickBreadcrumb,
	refreshFileList,
	resetFlieState,
	resetFileList,
	next,
	request: getFileList
} = useFilePagination({ isMe })

watch(breadcrumbLastId, () => {
	console.log('11')
	selectFile.value.length = 0
})

//获取文件列表
getFileList()

// 新建文件夹
const createdFolderShow = ref(false)

const createdFolderOk = async (name: string) => {
	if (name === '') return Message.error('文件夹昵称不能为空')

	const res = await api.issueBank.addKeyword({ title: name, fid: breadcrumbLastId.value, courseName: courseName.value })

	if (res.status !== 200) return Message.error('添加文件夹失败')

	createdFolderShow.value = false
	Message.success('添加文件夹成功')
	const { title, type, id, fid, createdTimestamp } = res.data
	fileList.unshift({ fileName: title, type, id, fid: fid!, createdTimestamp, shareType: 0 })
}

// 新建题目
const openTopicModal = (type: '单选题' | '多选题' | '判断题' | '简答题' | '填空题' | string) => {
	topicModalRef.value.toggleModal(type, { fid: breadcrumbLastId.value })
}

// 删除文件或者文件夹
const deleteFile = async (data: number | Array<number>) => {
	if (isArray(data)) {
		//批量删除
		const fileInfoList = fileList.filter((item) => data.includes(item.id))
		const folderIdList = fileInfoList.filter((item) => item.type === 0).map((item) => item.id) // 被选中的文件夹id数组
		const fileIdList = fileInfoList.filter((item) => item.type !== 0).map((item) => item.id) // 被选中的文件id数组

		if (data.length === 0) return

		batchDelete(api.issueBank.delQuestionBank, fileIdList, `成功删除${fileIdList.length}个文件`)
		batchDelete(api.issueBank.movePathById, folderIdList, `成功删除${folderIdList.length}个文件夹`)
	} else {
		// 单个删除
		const index = fileList.findIndex((item) => item.id === data)

		if (index === -1) return

		const item = fileList[index]
		const res = item.type === 0 ? await api.issueBank.movePathById([item.id]) : await api.issueBank.delQuestionBank([item.id])

		if (res.status !== 200) return Message.error('删除失败')

		fileList.splice(index, 1)
		Message.success('删除成功')
	}
	selectFile.value.length = 0
}

const batchDelete = async (request: (data: Array<number>) => Promise<AxiosResponse<any, any>>, list: Array<number>, msg: string) => {
	const res = await request(list)
	if (res.status === 200) {
		//成功删除本地数据
		const arr = fileList.filter((item) => !list.includes(item.id))
		fileList.length = 0
		fileList.push(...arr)
		Message.success(msg)
	}
}

//重命名文件夹
const resetFolderNameShow = ref(false)
let folderId = 0

const resetFolderNameButton = (id: number) => {
	resetFolderNameShow.value = true
	folderId = id
}

const restFolderName = async (name: string) => {
	const res = await api.issueBank.updatePath(folderId, { name })

	if (res.status !== 200) return Message.error('文件夹重命名失败')

	const folder = fileList.find((item) => item.id === folderId)

	if (folder) {
		folder.fileName = name
		Message.success('重命名文件夹成功')
		resetFolderNameShow.value = false
	}
}

// 移动文件
const moveFileModalRef = ref()

const move = (data: number | Array<number>) => {
	moveFileModalRef.value.open(isArray(data) ? data : [data])
}

// 打开文件
const topicModalRef = ref()

const open = (data: File) => {
	selectFile.value.length = 0
	if (data.type === 0) {
		//打开文件夹
		fileList.length = 0
		breadcrumbList.push({ title: data.fileName, fid: data.id })
		console.log(breadcrumbList)
		resetFlieState()
		getFileList()
	} else {
		//打卡文件
		topicModalRef.value.toggleModal(['单选题', '填空题', '简答题', '判断题', '多选题'][data.type - 1], {
			fid: breadcrumbLastId.value,
			id: data.id,
			isBank: true
		})
	}
}

// 滑动到底部加载
const scrollTobottomLoad = () => {
	Message.success('滑动到底部了')
	next()
}

// 分享文件
const shareFile = async (file: File) => {
	//取消共享
	if (file.shareType !== 0) {
		const res = await api.issueBank.shareBatchQuestion({ ids: [file.id as number], share: 0 })
		if (res.status === 200) {
			const item = fileList.find((item) => item.id === file.id)
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

const shareSelectRef = ref()
const shareSuccess = (data: { id: number; share: number }) => {
	const item = fileList.find((item) => item.id === data.id)
	if (item) {
		item.shareType = data.share
	}
}

//题目icon样式
const fileIconTextList = [
	{ text: '文件夹', icon: '', color: 'cyan' },
	{ text: '单选题', icon: 'i-ri-check-line', color: 'cyan' },
	{ text: '填空题', icon: 'i-ri-quill-pen-line', color: 'blue' },
	{ text: '简答题', icon: 'i-ri-draft-line', color: 'arcoblue' },
	{ text: '判断题', icon: 'i-ri-question-mark', color: 'purple' },
	{ text: '多选题', icon: 'i-ri-check-double-line', color: 'green' }
]

// 新建按钮
const createdBtnMenu = [
	{ name: '新建文件夹', icon: 'i-ri-folder-open-line', click: () => (createdFolderShow.value = true) },
	{ name: '单选题', icon: 'i-ri-check-line ', click: () => openTopicModal('单选题') },
	{ name: '多选题', icon: 'i-ri-check-double-line ', click: () => openTopicModal('多选题') },
	{ name: '判断题', icon: 'i-ri-question-mark', click: () => openTopicModal('判断题') },
	{ name: '填空题', icon: 'i-ri-quill-pen-line', click: () => openTopicModal('填空题') },
	{ name: '简答题', icon: 'i-ri-draft-line', click: () => openTopicModal('简答题') }
]
</script>

<template>
	<div class="p-10px box-border rounded mt-10px bg-[var(--color-bg-2)] select-none">
		<div class="mb-10px flex justify-between">
			<div>
				<a-dropdown trigger="hover" :disabled="isHome || !isMe">
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
					<a-breadcrumb-item v-for="item in breadcrumbList" @click="clickBreadcrumb(item.fid)">{{ item.title }}</a-breadcrumb-item>
				</a-breadcrumb>
			</div>

			<div>
				<a-radio-group type="button" size="large" v-model="isMe" @change="switchingLibrary">
					<a-radio :value="true">我的问题库</a-radio>
					<a-radio :value="false">共享问题库</a-radio>
				</a-radio-group>
			</div>
		</div>

		<div class="h-80vh box-border overflow-y-auto scroll-bar" v-on-reach-bottom="{ cb: scrollTobottomLoad }">
			<FileManger
				v-model="selectFile"
				:file-list="fileList"
				:disabled="isHome || !isMe"
				:share="isMe"
				:disabledCreated="isHome || !isMe"
				@open="open"
				@delete="deleteFile"
				@move="move"
				@onShare="shareFile"
				@created="createdFolderShow = true"
				@reset-folder-name="resetFolderNameButton"
				@refresh="refreshFileList">
				<!-- 图标样式 -->
				<template #fileIcon="{ type }">
					<div :class="`w-20px h-20px absolute left-[calc(50%-10px)] top-40% text-white ${fileIconTextList[type].icon}`"></div>
					<div :class="`absolute left-30% top-65% text-white `">{{ fileIconTextList[type].text }}</div>
				</template>
			</FileManger>
		</div>

		<InputModel placeholder="请输入重命名的名称" title="重命名" v-model="resetFolderNameShow" @ok="restFolderName"></InputModel>
		<InputModel placeholder="请输入文件夹名称" title="新建文件夹" v-model="createdFolderShow" @ok="createdFolderOk"></InputModel>
		<MoveFileModal
			ref="moveFileModalRef"
			@ok="
				() => {
					selectFile.length = 0
					refreshFileList()
				}
			"></MoveFileModal>
		<TopicModal @change="refreshFileList" ref="topicModalRef" :readonly="!isMe" :course-name="courseName"></TopicModal>
		<ShareSelect ref="shareSelectRef" @ok="shareSuccess"></ShareSelect>
	</div>
</template>
