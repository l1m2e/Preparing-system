<script lang="ts" setup>
import dayjs from 'dayjs'
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'
import MoveFileModal from './components/move-file-modal.vue'
import ResetFolderName from './components/reset-folder-name.vue'
import { useRegion, useAutoChangGridLayout } from '~/composables'
import { richTextFilterText } from '~/utils'

onMounted(() => {
	getFileList()
	useRegion(regionRef.value, 'data-file-id', (data) => {
		checkedIdList.value = data
	})
	useAutoChangGridLayout(gridboxRef, 160, fileList.length, '.arco-checkbox-group')
})

//框选逻辑
const regionRef = ref()
const checkedIdList = ref<Array<any>>([]) //被选中的id

//题目icon样式
const fileIconTextList = [
	{ text: '文件夹', icon: 'i-ri-check-line', color: 'cyan' },
	{ text: '单选题', icon: 'i-ri-check-line', color: 'cyan' },
	{ text: '填空题', icon: 'i-ri-quill-pen-line', color: 'blue' },
	{ text: '简答题', icon: 'i-ri-draft-line', color: 'arcoblue' },
	{ text: '判断题', icon: 'i-ri-question-mark', color: 'purple' },
	{ text: '多选题', icon: 'i-ri-check-double-line', color: 'green' }
]

//请求列表数据
const { pagination, fileList, breadcrumbList, breadcrumbLastId, clickBreadcrumb, getFileList, setFileList, paginationReset } = useFilePagination()

//文件列表带是否被选中状态
const fileListSelectedStateState = computed(() =>
	fileList.map((item) => {
		return checkedIdList.value.includes(item.id) ? { ...item, checked: true } : { ...item, checked: false }
	})
)

//单个删除
const singleDelete = async (item: { type: number; id: number }) => {
	//删除
	const isDelete = (id: number) => {
		const index = fileList.findIndex((item) => item.id === id)
		if (index !== -1) {
			fileList.splice(index, 1)
			Message.success('删除成功')
		}
	}

	if (item.type === 0) {
		const res = await api.issueBank.movePathById([item.id])
		if (res.status === 200) {
			isDelete(item.id)
		} else {
			Message.error('删除失败')
		}
	} else {
		const res = await api.issueBank.delQuestionBank([item.id])
		if (res.status === 200) {
			setFileList(fileList.filter((item) => item.id !== item.id))
			Message.success('删除成功')
		} else {
			Message.error('删除失败')
		}
	}
}

//用户会批量选中文件夹和文件 批量删除文件和批量删除文件夹是两个接口 对选中的项进行分类 再分别批量删除
const batchDelete = async () => {
	// 根据被选中的id进行分类
	const fileInfoList = fileList.filter((item) => checkedIdList.value.includes(item.id)) // 文件带文件信息方便根据信息进行分类
	const folderIdList = fileInfoList.filter((item) => item.type === 0).map((item) => item.id) // 被选中的文件夹id数组
	const fileIdList = fileInfoList.filter((item) => item.type !== 0).map((item) => item.id) // 被选中的文件id数组

	// 批量删除文件
	if (fileIdList.length) {
		const deleteFlieRes = await api.issueBank.delQuestionBank(fileIdList)
		if (deleteFlieRes.status === 200) {
			setFileList(fileList.filter((item) => !fileIdList.includes(item.id)))
			Message.success(`成功删除${fileIdList.length}个文件`)
		}
	}

	// 批量删除文件夹
	if (folderIdList.length) {
		const deleteFolderRes = await api.issueBank.movePathById(folderIdList)
		if (deleteFolderRes.status === 200) {
			console.log(fileList.filter((item) => !fileIdList.includes(item.id)))
			setFileList(fileList.filter((item) => !folderIdList.includes(item.id)))
			Message.success(`成功删除${folderIdList.length}个文件夹`)
		}
	}

	//清空选中的数组
	checkedIdList.value.length = 0
}

//点击文件
const onFileClick = async (item: any) => {
	if (item.type === 0) {
		//点击文件夹
		paginationReset()
		fileList.length = 0
		breadcrumbList.push({ title: item.keyword, fid: item.id })
		getFileList()
		console.log(breadcrumbList)
	} else {
		//点击文件
		topicModalRef.value.toggleModal(['单选题', '填空题', '简答题', '判断题', '多选题'][item.type - 1], {
			fid: breadcrumbLastId.value,
			id: item.id,
			isBank: true
		})
	}
}

// 单击选中 取消选中
const clickSelected = (id: number) => {
	if (!checkedIdList.value.includes(id)) {
		checkedIdList.value.push(id)
	} else {
		checkedIdList.value.splice(checkedIdList.value.indexOf(id), 1)
	}
}

//刷新
const updateFileList = () => {
	paginationReset()
	fileList.length = 0
	getFileList()
}

//修改布局
const gridboxRef = ref()
const { width: bigBoxWidth } = useElementSize(gridboxRef)

watch(bigBoxWidth, () => useAutoChangGridLayout(gridboxRef, 160, fileList.length, '.arco-checkbox-group'))
watch(fileList, () => useAutoChangGridLayout(gridboxRef, 160, fileList.length, '.arco-checkbox-group'))

const moveFileModalRef = ref() // 移动文件夹Ref
const createdFolderRef = ref() // 创建文件夹Ref

//移动文件或者文件夹
const moveFile = async (fid: number, ids: Array<any>) => {
	const res = await api.issueBank.moveQuestionBank({ fid, ids })
	if (res.status === 200) {
		fileList.length = 0
		getFileList()
	}
	if (res.status === 400) {
		res.data.error && Message.error(res.data.error)
	}
}

//下拉加载
const pullLoad = () => {
	if (pagination.current < pagination.pages) {
		pagination.current++
	}
}

const topicModalRef = ref()
const resetFolderNameRef = ref()

// 打开模态框
const openTopicModal = (type: '单选题' | '多选题' | '判断题' | '简答题' | '填空题' | string) => {
	topicModalRef.value.toggleModal(type, { fid: breadcrumbLastId.value })
}
</script>

<template>
	<div class="p-10px box-border rounded mt-10px bg-[var(--color-bg-2)] select-none">
		<a-dropdown trigger="contextMenu" alignPoint class="block">
			<div class="relative" ref="regionRef">
				<header class="center justify-start items-center bg-[var(--color-bg-2)] h-50px">
					<div class="flex items-center">
						<a-dropdown trigger="hover">
							<div class="btn p-y-10px rounded-xl bg-blue-5 hover:bg-blue-4">新建</div>
							<template #content>
								<a-doption @click="createdFolderRef.open()">
									<template #icon><IconFolderAdd /></template>
									<div class="center pr-10px">
										<span>新建文件夹</span>
									</div>
								</a-doption>
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
					</div>
					<a-breadcrumb separator=">" :max-count="4" class="ml-10px">
						<a-breadcrumb-item v-for="item in breadcrumbList" @click="clickBreadcrumb(item.fid)">{{ item.title }}</a-breadcrumb-item>
					</a-breadcrumb>
				</header>

				<main class="w-100% h-80vh overflow-y-auto scroll-bar" v-on-reach-bottom="pullLoad">
					<div class="w-100% grid-centen" ref="gridboxRef">
						<a-checkbox-group v-model="checkedIdList">
							<template v-for="item in fileListSelectedStateState" :key="item.id">
								<div
									:class="`${item.checked ? 'checkbox-card-checked' : 'checkbox-card'}`"
									:data-file-id="item.id"
									@dblclick="onFileClick(item)"
									@click="clickSelected(item.id)"
									ref="gridItemsRef">
									<a-checkbox :value="item.id" class="absolute top-6px left-1px" @click.stop="">
										<template #checkbox="row">
											<div
												:class="`w-15px h-15px  rounded-full  border-solid transition ${
													row.checked ? 'border-5px border-[rgb(var(--primary-6))]' : 'border-1px border-[var(--color-border-3)]'
												}`"></div>
										</template>
									</a-checkbox>
									<img :src="folderSvg" v-if="item.type === 0" class="w-120px h-120px mt-10px" />
									<div v-if="[1, 2, 3, 4, 5].includes(item.type)" class="relative">
										<img :src="fileSvg" class="w-100px h-100px mt-20px mb-10px" />
										<div :class="`w-20px h-20px absolute left-[calc(50%-10px)] top-40% text-white ${fileIconTextList[item.type].icon}`"></div>
										<div :class="`absolute left-30% top-65% text-white `">{{ fileIconTextList[item.type].text }}</div>
									</div>
									<div class="truncate max-w-130px">{{ item.type === 0 ? item.keyword : richTextFilterText(item.title) }}</div>
									<div class="text-12px mt-5px text-[var(--color-text-3)]">
										{{ dayjs(item.createdTimestamp).format('YYYY-MM-DD HH:mm') }}
									</div>
									<a-dropdown trigger="click">
										<div
											@click.stop=""
											class="absolute right-5px top-5px i-ri-more-line text-[var(--color-border-3)] hover:text-[rgb(var(--primary-6))] text-20px operation"></div>
										<template #content>
											<a-doption v-if="item.type === 0" @click="resetFolderNameRef.open(item.id)">
												<template #icon><icon-edit /></template>
												重命名
											</a-doption>
											<a-doption @click="moveFileModalRef.open([item.id])">
												<template #icon><icon-to-right /></template>
												移动
											</a-doption>
											<a-doption @click="singleDelete(item)">
												<template #icon><icon-delete /></template>
												删除
											</a-doption>
										</template>
									</a-dropdown>
								</div>
							</template>
						</a-checkbox-group>
					</div>
				</main>

				<footer class="flex w-100% h-100px absolute bottom-0 left-0 right-0 center overflow-hidden" @mousedown.stop="">
					<Transition enter-active-class="animated-fade-in-up" leave-active-class="animated-fade-out-down" class="animated animated-faster">
						<div
							class="py-10px px-20px border border-1px border-[var(--color-border-1)] shadow-lg rounded-xl center overflow-hidden"
							v-if="checkedIdList.length !== 0">
							<a-tooltip content="删除" position="top" mini>
								<div class="action-bar" @click="batchDelete"><div class="i-ri-delete-bin-6-line"></div></div>
							</a-tooltip>
							<a-tooltip content="移动" position="top" mini @click="moveFileModalRef.open(checkedIdList)">
								<div class="action-bar"><div class="i-ri-share-forward-line"></div></div>
							</a-tooltip>
							<a-tooltip content="取消选中" position="top" mini>
								<div class="action-bar"><div class="i-ri-close-circle-line" @click="checkedIdList.length = 0"></div></div>
							</a-tooltip>
						</div>
					</Transition>
				</footer>
			</div>
			<!-- 右键菜单 -->
			<template #content>
				<a-doption @click="createdFolderRef.open()">
					<template #icon><IconFolderAdd /></template>
					新建文件夹
				</a-doption>
				<a-doption @click="updateFileList">
					<template #icon><IconRefresh /></template>
					刷新
				</a-doption>
			</template>
		</a-dropdown>
		<CreatedFolder ref="createdFolderRef" :fid="breadcrumbLastId" @ok="updateFileList"></CreatedFolder>
		<MoveFileModal ref="moveFileModalRef" @ok="moveFile"></MoveFileModal>
		<TopicModal @change="updateFileList" ref="topicModalRef"></TopicModal>
		<ResetFolderName ref="resetFolderNameRef" @ok="updateFileList()"></ResetFolderName>
	</div>
</template>

<style scoped>
.checkbox-card {
	--uno: w-150px h-180px cursor-pointer flex flex-col relative rounded-xl mt-20px items-center;
	user-select: none;
}
.checkbox-card:hover {
	background-color: var(--color-fill-2);
}
.checkbox-card-checked {
	--uno: w-150px h-180px cursor-pointer flex flex-col items-center rounded-xl mt-20px relative;
	background: var(--color-primary-light-1);
}
.checkbox-card-checked :deep(.arco-checkbox),
.checkbox-card :deep(.arco-checkbox) {
	--uno: absolute hidden;
}
.operation {
	--uno: opacity-0;
}
.checkbox-card:hover :deep(.arco-checkbox),
.checkbox-card:hover .operation {
	--uno: opacity-100 block;
}
.checkbox-card-checked:hover .operation {
	--uno: opacity-100;
}
.checkbox-card-checked :deep(.arco-checkbox) {
	--uno: block;
}
:deep(.arco-breadcrumb-item):hover {
	--uno: text-#306fff;
}
.grid-centen :deep(.arco-checkbox-group) {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, max-content));
	gap: 10px;
}
.action-bar {
	--uno: w-30px h-30px cursor-pointer text-15px center rounded-5px;
	color: var(--color-text-2);
}
.action-bar:hover {
	background-color: var(--color-fill-1);
	color: var(--color-text-1);
}
.action-bar:last-child {
	--uno: mr-0;
}

.checkbox-list-box :deep(.arco-checkbox-group) {
	--uno: block;
}
.list-col {
	--uno: flex justify-start items-center h-100%;
}
.list-col-tag:deep(.arco-tag) {
	--uno: rounded-100% w-25px h25px p-2px center;
}
</style>
