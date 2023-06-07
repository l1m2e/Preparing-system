<script lang="ts" setup>
import type { CoursewareVo } from '~/api/api'
import type { TableColumnData } from '@arco-design/web-vue'
import { courseInfoStore } from '~/store/courseStore'
import { baseUrl } from '~/config/baseUrl'
import ImportCourseware from './import-courseware.vue'
import UploadCourseware from './upload-courseware.vue'
import dayjs from 'dayjs'

const paginationConfig = reactive({ pageSize: 8, total: 0, current: 1 })

const data = ref<CoursewareVo[]>([])
const columns: TableColumnData[] = [
	{
		title: '课件名称',
		dataIndex: 'coursewareName'
	},
	{
		title: '创建时间',
		slotName: 'updateTimestamp'
	},
	{
		title: '课件类型',
		slotName: 'type'
	},
	{
		title: '操作',
		slotName: 'action',
		width: 180
	}
]

const search = ref<undefined | string>(undefined)
const getCoursewareList = async () => {
	if (!courseInfoStore.value.id) return

	const res = await api.courseware.queryCoursewareByPid({
		current: paginationConfig.current,
		size: paginationConfig.pageSize,
		pid: courseInfoStore.value.id,
		...(search ? { coursewareName: search.value } : {})
	})

	if (res.status === 200) {
		data.value = res.data.records
		paginationConfig.total = res.data.total
		paginationConfig.current = res.data.current
	}
}
getCoursewareList()

const pageChange = (index: number) => {
	paginationConfig.current = index
	getCoursewareList()
}

const download = (file: CoursewareVo) => (window.location.href = `${baseUrl.httpUrl}/file/download/courseware/teacher/${file.srcId}`)

const deleteFile = async (file: CoursewareVo) => {
	const res = await api.courseware.unBindCourseware({ pid: courseInfoStore.value.id, cidList: [file.id] })
	if (res.status === 200) {
		getCoursewareList()
		Message.success('删除成功')
	}
}

const importCoursewarRef = ref()
const uploadCoursewareRef = ref()

const coursewareTypeChange = async (val: CoursewareVo) => {
	const res = await api.courseware.updateCoursewareCopy({ id: val.id, type: val.type })
	if (res.status !== 200) {
		getCoursewareList()
		return Message.error('修改失败')
	}
}
</script>

<template>
	<div class="flex justify-between py-10px">
		<div>
			<a-button type="primary" size="large" shape="round" @click="uploadCoursewareRef.open()">
				<template #icon><icon-upload /></template>
				上传课件
			</a-button>
			<a-button size="large" shape="round" ml-10px @click="importCoursewarRef.open()">
				<template #icon><icon-import /></template>
				导入课件
			</a-button>
		</div>
		<div>
			<a-input-search
				size="medium"
				:style="{ width: '220px' }"
				placeholder="查询"
				v-model="search"
				@blur="getCoursewareList"
				@search="getCoursewareList" />
		</div>
	</div>
	<a-table class="mt-20px" row-key="id" :bordered="false" :columns="columns" :data="data" :pagination="paginationConfig" @page-change="pageChange">
		<template #action="{ record }">
			<div class="w-100% center">
				<a-button shape="round" size="small" status="success" @click="download(record)">
					<template #icon><icon-download></icon-download></template>
				</a-button>
				<a-button shape="round" size="small" status="danger" class="ml-10px" @click="deleteFile(record)">
					<template #icon><icon-delete></icon-delete></template>
				</a-button>
			</div>
		</template>
		<template #updateTimestamp="{ record }">
			{{ dayjs(record.updateTimestamp).format('YYYY-MM-DD HH:mm') }}
		</template>
		<template #type="{ record }">
			<CoursewareTypeSelect v-model="record.type" @change="coursewareTypeChange(record)"></CoursewareTypeSelect>
		</template>
	</a-table>
	<ImportCourseware ref="importCoursewarRef" @ok="getCoursewareList"></ImportCourseware>
	<UploadCourseware ref="uploadCoursewareRef" @ok="getCoursewareList"></UploadCourseware>
</template>
