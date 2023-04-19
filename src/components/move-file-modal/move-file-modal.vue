<script lang="ts" setup>
import { richTextFilterText } from '~/utils'
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'

const show = ref(false)
const model = ref('select')

/**
 * 打开模态框 有两个 模式 选择模态框 和 移动模态框
 * @param model 'select' | 'move'
 */
const open = (openModel: 'select' | 'move') => {
	getFileList()
	show.value = true
	model.value = openModel
}
defineExpose({ open })

//分页配置
const pagination = {
	current: 1,
	size: 20,
	page: 1
}
const fileList = ref<Array<any>>([])
//请求文件列表
const getFileList = async (fid = 0) => {
	const res = await api.queryQuestionBankList({ ...pagination, fid })
	if (res.status === 200) {
		fileList.value = res.data.records
		pagination.current++
		return true
	}
	return false
}

const onFileClick = async (item: any) => {
	if (item.type === 0) {
		fileList.value.length = 0
		const res = await getFileList(item.id)
		if (res) {
			breadcrumbList.push({ title: item.keyword, fid: item.id })
		}
	}
}

//面包屑数组
const breadcrumbList = reactive([{ title: '首页', fid: 0 }])

const onClickBreadcrumb = (id: number) => {
	const index = breadcrumbList.findIndex((item) => item.fid === id)
	if (index !== -1) {
		breadcrumbList.splice(index + 1, breadcrumbList.length - index - 1)
		fileList.value.length = 0
		getFileList(id)
	}
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
			<a-breadcrumb>
				<a-breadcrumb-item v-for="item in breadcrumbList" @click="onClickBreadcrumb(item.fid)">{{ item.title }}</a-breadcrumb-item>
			</a-breadcrumb>
		</header>
		<main class="w-100% h-500px overflow-y-auto scroll-bar overflow-x-hidden">
			<a-row
				v-for="item in fileList"
				@click="onFileClick(item)"
				class="py-10px mx-10px box-border rounded hover:bg-[var(--color-fill-2)] cursor-pointer !items-center first:mt-10px transition">
				<a-col :span="3" class="center"><img :src="item.type ? fileSvg : folderSvg" class="w-30px h-30px" /></a-col>
				<a-col :span="21" v-if="item.type" class="truncate">{{ richTextFilterText(item.title) }}</a-col>
				<a-col :span="21" v-else class="truncate">{{ item.keyword }}</a-col>
			</a-row>
		</main>
		<footer class="w-100% flex items-center justify-between mt-15px p-15px">
			<div>
				<a-button type="text" v-if="model === 'move'">新建文件夹</a-button>
			</div>
			<div>
				<a-button @click="show = false">取消</a-button>
				<a-button type="primary" class="ml-10px">{{ model === 'select' ? '确定' : '移动到此处' }}</a-button>
			</div>
		</footer>
	</a-modal>
</template>
