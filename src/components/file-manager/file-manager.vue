<script lang="ts" setup>
import dayjs from 'dayjs'
import folderSvg from '~/assets/svg/folder.svg'
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
</script>

<template>
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
								<a-checkbox :value="item.id" class="top-5px left-5px">
									<template #checkbox>
										<div bg-red w-10px h-10px></div>
									</template>
								</a-checkbox>
								<img :src="folderSvg" class="w-120px h-120px mt-10px" />
								<div>{{ item.title }}</div>
								<div class="text-12px mt-5px text-[var(--color-text-3)]">{{ dayjs(item.createdTimestamp).format('YYYY-MM-DD HH:mm') }}</div>
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
	<!-- 头部  -->
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
.checkbox-card:hover :deep(.arco-checkbox) {
	display: block;
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
