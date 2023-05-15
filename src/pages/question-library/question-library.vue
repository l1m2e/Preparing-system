<script lang="ts" setup>
import type { File } from '~/components/file-manager/interface.d'
import type { AxiosResponse } from 'axios'
import { isArray } from 'lodash-es'
import { richTextFilterText } from '~/utils'
import MoveFileModal from './components/move-file-modal.vue'

const { pagination, fileList, breadcrumbList, breadcrumbLastId, clickBreadcrumb, getFileList, paginationReset } = useFilePagination()

// 打开组件获取文件列表
getFileList()

// 格式化成组件需要的格式
const formatFileList = computed(() =>
	fileList.map((item) => {
		const { keyword, id, fid, createdTimestamp, type, title } = item
		return { fileName: keyword || richTextFilterText(title), fid: fid!, id, createdTimestamp, type }
	})
)

// 被选中的列表
const selectFile = ref<Array<number>>([])

// 新建文件夹
const createdFolderShow = ref(false)

const createdFolderOk = async (name: string) => {
	if (name === '') return Message.error('文件夹昵称不能为空')

	const res = await api.issueBank.addKeyword({ keyword: name, fid: breadcrumbLastId.value })

	if (res.status !== 200) return Message.error('添加文件夹失败')

	createdFolderShow.value = false
	Message.success('添加文件夹成功')
	fileList.unshift(res.data)
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
		folder.keyword = name
		Message.success('重命名文件夹成功')
		resetFolderNameShow.value = false
	}
}

// 移动文件
const moveFileModalRef = ref()

const move = (data: number | Array<number>) => {
	moveFileModalRef.value.open(isArray(data) ? data : [data])
}

// 刷新
const updateFileList = () => {
	paginationReset()
	fileList.length = 0
	selectFile.value.length = 0
	getFileList()
}

// 打开文件
const topicModalRef = ref()

const open = (data: File) => {
	selectFile.value.length = 0
	if (data.type === 0) {
		//打开文件夹
		paginationReset()
		fileList.length = 0
		breadcrumbList.push({ title: data.fileName, fid: data.id })
		getFileList()
		console.log(breadcrumbList)
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
	if (pagination.current < pagination.pages) {
		pagination.current++
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
		<div class="mb-10px">
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
				<a-breadcrumb-item v-for="item in breadcrumbList" @click="clickBreadcrumb(item.fid)">{{ item.title }}</a-breadcrumb-item>
			</a-breadcrumb>
		</div>

		<div class="h-80vh box-border overflow-y-auto scroll-bar" v-on-reach-bottom="{ cb: scrollTobottomLoad }">
			<FileManger
				v-model="selectFile"
				:file-list="formatFileList"
				@open="open"
				@delete="deleteFile"
				@move="move"
				@created="createdFolderShow = true"
				@reset-folder-name="resetFolderNameButton"
				@refresh="updateFileList">
				<!-- 图标样式 -->
				<template #fileIcon="{ type }">
					<div :class="`w-20px h-20px absolute left-[calc(50%-10px)] top-40% text-white ${fileIconTextList[type].icon}`"></div>
					<div :class="`absolute left-30% top-65% text-white `">{{ fileIconTextList[type].text }}</div>
				</template>
			</FileManger>
		</div>

		<InputModel title="重命名文件夹" v-model="resetFolderNameShow" @ok="restFolderName"></InputModel>
		<InputModel title="新建文件夹" v-model="createdFolderShow" @ok="createdFolderOk"></InputModel>
		<MoveFileModal ref="moveFileModalRef" @ok="updateFileList"></MoveFileModal>
		<TopicModal @change="updateFileList" ref="topicModalRef"></TopicModal>
	</div>
</template>
