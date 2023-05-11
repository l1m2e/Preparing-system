<script lang="ts" setup>
import type { File } from '~/components/file-manager/interface.d'
import type { AxiosResponse } from 'axios'
import type { Message } from '~/api/api'
import { isArray } from 'lodash-es'
import { richTextFilterText } from '~/utils'
import MoveFileModal from './move-file-modal.vue'

const { fileList, breadcrumbList, clickBreadcrumb, getFileList, paginationReset, breadcrumbLastId } = useFilePagination()

// 打开组件获取文件列表
getFileList()

// 格式化成组件需要的格式
const formatFileList = computed(() =>
	fileList.map((item) => {
		const { keyword, id, fid, createdTimestamp, type, title } = item
		return { fileName: keyword || richTextFilterText(title), fid: fid!, id, createdTimestamp, type }
	})
)

//重命名文件夹
const inputModelshow = ref(false)
const inputModelTitle = ref('')
let folderId = 0

const resetFolderNameButton = (id: number) => {
	inputModelTitle.value = '重命名文件夹'
	inputModelshow.value = true
	folderId = id
}

const restFolderName = async (name: string) => {
	const res = await api.issueBank.updatePath(folderId, { name })

	if (res.status !== 200) return Message.error('文件夹重命名失败')

	const folder = fileList.find((item) => item.id === folderId)

	if (folder) {
		folder.keyword = name
		Message.success('重命名文件夹成功')
		inputModelshow.value = false
	}
}

// 新建文件夹
const createdFolder = () => {
	inputModelTitle.value = '新建文件夹'
	inputModelshow.value = true
}
//移动文件
const moveFileModalRef = ref()

const move = (data: number | Array<number>) => {
	moveFileModalRef.value.open(isArray(data) ? data : [data])
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
}

const batchDelete = async (request: (data: Array<number>) => Promise<AxiosResponse<Message, any>>, list: Array<number>, msg: string) => {
	const res = await request(list)
	if (res.status === 200) {
		//成功删除本地数据
		const arr = fileList.filter((item) => !list.includes(item.id))
		fileList.length = 0
		fileList.push(...arr)
		Message.success(msg)
	}
}

//刷新
const updateFileList = () => {
	paginationReset()
	fileList.length = 0
	getFileList()
}

//打开文件
const topicModalRef = ref()

const open = (data: File) => {
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

//被选中的列表
const selectFile = ref<Array<number>>([])
</script>

<template>
	<div mt-100px w-80vw m-auto>
		<a-dropdown trigger="hover">
			<div class="btn p-y-10px rounded-xl bg-blue-5 hover:bg-blue-4">新建</div>
			<template #content>
				<a-doption @click="createdFolder">
					<template #icon><IconFolderAdd /></template>
					<div class="center pr-10px">
						<span>新建文件夹</span>
					</div>
				</a-doption>
				<!-- <a-doption @click="openTopicModal('单选题')">
					<div class="center pr-10px">
						<div class="i-ri-check-line mr-10px"></div>
						<span>单 选 题</span>
					</div>
				</a-doption>
				<a-doption @click="openTopicModal('多选题')">
					<div class="center pr-10px">
						<div class="i-ri-check-double-line mr-10px"></div>
						<span>多 选 题</span>
					</div>
				</a-doption>
				<a-doption @click="openTopicModal('判断题')">
					<div class="center pr-10px">
						<div class="i-ri-question-mark mr-10px"></div>
						<span>判 断 题</span>
					</div>
				</a-doption>
				<a-doption @click="openTopicModal('填空题')">
					<div class="center pr-10px">
						<div class="i-ri-quill-pen-line mr-10px"></div>
						<span>填 空 题</span>
					</div>
				</a-doption>
				<a-doption @click="openTopicModal('简答题')">
					<div class="center pr-10px">
						<div class="i-ri-draft-line mr-10px"></div>
						<span>简 答 题</span>
					</div>
				</a-doption> -->
			</template>
		</a-dropdown>
		<a-breadcrumb separator=">" :max-count="4" class="ml-10px">
			<a-breadcrumb-item v-for="item in breadcrumbList" @click="clickBreadcrumb(item.fid)">{{ item.title }}</a-breadcrumb-item>
		</a-breadcrumb>
		<a-card>
			<div h-80vh>
				<FileManger
					v-model="selectFile"
					:file-list="formatFileList"
					@open="open"
					@delete="deleteFile"
					@move="move"
					@reset-folder-name="resetFolderNameButton"></FileManger>
			</div>
		</a-card>
		<InputModel :title="inputModelTitle" v-model="inputModelshow" @ok="restFolderName"></InputModel>
		<MoveFileModal ref="moveFileModalRef" @ok="updateFileList"></MoveFileModal>
		<TopicModal @change="updateFileList" ref="topicModalRef"></TopicModal>
	</div>
</template>
