<script lang="ts" setup>
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'
import { setReactive } from '~/utils'
import { courseInfoStore } from '~/store/courseStore'

const emits = defineEmits<{
	ok: []
}>()

const show = ref(false)

const open = () => {
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
	resetPagination()
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

const pagination = reactive({
	current: 1,
	size: 40,
	pages: 1
})
const resetPagination = () => setReactive(pagination, { current: 1, size: 40, pages: 1 })

// 根据课程名称获取文件列表
const getFileList = async (id: number) => {
	const res = await api.courseware.queryCourseware({
		courseName: courseName.value,
		id,
		jobNum: '',
		current: pagination.current,
		size: pagination.size
	})

	if (res.status === 200) {
		res.data.records
			.map((item) => {
				const { id, fid, folderFlag, coursewareName: fileName } = item
				return { id, fid, fileName, folderFlag }
			})
			.forEach((item) => fileList.value.push(item))
		pagination.pages = res.data.pages
	}
}

const selectFile = reactive<Array<number>>([])

// 单击文件夹
const clickFolder = (item: File) => {
	const { fileName, id, folderFlag } = item
	if (folderFlag) {
		resetPagination()
		fileList.value.length = 0
		breadcrumbList.push({ title: fileName, id })
		getFileList(id)
	} else {
		selectFile.includes(id)
			? selectFile.splice(
					selectFile.findIndex((item) => item === id),
					1
			  )
			: selectFile.push(id)
	}
}

// 下拉加载
const pullLoad = () => {
	pagination.current++
	if (pagination.current > pagination.pages) return
	getFileList(breadcrumbLastId.value)
}

const coursewareType = ref<Array<number>>([1])
//保存
const save = async () => {
	const res = await api.courseware.bindCourseware({ pid: courseInfoStore.value.id, cidList: selectFile, type: coursewareType.value })
	if (res.status === 200) {
		Message.success('导入课件成功')
		show.value = false
		emits('ok')
	} else {
		Message.error(`导入失败 ${res.data.error}`)
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
	selectFile.length = 0
}
</script>

<template>
	<a-modal
		title="请选择您需要导入的课件"
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
				:class="selectFile.includes(item.id) && 'bg-blue-1 hover:bg-blue-1 dark:bg-blue-5 dark:hover:bg-blue-5'">
				<a-col :span="3" class="center"><img :src="item.folderFlag ? folderSvg : fileSvg" class="w-30px h-30px" /></a-col>
				<a-col :span="21" class="truncate">{{ item.fileName }}</a-col>
			</a-row>
		</main>
		<footer class="w-100% flex items-center justify-between mt-15px p-15px">
			<div>
				<CoursewareTypeSelect v-model="coursewareType" :width="290" :max-tag-count="2"></CoursewareTypeSelect>
			</div>
			<div>
				<a-button @click="show = false">取消</a-button>
				<a-badge :count="selectFile.length" :dotStyle="{ background: '#3b82f6' }">
					<a-button type="primary" class="ml-10px" @click="save" :disabled="isHome || selectFile.length === 0">导入到课件</a-button>
				</a-badge>
			</div>
		</footer>
	</a-modal>
</template>
