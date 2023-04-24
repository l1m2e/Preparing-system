<script lang="ts" setup>
import dayjs from 'dayjs'
import topicModal from '~/components/topic-modal/topic-modal.vue'
import selectedTopicModal from './selected-topic-modal.vue'
import { courseInfoStore } from '~/store/courseStore'
import { TableRowSelection } from '@arco-design/web-vue'
import { getRichTextImageIds } from '~/utils'
import { Modal } from '@arco-design/web-vue'
import { baseUrl } from '~/config/baseUrl'
import { richTextFilterText } from '~/utils'

const topicModalRef = ref()

// 打开模态框
const openTopicModal = (type: '单选题' | '多选题' | '判断题' | '简答题' | '填空题' | string, id?: number) => {
	topicModalRef.value.toggleModal(type, true, { id })
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
		title: '类型',
		slotName: 'type'
	},
	{
		title: '操作',
		slotName: 'action'
	}
]

const paginationConfig = reactive({ pageSize: 8, total: 0, current: 1 })
const data = ref([])
const selectedKeys = ref<Array<number>>([]) //批量操作
const fuzzySearch = ref('') // 模糊搜索
const topicTypeOptions = reactive([
	{ value: 0, label: '全部' },
	{ value: 1, label: '单选题' },
	{ value: 2, label: '填空题' },
	{ value: 3, label: '简答题' },
	{ value: 4, label: '判断题' },
	{ value: 5, label: '多选题' }
])
const topicTypeSelectValue = ref(0)

const topicTypeSelectChange = () => {
	queryIssueList()
}

const rowSelection = reactive<TableRowSelection>({
	type: 'checkbox',
	showCheckedAll: true,
	onlyCurrent: false
})

const pageChange = (current: number) => {
	queryIssueList(current)
}

const queryIssueList = async (current?: number) => {
	if (!courseInfoStore.value.id) return
	let param = {
		pid: courseInfoStore.value.id,
		size: paginationConfig.pageSize,
		current: current ? current : paginationConfig.current,
		title: fuzzySearch.value,
		type: topicTypeSelectValue.value as any
	}
	!topicTypeSelectValue.value && delete param.type
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

//删除问题单个
const deleteOneIssueConfirm = (id: number) => {
	Modal.confirm({
		title: '提示',
		content: '您确定要删除该问题吗',
		onOk: async () => {
			const res = await deleteIssue([id])
			res && queryIssueList()
		}
	})
}
//删除问题批量
const batchDeleteIssue = () => {
	Modal.confirm({
		title: '提示',
		content: `您确定要删除您选中的 ${selectedKeys.value.length} 个问题吗？`,
		onOk: async () => {
			const res = await deleteIssue(selectedKeys.value)
			if (res) {
				queryIssueList()
				selectedKeys.value.length = 0
			}
		}
	})
}

//删除问题 api
const deleteIssue = async (idList: Array<number>) => {
	if (!courseInfoStore.value.id) return
	const res = await api.deleteIssueById(idList, courseInfoStore.value.id)
	if (res.status === 200) {
		Message.success('删除问题成功')
		return true
	} else {
		if (res.data.message) {
			Message.error(res.data.message)
		} else {
			Message.error('删除问题失败 未知错误')
		}
		return false
	}
}

const selectedTopicModalRef = ref() // 题库选择器弹窗
//题库选择器点击保存
const moveFileModalSave = async (arr: number[]) => {
	const res = await api.importQuestion(courseInfoStore.value.id, arr)
	if (res.status === 200) {
		queryIssueList()
	} else {
		if (res.status === 400) return Message.error(res.data.error)
		Message.error('未知错误')
	}
}
</script>

<template>
	<div class="p-10px">
		<header class="flex justify-between">
			<div>
				<a-dropdown trigger="hover">
					<a-button type="primary" size="large" shape="round">
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
				<a-button class="ml-10px" size="large" shape="round" @click="selectedTopicModalRef.open()">
					<template #icon>
						<icon-import />
					</template>
					从题库导入
				</a-button>
			</div>
			<div class="flex items-center">
				<a-button class="mr-10px" size="medium" status="danger" v-if="selectedKeys.length !== 0" @click="batchDeleteIssue">
					<template #icon><icon-delete /></template>
					批量删除 {{ selectedKeys.length }}
				</a-button>
				<a-select
					size="medium"
					@change="topicTypeSelectChange"
					v-model="topicTypeSelectValue"
					:options="topicTypeOptions"
					:default-value="0"
					class="max-w-200px mr-10px"></a-select>
				<a-input-search
					size="medium"
					:style="{ width: '320px' }"
					placeholder="查询"
					v-model="fuzzySearch"
					:allow-clear="true"
					@search="queryIssueList()"
					@blur="fuzzySearch === '' ? queryIssueList() : ''"
					@clear="queryIssueList()" />
			</div>
		</header>
		<main>
			<a-table
				class="mt-20px"
				row-key="id"
				:bordered="false"
				:columns="columns"
				:data="data"
				:row-selection="rowSelection"
				v-model:selectedKeys="selectedKeys"
				:pagination="paginationConfig"
				@page-change="pageChange">
				<!-- 表格内容 -->
				<template #title="{ record }">
					<div class="flex items-center">
						<a-tooltip :content="richTextFilterText(record.title)">
							<div class="max-w-70% truncate mr-10px">{{ richTextFilterText(record.title) }}</div>
						</a-tooltip>
						<a-tooltip content="点击查看图片">
							<a-tag
								v-if="getRichTextImageIds(record.title).length !== 0"
								class="cursor-pointer"
								color="green"
								@click="openImagePreviewGroup(getRichTextImageIds(record.title))">
								<template #icon>
									<icon-file-image />
								</template>
								图片
							</a-tag>
						</a-tooltip>
					</div>
				</template>
				<template #teacherName="{ record }">
					<a-tag color="blue">{{ record.teacherName }}</a-tag>
				</template>
				<template #createdTimestamp="{ record }">
					<div>{{ dayjs(record.createdTimestamp).format('YYYY-MM-DD HH:mm') }}</div>
				</template>
				<template #type="{ record }">
					<a-tag v-if="record.type === 1" color="blue">
						<div class="i-ri-check-line"></div>
						<span>单选题</span>
					</a-tag>
					<a-tag v-if="record.type === 2" color="green">
						<div class="i-ri-quill-pen-line"></div>
						<span>填空题</span>
					</a-tag>
					<a-tag v-if="record.type === 3" color="purple">
						<div class="i-ri-draft-line"></div>
						<span>简答题</span>
					</a-tag>
					<a-tag v-if="record.type === 4" color="orangered">
						<div class="i-ri-question-mark"></div>
						<span>判断题</span>
					</a-tag>
					<a-tag v-if="record.type === 5" color="arcoblue">
						<div class="i-ri-check-double-line"></div>
						<span>多选题</span>
					</a-tag>
				</template>
				<template #action="{ record }">
					<a-button
						shape="circle"
						size="medium"
						class="mr-20px"
						@click="openTopicModal(topicTypeOptions.find((item) => item.value === record.type)!.label, record.id)">
						<icon-edit />
					</a-button>
					<a-button shape="circle" status="danger" size="medium" @click="deleteOneIssueConfirm(record.id)"><icon-delete /></a-button>
				</template>
			</a-table>
			<a-image-preview-group v-model:visible="imagePreviewGroupShow" v-model:current="imagePreviewGroupcurrent" infinite :srcList="imageList" />
		</main>
	</div>
	<topicModal @change="queryIssueList" ref="topicModalRef"></topicModal>
	<selected-topic-modal ref="selectedTopicModalRef" @ok="moveFileModalSave"></selected-topic-modal>
</template>

<style scoped></style>
