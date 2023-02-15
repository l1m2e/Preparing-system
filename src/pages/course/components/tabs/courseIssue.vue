<script lang="ts" setup>
import topicModal from '../modal/topic-modal.vue'
import { courseInfoStore } from '~/store/courseStore'
import { TableRowSelection } from '@arco-design/web-vue'
import { useGetImageSrcId } from '../topic/composables/useTopic'
import dayjs from 'dayjs'
import { baseUrl } from '~/config/baseUrl'
const topicModalRef = ref()
const openTopicModal = (type: '单选题' | '多选题' | '判断题' | '简答题' | '填空题') => {
	topicModalRef.value.toggleModal(type, true)
}

//表格
const columns = [
	{
		title: '问题名称',
		slotName: 'title'
	},
	{
		title: '创建者',
		slotName: 'teacherName'
	},
	{
		title: '创建时间',
		slotName: 'createdTimestamp'
	},
	{
		title: '操作',
		slotName: 'action'
	}
]
const paginationConfig = reactive({ pageSize: 8, total: 0, current: 1 })
const data = ref([])
const selectedKeys = ref(['Jane Doe', 'Alisa Ross'])
const rowSelection = reactive<TableRowSelection>({
	type: 'checkbox',
	showCheckedAll: true,
	onlyCurrent: false
})
const queryIssueList = async () => {
	if (!courseInfoStore.value.id) return
	const param = {
		pid: courseInfoStore.value.id,
		size: paginationConfig.pageSize,
		current: paginationConfig.current
	}
	const res = await api.queryIssueListFromId(param)
	if (res.status === 200) {
		paginationConfig.current = res.data.current
		paginationConfig.total = res.data.total
		data.value = res.data.records
	}
}
queryIssueList()
watch(
	() => courseInfoStore.value.id,
	(newValue) => {
		if (newValue) {
			queryIssueList()
		}
	}
)

// 表格图片
const imagePreviewGroupShow = ref(false)
const imagePreviewGroupcurrent = ref(0)
const imageList = ref<Array<string>>([])
const openImagePreviewGroup = (idList: Array<number>) => {
	imageList.value = idList.map((item) => `${baseUrl.httpUrl}/file/download/image/teacher/${item}`)
	imagePreviewGroupShow.value = true
}
</script>

<template>
	<div class="p-10px">
		<header class="">
			<a-dropdown trigger="hover">
				<a-button shape="round" size="large" type="primary">
					<template #icon>
						<icon-plus />
					</template>
					新建问题
				</a-button>
				<template #content>
					<a-doption @click="openTopicModal('单选题')">
						<div class="center pr-10px">
							<div class="i-ri-check-line mr-10px"></div>
							<span>单 选 题</span>
						</div>
					</a-doption>
					<a-doption @click="openTopicModal('多选题')">
						<div class="center pr-10px">
							<div class="i-ri-check-double-line mr-10px"></div>
							<span>多 选 题</span>
						</div>
					</a-doption>
					<a-doption @click="openTopicModal('判断题')">
						<div class="center pr-10px">
							<div class="i-ri-question-mark mr-10px"></div>
							<span>判 断 题</span>
						</div>
					</a-doption>
					<a-doption @click="openTopicModal('填空题')">
						<div class="center pr-10px">
							<div class="i-ri-quill-pen-line mr-10px"></div>
							<span>填 空 题</span>
						</div>
					</a-doption>
					<a-doption @click="openTopicModal('简答题')">
						<div class="center pr-10px">
							<div class="i-ri-draft-line mr-10px"></div>
							<span>简 答 题</span>
						</div>
					</a-doption>
				</template>
			</a-dropdown>
			<a-button shape="round" size="large" class="ml-10px">
				<template #icon>
					<icon-import />
				</template>
				从题库导入
			</a-button>
		</header>
		<main>
			<a-table
				class="mt-20px"
				row-key="name"
				:bordered="false"
				:columns="columns"
				:data="data"
				:row-selection="rowSelection"
				v-model:selectedKeys="selectedKeys"
				:pagination="paginationConfig">
				<template #title="{ record }">
					<div>{{ record.title.replace(/<[^>]+>/g, '') }}</div>
					<a-tag v-if="useGetImageSrcId(record.title).length !== 0" class="cursor-pointer" color="green" @click="openImagePreviewGroup(useGetImageSrcId(record.title))">
						<template #icon>
							<icon-file-image />
						</template>
						图片
					</a-tag>
				</template>
				<template #teacherName="{ record }">
					<a-tag color="orange">{{ record.teacherName }}</a-tag>
				</template>
				<template #createdTimestamp="{ record }">
					<div>{{ dayjs(record.createdTimestamp).format('YYYY-MM-DD HH:mm') }}</div>
				</template>
				<template #action="{ record }">
					<a-button>点我</a-button>
				</template>
			</a-table>
			<a-image-preview-group v-model:visible="imagePreviewGroupShow" v-model:current="imagePreviewGroupcurrent" infinite :srcList="imageList" />
		</main>
	</div>
	<topicModal ref="topicModalRef"></topicModal>
</template>

<style scoped></style>
