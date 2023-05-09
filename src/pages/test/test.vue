<script lang="ts" setup>
import MoveFileModal from './components/move-file-modal.vue'
const { pagination, fileList, breadcrumbList, breadcrumbLastId, clickBreadcrumb, getFileList, setFileList, paginationReset } = useFilePagination()
getFileList()

// 格式化成组件需要的格式
const formatFileList = computed(() =>
	fileList.map((item) => {
		const { keyword, id, fid, createdTimestamp, type, title } = item
		return { fileName: keyword || title, fid: fid!, id, createdTimestamp, type }
	})
)

const open = (data: string) => {
	console.log(data)
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

	fileList.forEach((item) => {
		if (item.id === folderId && item.type === 0) {
			item.keyword = name
		}
	})
	Message.success('重命名文件夹成功')
	resetFolderNameShow.value = false
}

//移动文件
const moveFileModal = ref(false)

const move = (data) => {
	console.log(data)
	moveFileModal.value = true
}

const deleteFile = (data) => {
	console.log(data)
}

const created = (data) => {
	console.log(data)
}

//被选中的列表
const selectFile = ref<Array<number>>([])
</script>

<template>
	<div mt-100px w-80vw m-auto>
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
	</div>
</template>
