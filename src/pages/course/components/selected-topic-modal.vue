<script lang="ts" setup>
import { richTextFilterText } from '~/utils'
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'
import { useFilePagination } from '~/composables'
const show = ref(false)

const open = () => {
	getFileList()
	show.value = true
}
defineExpose({ open })

const { pagination, fileList, breadcrumbList, breadcrumbLastId, clickBreadcrumb, resetFlieState, getFileList } = useFilePagination()

//滚动到底部刷新
const pullLoad = () => {
	pagination.current++
	Message.success('下拉加载更多被触发')
}

//被选中的数组
const selectedList = ref<Array<any>>([])

//点击文件夹
const clickFile = async (item: any) => {
	//如果是文件夹
	if (item.type === 0) {
		breadcrumbList.push({ title: item.title, fid: item.id })
		fileList.length = 0
		getFileList()
		return
	}
	//如果是文件
	if (!selectedList.value.includes(item.id)) {
		selectedList.value.push(item.id)
	} else {
		//如果已经被选中从数组中删除
		selectedList.value.splice(selectedList.value.indexOf(item.id), 1)
	}
}

// 创建文件夹 ref
const createdFolderRef = ref()

//创建文件夹
const createdFolderSuccess = (res: any) => {
	breadcrumbList.push({ title: res.title, fid: res.id })
}

const emit = defineEmits(['ok'])

//保存
const save = () => {
	emit('ok', [...selectedList.value])
	selectedList.value.length = 0
	show.value = false
}

const beforClose = () => {
	resetFlieState()
	selectedList.value.length = 0
}
</script>

<template>
	<a-modal
		:visible="show"
		title="添加题目到备课"
		:width="500"
		:closable="false"
		:mask-closable="false"
		:esc-to-close="false"
		:footer="false"
		:body-style="{ padding: 0 }"
		@before-close="beforClose">
		<header>
			<a-breadcrumb separator=">" :max-count="3" class="ml-10px my-10px">
				<a-breadcrumb-item v-for="item in breadcrumbList" @click="clickBreadcrumb(item.fid)" class="max-w-120px truncate">
					{{ item.title }}
				</a-breadcrumb-item>
			</a-breadcrumb>
		</header>
		<main class="w-100% h-500px overflow-y-auto scroll-bar overflow-x-hidden" v-on-reach-bottom="{ cb: pullLoad }">
			<a-row
				v-for="item in fileList"
				@click="clickFile(item)"
				class="py-10px mx-10px box-border rounded hover:bg-[var(--color-fill-2)] cursor-pointer !items-center first:mt-10px transition mb-10px"
				:class="selectedList.includes(item.id) && 'bg-blue-1 hover:bg-blue-1 dark:bg-blue-5 dark:hover:bg-blue-5'">
				<a-col :span="3" class="center"><img :src="item.type ? fileSvg : folderSvg" class="w-30px h-30px" /></a-col>
				<a-col :span="21" v-if="item.type" class="truncate">{{ richTextFilterText(item.title) }}</a-col>
				<a-col :span="21" v-else class="truncate">{{ item.title }}</a-col>
			</a-row>
		</main>
		<footer class="w-100% flex items-center justify-end mt-15px p-15px">
			<div>
				<a-button @click="show = false">取消</a-button>
				<a-badge :count="selectedList.length" :dotStyle="{ background: '#3b82f6' }">
					<a-button type="primary" class="ml-10px" @click="save">添加到备课</a-button>
				</a-badge>
			</div>
		</footer>
		<CreatedFolder ref="createdFolderRef" :fid="breadcrumbLastId" @ok="createdFolderSuccess"></CreatedFolder>
	</a-modal>
</template>
