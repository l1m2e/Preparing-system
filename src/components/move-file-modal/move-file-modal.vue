<script lang="ts" setup>
import { richTextFilterText } from '~/utils'
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'
import { useFilePagination } from '~/composables'
const show = ref(false)
const model = ref<'select' | 'move'>('select')
const excludeList = ref<Array<number>>([])
/**
 * 打开模态框 有两个 模式 选择模态框 和 移动模态框
 * @param openModel 'select' | 'move'
 * @param openExcludeList 如果是移动模式 需要排除的数组
 */
const open = (openModel: 'select' | 'move', openExcludeList: Array<number>) => {
	//进入页面前清空页面数据
	resetFlieState()
	getFileList()
	show.value = true
	model.value = openModel
	excludeList.value = openExcludeList
}
defineExpose({ open })

const { pagination, fileList, breadcrumbList, breadcrumbLastId, clickBreadcrumb, resetFlieState, getFileList } = useFilePagination()

//滚动到底部刷新
const pullLoad = () => {
	if (pagination.current > pagination.pages) return
	pagination.current++
	Message.success('下拉加载更多被触发')
}

//被选中的数组
const selectedList = ref<Array<any>>([])

//点击文件夹
const clickFile = async (item: any) => {
	//如果是文件夹
	if (item.type === 0) {
		breadcrumbList.push({ title: item.keyword, fid: item.id })
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
	breadcrumbList.push({ title: res.keyword, fid: res.id })
}

const emit = defineEmits(['ok'])

//保存
const save = () => {
	emit('ok', model.value === 'select' ? [...selectedList.value] : [breadcrumbLastId.value])
	show.value = false
}
</script>

<template>
	<a-modal
		:visible="show"
		:title="model === 'select' ? '请选择您的问题' : '移动到'"
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
				v-for="item in fileList"
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
				<a-button type="text" v-if="model === 'move'" @click="createdFolderRef.open()">新建文件夹</a-button>
			</div>
			<div>
				<a-button @click="show = false">取消</a-button>
				<a-badge :count="selectedList.length" :dotStyle="{ background: '#3b82f6' }">
					<a-button type="primary" class="ml-10px" @click="save">{{ model === 'select' ? '添加到备课' : '移动到此处' }}</a-button>
				</a-badge>
			</div>
		</footer>
		<CreatedFolder ref="createdFolderRef" :fid="breadcrumbLastId" @ok="createdFolderSuccess"></CreatedFolder>
	</a-modal>
</template>
