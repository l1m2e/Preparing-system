<script lang="ts" setup>
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'

const props = defineProps<{
	modelValue: Array<number>
}>()

const emits = defineEmits<{
	ok: []
}>()

const show = ref(false)

// 有两种模式 move 从我的文件夹移动到另外一个文件夹 import 直接导入文件
let model = 'move'
const open = (openModel: 'import' | 'move' = 'move') => {
	model = openModel
	show.value = true
	getCourse()
}

defineExpose({ open })

// 面包屑
const breadcrumbList = reactive([{ title: '我的课件库', id: -1 }])
const breadcrumbLastId = computed(() => breadcrumbList.slice().pop()?.id || 0)
const isHome = computed(() => breadcrumbList.length === 1)
const courseName = computed(() => breadcrumbList[1].title)

const clickBreadcrumb = (id: number) => {
	const index = breadcrumbList.findIndex((item) => item.id === id)
	if (index !== -1) breadcrumbList.splice(index + 1)
	fileList.value.length = 0
	update()
}

// 文件列表
interface File {
	fileName: string
	id: number
	fid: number
	folderFlag: boolean | undefined
}

const fileList = ref<Array<File>>([])

// 获取本学期科目列表
const getCourse = async () => {
	const res = await api.courseTable.getCourseNameBySemester()
	if (res.status) {
		fileList.value = res.data.map((item) => ({ fileName: item, id: 0, fid: 0, folderFlag: true }))
	}
}

// 根据课程名称获取文件列表
const getFileList = async (id: number) => {
	const res = await api.courseware.queryCourseware({ courseName: courseName.value, id, jobNum: '' })

	if (res.status === 200) {
		fileList.value = res.data.records.map((item) => {
			const { id, fid, folderFlag, coursewareName: fileName } = item
			return { id, fid, fileName, folderFlag }
		})
	}
}

const selectFolderList = ref<Array<number>>([])

// 单击文件夹
const clickFolder = (item: File) => {
	const { fileName, id, folderFlag } = item

	if (folderFlag) {
		breadcrumbList.push({ title: fileName, id })
		selectFolderList.value.length = 0
		getFileList(id)
	}
}

// 下拉加载
const pullLoad = () => {}

//保存
const save = async () => {
	model === 'move' ? moveFile() : importFile()
}

// 移动文件
const moveFile = async () => {
	const res = await api.courseware.moveCourseware({ ids: props.modelValue, fid: breadcrumbLastId.value, courseName: courseName.value })
	movState(res.status, res.data.error)
}

// 导入文件
const importFile = async () => {
	const res = await api.courseware.copyShareCourseware({ ids: props.modelValue, fid: breadcrumbLastId.value, courseName: courseName.value })
	movState(res.status, res.data.error)
}

const movState = (status: number, error?: string) => {
	if (status === 200) {
		Message.success('课件导入成功')
		show.value = false
		model === 'move' && emits('ok')
	} else {
		Message.error(error || '操作失败')
	}
}

//刷新数据
const update = () => {
	if (isHome.value) {
		getCourse()
	} else {
		getFileList(breadcrumbLastId.value)
	}
}

const clear = () => {
	breadcrumbList.length = 1
	fileList.value.length = 0
}
</script>

<template>
	<a-modal
		title="移动到"
		@before-close="clear"
		:visible="show"
		:width="500"
		:closable="false"
		:mask-closable="false"
		:esc-to-close="false"
		:footer="false"
		:body-style="{ padding: 0 }">
		<header>
			<a-breadcrumb separator=">" :max-count="3" class="ml-10px my-10px">
				<a-breadcrumb-item v-for="item in breadcrumbList" @click="clickBreadcrumb(item.id)" class="max-w-120px truncate">
					{{ item.title }}
				</a-breadcrumb-item>
			</a-breadcrumb>
		</header>
		<main class="w-100% h-500px overflow-y-auto scroll-bar overflow-x-hidden" v-on-reach-bottom="{ cb: pullLoad }">
			<a-row
				v-for="item in fileList"
				@click="clickFolder(item)"
				class="py-10px mx-10px box-border rounded hover:bg-[var(--color-fill-2)] cursor-pointer !items-center first:mt-10px transition mb-10px"
				:class="selectFolderList.includes(item.id) && 'bg-blue-1 hover:bg-blue-1 dark:bg-blue-5 dark:hover:bg-blue-5'">
				<a-col :span="3" class="center"><img :src="item.folderFlag ? folderSvg : fileSvg" class="w-30px h-30px" /></a-col>
				<a-col :span="21" class="truncate">{{ item.fileName }}</a-col>
			</a-row>
		</main>
		<footer class="w-100% flex items-center justify-between mt-15px p-15px">
			<div></div>
			<div>
				<a-button @click="show = false">取消</a-button>
				<a-badge :count="props.modelValue.length" :dotStyle="{ background: '#3b82f6' }">
					<a-button type="primary" class="ml-10px" @click="save" :disabled="isHome">移动到此处</a-button>
				</a-badge>
			</div>
		</footer>
	</a-modal>
</template>
