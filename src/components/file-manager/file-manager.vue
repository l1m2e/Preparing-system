<script lang="ts" setup>
import dayjs from 'dayjs'
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'
import { useRegion } from '~/composables'
import treeFolder from './components/treeFolder.vue'
import createdFolder from './components/createdFolder.vue'
import {
	checkedIdList,
	fileListSelectedStateState,
	getFileList,
	fileTableReset,
	batchDelete,
	updateFileList,
	singleDelete,
	onFileClick,
	breadcrumbList,
	onClickBreadcrumb
} from './stroe'
//请求列表数据
getFileList()
// 布局模式
const uiModel = useStorage<'grid' | 'list'>('fileUiModel', 'grid')

//框选逻辑
const regionRef = ref()
onMounted(() => {
	useRegion(regionRef.value, 'data-file-id', (data) => {
		checkedIdList.value = data
	})
})

onUnmounted(() => {
	fileTableReset()
})

// 顺序对应后端返回的数组下标
const fileIconTextList = [
	{
		text: '单选题',
		icon: 'i-ri-check-line',
		color: 'cyan'
	},
	{
		text: '填空题',
		icon: 'i-ri-quill-pen-line',
		color: 'blue'
	},
	{
		text: '简答题',
		icon: 'i-ri-draft-line',
		color: 'arcoblue'
	},
	{
		text: '判断题',
		icon: 'i-ri-question-mark',
		color: 'purple'
	},
	{
		text: '多选题',
		icon: 'i-ri-check-double-line',
		color: 'green'
	}
]

const treeFolderRef = ref() // 移动文件夹Ref
const createdFolderRef = ref() // 创建文件夹Ref
</script>

<template>
	<a-dropdown trigger="contextMenu" alignPoint class="block">
		<div class="relative" ref="regionRef">
			<header class="center justify-between items-center bg-[var(--color-bg-2)] h-50px">
				<a-button size="large" type="primary" shape="round" @click="createdFolderRef.open()">新建文件夹</a-button>
				<a-radio-group type="button" size="large" v-model="uiModel">
					<a-radio value="grid">
						<div class="center">
							<div class="i-carbon:grid mr-5px"></div>
							<span>宫格</span>
						</div>
					</a-radio>
					<a-radio value="list">
						<div class="center">
							<div class="i-carbon:list mr-5px"></div>
							<span>列表</span>
						</div>
					</a-radio>
				</a-radio-group>
			</header>
			<a-breadcrumb>
				<a-breadcrumb-item v-for="item in breadcrumbList" @click="onClickBreadcrumb(item.fid)">{{ item.title }}</a-breadcrumb-item>
			</a-breadcrumb>
			<main class="w-100% h-76vh overflow-y-auto scroll-bar" v-on-reach-bottom="getFileList">
				<div v-if="uiModel === 'grid'" class="w-100% grid-centen">
					<a-checkbox-group v-model="checkedIdList">
						<template v-for="item in fileListSelectedStateState" :key="item.id">
							<div :class="`${item.checked ? 'checkbox-card-checked' : 'checkbox-card'}`" :data-file-id="item.id" @click="onFileClick(item)">
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
									<div :class="`w-20px h-20px absolute left-[calc(50%-10px)] top-40% text-white ${fileIconTextList[item.type + 1].icon}`"></div>
									<div :class="`absolute left-30% top-65% text-white `">{{ fileIconTextList[item.type + 1].text }}</div>
								</div>
								<div class="truncate max-w-130px">{{ item.type === 0 ? item.keyword : item.title }}</div>
								<div class="text-12px mt-5px text-[var(--color-text-3)]">
									{{ dayjs(item.createdTimestamp).format('YYYY-MM-DD HH:mm') }}
								</div>
								<a-dropdown trigger="click">
									<div
										@click.stop=""
										class="absolute right-5px top-5px i-ri-more-line text-[var(--color-border-3)] hover:text-[rgb(var(--primary-6))] text-20px operation"></div>
									<template #content>
										<a-doption v-if="item.type === 0">
											<template #icon><icon-edit /></template>
											重命名
										</a-doption>
										<a-doption>
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
				<div v-else class="w-100% h-auto checkbox-list-box">
					<a-checkbox-group v-model="checkedIdList" class="block">
						<a-row class="w-100% bg-[var(--color-fill-1)] h-40px mt-10px px-10px">
							<a-col :span="6" class="list-col">文件</a-col>
							<a-col :span="6" class="list-col">创建时间</a-col>
							<a-col :span="6" class="list-col">类型</a-col>
							<a-col :span="5" class="list-col">操作</a-col>
							<a-col :span="1" class="list-col">选中</a-col>
						</a-row>
						<a-row
							class="w-100% hover:bg-[var(--color-fill-1)] h-40px cursor-pointer px-10px"
							v-for="item in fileListSelectedStateState"
							:key="item.id"
							:data-file-id="item.id">
							<a-col :span="6" class="list-col">
								<img :src="folderSvg" class="w-20px h-20px" v-if="item.type === 0" />
								<div v-else class="w-20px h-20px">
									<img :src="fileSvg" />
								</div>
								<div class="ml-20px">{{ item.type === 0 ? item.keyword : item.title }}</div>
							</a-col>
							<a-col class="list-col" :span="6">{{ dayjs(item.createdTimestamp).format('YYYY-MM-DD HH:mm') }}</a-col>
							<a-col class="list-col" :span="6">
								<a-tag v-if="item.type === 0" color="orange">文件夹</a-tag>
								<a-tag v-else :color="fileIconTextList[item.type + 1].color">{{ fileIconTextList[item.type + 1].text }}</a-tag>
							</a-col>
							<a-col :span="5" class="list-col text-[var(--color-text-2)] text-15px list-col-tag">
								<a-tooltip content="重命名" position="top" mini>
									<a-tag color="blue" v-if="item.type === 0"><div class="i-ri-edit-line"></div></a-tag>
								</a-tooltip>
								<a-tooltip content="删除" position="top" mini>
									<a-tag @click="singleDelete(item)" color="red" class="ml-20px first:ml-0px"><div class="i-ri-delete-bin-line"></div></a-tag>
								</a-tooltip>
								<a-tooltip content="移动" position="top" mini>
									<a-tag color="arcoblue" class="ml-20px"><div class="i-ri-share-forward-line"></div></a-tag>
								</a-tooltip>
							</a-col>
							<a-col :span="1" class="list-col">
								<a-checkbox :value="item.id">
									<template #checkbox="row">
										<div
											:class="`w-15px h-15px  rounded-full  border-solid transition ${
												row.checked ? 'border-5px border-[rgb(var(--primary-6))]' : 'border-1px border-[var(--color-border-3)]'
											}`"></div>
									</template>
								</a-checkbox>
							</a-col>
						</a-row>
					</a-checkbox-group>
				</div>
			</main>
			<footer class="flex w-100% h-100px absolute bottom-0 left-0 right-0 center" @mousedown.stop="">
				<div
					class="py-10px px-20px border border-1px border-[var(--color-border-1)] shadow-lg rounded-xl center overflow-hidden"
					v-if="checkedIdList.length !== 0">
					<a-tooltip content="删除" position="top" mini>
						<div class="action-bar" @click="batchDelete"><div class="i-ri-delete-bin-6-line"></div></div>
					</a-tooltip>
					<a-tooltip content="移动" position="top" mini @click="treeFolderRef.open()">
						<div class="action-bar"><div class="i-ri-share-forward-line"></div></div>
					</a-tooltip>
					<a-tooltip content="取消选中" position="top" mini>
						<div class="action-bar"><div class="i-ri-close-circle-line" @click="checkedIdList.length = 0"></div></div>
					</a-tooltip>
				</div>
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

	<treeFolder ref="treeFolderRef"></treeFolder>
	<createdFolder ref="createdFolderRef"></createdFolder>
</template>

<style scoped>
.checkbox-card {
	width: 150px;
	height: 180px;
	cursor: pointer;
	user-select: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	border-radius: 0.5rem;
	margin-top: 20px;
}
.checkbox-card:hover {
	background-color: var(--color-fill-2);
}
.checkbox-card-checked {
	width: 150px;
	height: 180px;
	cursor: pointer;
	user-select: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	border-radius: 0.5rem;
	margin-top: 20px;
	background-color: var(--color-primary-light-1);
}
.checkbox-card-checked :deep(.arco-checkbox),
.checkbox-card :deep(.arco-checkbox) {
	position: absolute;
	display: none;
}
.operation {
	opacity: 0;
}
.checkbox-card:hover :deep(.arco-checkbox),
.checkbox-card:hover .operation {
	display: block;
	opacity: 1;
}
.checkbox-card-checked:hover .operation {
	opacity: 1;
}
.checkbox-card-checked :deep(.arco-checkbox) {
	display: block;
}
.grid-centen :deep(.arco-checkbox-group) {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	/* justify-items: center; */
	gap: 10px;
}
.action-bar {
	width: 30px;
	height: 30px;
	cursor: pointer;
	font-size: 15px;
	color: var(--color-text-2);
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
}
.action-bar:hover {
	background-color: var(--color-fill-1);
	color: var(--color-text-1);
}
.action-bar:last-child {
	margin-right: 0px;
}

.checkbox-list-box :deep(.arco-checkbox-group) {
	display: block;
}
.list-col {
	display: flex;
	justify-content: start;
	align-items: center;
	height: 100%;
}
.list-col-tag:deep(.arco-tag) {
	border-radius: 100%;
	width: 25px;
	height: 25px;
	padding: 2px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
