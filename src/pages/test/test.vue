<script lang="ts" setup>
import { type } from 'os'

const { pagination, fileList, breadcrumbList, breadcrumbLastId, clickBreadcrumb, getFileList, setFileList, paginationReset } = useFilePagination()
getFileList()

// 格式化成组件需要的格式
const formatFileList = computed(() =>
	fileList.map((item) => {
		const { keyword, id, fid, createdTimestamp, type, title } = item
		return { fileName: keyword || title, fid: fid!, id, createdTimestamp, type }
	})
)

const open = (data: any) => {
	console.log(data)
}

//重命名文件夹
const resetFolderNameRef = ref()

const resetFolderNameButton = (id: number) => {
	resetFolderNameRef.value.open(id) // 打开文件夹
}

// 请求接口
const restFolderNameApi = async (params: { id: number; name: string }) => {
	const { name, id } = params
	const res = await api.issueBank.updatePath(id, { name })
	return res.status === 200
}

//成功修改本地数据
const resetFolderNameSuccess = (data: { id: number; name: string }) => {
	fileList.forEach((item) => {
		if (item.id === data.id && item.type === 0) {
			item.keyword = data.name
		}
	})
}

// // 重命名
// const resetFolderNameSuccess = (data: { id: number; name: string }) => {
// 	const newValue = cloneDeep(props.fileList).map((item) => {
// 		if (item.id === data.id) {
// 			item.fileName = data.name
// 		}
// 		return item
// 	})
// }

const move = (data: any) => {
	console.log(data)
}

const deleteFile = (data: any) => {
	console.log(data)
}

const created = (data: any) => {
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
		<ResetFolderName :request="restFolderNameApi" @ok="resetFolderNameSuccess" ref="resetFolderNameRef"></ResetFolderName>
	</div>
</template>
