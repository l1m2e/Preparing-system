<script lang="ts" setup>
import dayjs from 'dayjs'
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'
// 选中布局模式
const uiModel = ref<'grid' | 'list'>('grid')

const fileList = ref([])
const getFileList = async () => {
	const res = await api.queryQuestionBankList({})
	if (res.status === 200) {
		fileList.value = res.data.records
	}
}
getFileList()
const checkedList = ref<Array<number>>([])
const fileListUi = computed(() =>
	fileList.value.map((item: any) => {
		if (checkedList.value.includes(item.id)) {
			return { ...item, ...{ checked: true } }
		} else {
			return { ...item, ...{ checked: false } }
		}
	})
)
// 顺序对应后端返回的数组下标
const fileIconTextList = [
	{
		text: '单选题',
		icon: 'i-ri-check-line'
	},
	{
		text: '填空题',
		icon: 'i-ri-quill-pen-line'
	},
	{
		text: '简答题',
		icon: 'i-ri-draft-line'
	},
	{
		text: '判断题',
		icon: 'i-ri-question-mark'
	},
	{
		text: '多选题',
		icon: 'i-ri-check-double-line'
	}
]
</script>

<template>
	<!-- <div class="min-h-850px" v-region="{ customProperties: 'text', data: checkedList }"> -->
	<div class="min-h-850px" v-region:[arg]="checkedList">
		<a-dropdown trigger="contextMenu" alignPoint class="block">
			<div class="w-100% h-100%">
				<header class="center justify-between bg-[var(--color-bg-2)] h-40px">
					<a-button size="large" type="primary" shape="round">新建文件夹</a-button>
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
				<main class="w-100% h-auto mt-5px max-h-[calc(100%-50px)] overflow-y-auto scroll-bar">
					<div v-if="uiModel === 'grid'" class="w-100% grid-centen">
						<a-checkbox-group v-model="checkedList">
							<template v-for="item in fileListUi" :key="item.id">
								<div :class="`${item.checked ? 'checkbox-card-checked' : 'checkbox-card'} `">
									<a-checkbox :value="item.id" class="absolute top-6px left-1px">
										<template #checkbox="row">
											<div
												:class="`w-15px h-15px  rounded-full  border-solid transition ${
													row.checked ? 'border-5px border-[rgb(var(--primary-6))]' : 'border-1px border-[var(--color-border-3)]'
												}`"></div>
										</template>
									</a-checkbox>
									<img :src="folderSvg" v-if="item.type === 0" class="w-120px h-120px mt-10px" />
									<div v-if="item.type === 1 || item.type === 2 || item.type === 3 || item.type === 4 || item.type === 5" class="relative">
										<img :src="fileSvg" class="w-100px h-100px mt-20px mb-10px" />
										<div :class="`w-20px h-20px absolute left-[calc(50%-10px)] top-40% text-white ${fileIconTextList[item.type + 1].icon}`"></div>
										<div :class="`absolute left-30% top-65% text-white`">{{ fileIconTextList[item.type + 1].text }}</div>
									</div>
									<div>{{ item.title }}</div>
									<div class="text-12px mt-5px text-[var(--color-text-3)]">{{ dayjs(item.createdTimestamp).format('YYYY-MM-DD HH:mm') }}</div>
									<a-dropdown trigger="click">
										<div class="absolute right-5px top-5px i-ri-more-line text-[var(--color-border-3)] hover:text-[rgb(var(--primary-6))] text-20px operation"></div>
										<template #content>
											<a-doption v-if="item.type === 0">
												<template #icon><icon-edit /></template>
												重命名
											</a-doption>
											<a-doption>
												<template #icon><icon-to-right /></template>
												移动
											</a-doption>
											<a-doption>
												<template #icon><icon-delete /></template>
												删除
											</a-doption>
										</template>
									</a-dropdown>
								</div>
							</template>
						</a-checkbox-group>
					</div>
					<div v-else class="flex bg-blue w-100% h-100px"></div>
				</main>
			</div>
			<template #content>
				<a-doption>
					<template #icon><IconFolderAdd /></template>
					新建文件夹
				</a-doption>
				<a-doption>
					<template #icon><IconRefresh /></template>
					刷新
				</a-doption>
			</template>
		</a-dropdown>
	</div>
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
	gap: 10px;
}
</style>
