<script lang="ts" setup>
import { List } from '@arco-design/web-vue'
import { isArray } from 'lodash-es'
import type { File } from '~/components/file-manager/interface.d'
import { richTextFilterText } from '~/utils'

const { fileList, breadcrumbList, clickBreadcrumb, getFileList, paginationReset, breadcrumbLastId } = useFilePagination()
getFileList()

// 格式化成组件需要的格式
const formatFileList = computed(() =>
	fileList.map((item) => {
		const { keyword, id, fid, createdTimestamp, type, title } = item
		return { fileName: keyword || richTextFilterText(title), fid: fid!, id, createdTimestamp, type }
	})
)

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

	fileList.forEach((item) => {
		if (item.id === folderId) {
			item.keyword = name
		}
	})
	Message.success('重命名文件夹成功')
	resetFolderNameShow.value = false
}

//移动文件
const moveFileModal = ref(false)

const move = (data: number | Array<number>) => {
	console.log(data)
	moveFileModal.value = true
}

// 删除文件或者文件夹
const deleteFile = async (data: number | Array<number>) => {
	if (isArray(data)) {
		//批量删除
		const fileInfoList = fileList.filter((item) => data.includes(item.id))
		const folderIdList = fileInfoList.filter((item) => item.type === 0).map((item) => item.id) // 被选中的文件夹id数组
		const fileIdList = fileInfoList.filter((item) => item.type !== 0).map((item) => item.id) // 被选中的文件id数组

		if (data.length) {
			await batchDeleteFile(fileIdList)
			await batchDeleteFolder(folderIdList)
		}
	} else {
		// 单个删除
		const index = fileList.findIndex((item) => item.id === data)
		if (index !== -1) {
			const item = fileList[index]
			const res = item.type === 0 ? await api.issueBank.movePathById([item.id]) : await await api.issueBank.delQuestionBank([item.id])

			if (res.status !== 200) return Message.error('删除失败')

			fileList.splice(index, 1)
			Message.success('删除成功')
		}
	}
}

//批量删除文件
const batchDeleteFile = async (list: Array<number>) => {
	const deleteFlieRes = await api.issueBank.delQuestionBank(list)
	if (deleteFlieRes.status === 200) {
		// setFileList(fileList.filter((item) => !fileIdList.includes(item.id)))
		Message.success(`成功删除${list.length}个文件`)
	}
}

//批量删除文件夹
const batchDeleteFolder = async (list: Array<number>) => {
	const deleteFlieRes = await api.issueBank.movePathById(list)
	if (deleteFlieRes.status === 200) {
		// setFileList(fileList.filter((item) => !list.includes(item.id)))
		Message.success(`成功删除${list.length}个文件夹`)
	}
}

// 创建文件
const created = (data: File) => {
	console.log(data)
}

//刷新
const updateFileList = () => {
	paginationReset()
	fileList.length = 0
	getFileList()
}

const topicModalRef = ref()

//打开文件
const open = (data: File) => {
	if (data.type === 0) {
		paginationReset()
		fileList.length = 0
		breadcrumbList.push({ title: data.fileName, fid: data.id })
		getFileList()
		console.log(breadcrumbList)
	} else {
		topicModalRef.value.toggleModal(['单选题', '填空题', '简答题', '判断题', '多选题'][data.type - 1], {
			fid: breadcrumbLastId.value,
			id: data.id,
			isBank: true
		})
	}
}

//被选中的列表
const selectFile = ref<Array<number>>([])
</script>

<template>
	<div mt-100px w-80vw m-auto>
		<a-breadcrumb separator=">" :max-count="4" class="ml-10px">
			<a-breadcrumb-item v-for="item in breadcrumbList" @click="clickBreadcrumb(item.fid)">{{ item.title }}</a-breadcrumb-item>
		</a-breadcrumb>
		<a-card>
			<div h-80vh>
				<FileManger
					v-model="selectFile"
					:file-list="formatFileList"
					@open="open"
					@created="created"
					@delete="deleteFile"
					@move="move"
					@reset-folder-name="resetFolderNameButton"></FileManger>
			</div>
		</a-card>
		<ResetFolderName v-model="resetFolderNameShow" @ok="restFolderName"></ResetFolderName>
		<MoveFileModal v-model="moveFileModal" :file-list="formatFileList"></MoveFileModal>
		<TopicModal @change="updateFileList" ref="topicModalRef"></TopicModal>
	</div>
</template>
