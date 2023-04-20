<script lang="ts" setup>
import { richTextFilterText } from '~/utils'
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'

const show = ref(false)
const model = ref<'select' | 'move'>('select')

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
		if (model.value === 'move') {
			res.data.records = res.data.records.filter((item: any) => item.type === 0)
			console.log(res.data.records)
		}
		fileList.value = res.data.records
		pagination.current++
		return true
	}
	return false
}

//被选中的数组
const selectedList = ref<Array<any>>([])

//点击文件夹
const clickFile = async (item: any) => {
	//如果是文件夹
	if (item.type === 0) {
		fileList.value.length = 0
		const res = await getFileList(item.id)
		if (res) {
			breadcrumbList.push({ title: item.keyword, fid: item.id })
		}
	} else {
		//如果是文件
		if (!selectedList.value.includes(item.id)) {
			selectedList.value.push(item.id)
		} else {
			//如果已经被选中从数组中删除
			selectedList.value.splice(selectedList.value.indexOf(item.id), 1)
		}
	}
}

// 创建文件夹 ref
const CreatedFolderRef = ref()

//面包屑数组
const breadcrumbList = reactive([{ title: '所有问题', fid: 0 }])
//点击面包屑处理函数
const onClickBreadcrumb = (id: number) => {
	const index = breadcrumbList.findIndex((item) => item.fid === id)
	if (index !== -1) {
		breadcrumbList.splice(index + 1, breadcrumbList.length - index - 1)
		fileList.value.length = 0
		getFileList(id)
	}
}
const breadcrumbLastId = computed(() => breadcrumbList.slice().pop()?.fid || 0)

//在关闭之前
const beforeClose = () => {
	fileList.value.length = 0
	selectedList.value.length = 0
	breadcrumbList.length = 1
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
		:body-style="{ padding: 0 }"
		@before-close="beforeClose">
		<header>
			<a-breadcrumb separator=">" :max-count="3" class="ml-10px my-10px">
				<a-breadcrumb-item v-for="item in breadcrumbList" @click="onClickBreadcrumb(item.fid)" class="max-w-120px truncate">
					{{ item.title }}
				</a-breadcrumb-item>
			</a-breadcrumb>
		</header>
		<main class="w-100% h-500px overflow-y-auto scroll-bar overflow-x-hidden">
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
				<a-button type="text" v-if="model === 'move'" @click="CreatedFolderRef.open()">新建文件夹</a-button>
			</div>
			<div>
				<a-button @click="show = false">取消</a-button>
				<a-badge :count="selectedList.length" :dotStyle="{ background: '#3b82f6' }">
					<a-button type="primary" class="ml-10px" @click="save">{{ model === 'select' ? '添加到备课' : '移动到此处' }}</a-button>
				</a-badge>
			</div>
		</footer>
		<CreatedFolder ref="CreatedFolderRef" :fid="breadcrumbLastId" @ok="getFileList(breadcrumbLastId)"></CreatedFolder>
	</a-modal>
</template>
