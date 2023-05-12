<script lang="ts" setup>
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'
import { richTextFilterText } from '~/utils'
import { useFilePagination } from '~/composables'

const emit = defineEmits<{
	ok: []
}>()

const show = ref(false)
const selectedList = ref<Array<any>>([])

const open = (openSelectedList: Array<number>) => {
	//进入页面前清空页面数据
	resetFlieState()
	getFileList()
	show.value = true
	console.log(openSelectedList)
	selectedList.value = openSelectedList
}
defineExpose({ open })

const { pagination, fileList, breadcrumbList, breadcrumbLastId, clickBreadcrumb, resetFlieState, getFileList } = useFilePagination()
const fileListUi = computed(() => fileList.filter((item) => !selectedList.value.includes(item.id)))

//滚动到底部刷新
const pullLoad = () => pagination.current++

//点击文件夹
const clickFile = async (item: any) => {
	if (item.type !== 0) return
	//如果是文件夹
	breadcrumbList.push({ title: item.keyword, fid: item.id })
	fileList.length = 0
	getFileList()
}

// 创建文件夹 ref
const createdFolderRef = ref()

//创建文件夹
const createdFolderSuccess = (res: any) => {
	breadcrumbList.push({ title: res.keyword, fid: res.id })
}

//保存
const save = async () => {
	const res = await api.issueBank.moveQuestionBank({ fid: breadcrumbLastId.value, ids: selectedList.value })
	if (res.status === 200) {
		fileList.length = 0
		getFileList()
		emit('ok')
	}
	if (res.status === 400) {
		res.data.error && Message.error(res.data.error)
	}
	show.value = false
}
</script>

<template>
	<a-modal
		:visible="show"
		title="移动到"
		:width="500"
		:closable="false"
		:mask-closable="false"
		:esc-to-close="false"
		:footer="false"
		:body-style="{ padding: 0 }">
		<header>
			<a-breadcrumb separator=">" :max-count="3" class="ml-10px my-10px">
				<a-breadcrumb-item v-for="item in breadcrumbList" @click="clickBreadcrumb(item.fid)" class="max-w-120px truncate">
					{{ item.title }}
				</a-breadcrumb-item>
			</a-breadcrumb>
		</header>
		<main class="w-100% h-500px overflow-y-auto scroll-bar overflow-x-hidden" v-on-reach-bottom="pullLoad">
			<a-row
				v-for="item in fileListUi"
				@click="clickFile(item)"
				class="py-10px mx-10px box-border rounded hover:bg-[var(--color-fill-2)] cursor-pointer !items-center first:mt-10px transition mb-10px"
				:class="selectedList.includes(item.id) && 'bg-blue-1 hover:bg-blue-1 dark:bg-blue-5 dark:hover:bg-blue-5'">
				<a-col :span="3" class="center"><img :src="item.type ? fileSvg : folderSvg" class="w-30px h-30px" /></a-col>
				<a-col :span="21" v-if="item.type" class="truncate">{{ richTextFilterText(item.title) }}</a-col>
				<a-col :span="21" v-else class="truncate">{{ item.keyword }}</a-col>
			</a-row>
		</main>
		<footer class="w-100% flex items-center justify-between mt-15px p-15px">
			<div>
				<a-button type="text" @click="createdFolderRef.open()">新建文件夹</a-button>
			</div>
			<div>
				<a-button @click="show = false">取消</a-button>
				<a-badge :count="selectedList.length" :dotStyle="{ background: '#3b82f6' }">
					<a-button type="primary" class="ml-10px" @click="save">移动到此处</a-button>
				</a-badge>
			</div>
		</footer>
		<CreatedFolder ref="createdFolderRef" :fid="breadcrumbLastId" @ok="createdFolderSuccess"></CreatedFolder>
	</a-modal>
</template>
