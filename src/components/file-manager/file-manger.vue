<script lang="ts" setup>
import dayjs from 'dayjs'
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'
import { useAutoChangGridLayout } from '~/composables'
import type { Props, Emit } from './interface.d'

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

onMounted(() => {
	useRegion(fileContentRef.value, 'data-file-id', (data) => {
		checkedIdList.value = data
		emit('update:modelValue', data)
	})
})

const fileContentRef = ref()

//修改布局样式
const { width: fileContentWidth } = useElementSize(fileContentRef)

watch(fileContentWidth, () => useAutoChangGridLayout(fileContentRef, 160, props.fileList.length, '.arco-checkbox-group'))
watch(
	() => props.fileList,
	() => useAutoChangGridLayout(fileContentRef, 160, props.fileList.length, '.arco-checkbox-group')
)

//被选中的文件列表
const checkedIdList = ref<Array<number>>([])
const fileListUi = computed(() =>
	//标记选中状态
	props.fileList.map((item) => {
		return checkedIdList.value.includes(item.id) ? { ...item, checked: true } : { ...item, checked: false }
	})
)

// 面包屑
</script>

<template>
	<div class="w-100% h-100% select-none overflow-y-auto scroll-bar grid-centen" ref="fileContentRef">
		<a-checkbox-group v-model="checkedIdList">
			<template v-for="item in fileListUi" :key="item.id">
				<div
					:class="`${item.checked ? 'checkbox-card-checked' : 'checkbox-card'}`"
					:data-file-id="item.id"
					@click="$emit('open', item)"
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
					<div v-else class="relative">
						<img :src="fileSvg" class="w-100px h-100px mt-20px mb-10px" />
						<!-- <div :class="`w-20px h-20px absolute left-[calc(50%-10px)] top-40% text-white ${fileIconTextList[item.type].icon}`"></div> -->
						<!-- <div :class="`absolute left-30% top-65% text-white `">{{ fileIconTextList[item.type].text }}</div> -->
					</div>
					<div class="truncate max-w-130px">{{ item.type === 0 ? item.fileName : item.fileName }}</div>
					<div class="text-12px mt-5px text-[var(--color-text-3)]">
						{{ dayjs(item.createdTimestamp).format('YYYY-MM-DD HH:mm') }}
					</div>
					<a-dropdown trigger="click">
						<div
							@click.stop=""
							class="absolute right-5px top-5px i-ri-more-line text-[var(--color-border-3)] hover:text-[rgb(var(--primary-6))] text-20px operation"></div>
						<template #content>
							<a-doption v-if="item.type === 0" @click="$emit('resetFolderName', item.id)">
								<template #icon><icon-edit /></template>
								重命名
							</a-doption>
							<a-doption @click="$emit('move', item.id)">
								<template #icon><icon-to-right /></template>
								移动
							</a-doption>
							<a-doption @click="$emit('delete', item.id)">
								<template #icon><icon-delete /></template>
								删除
							</a-doption>
						</template>
					</a-dropdown>
				</div>
			</template>
		</a-checkbox-group>
		<footer class="flex w-100% h-100px absolute bottom-0 left-0 right-0 center overflow-hidden" @mousedown.stop="">
			<Transition enter-active-class="animated-fade-in-up" leave-active-class="animated-fade-out-down" class="animated animated-faster">
				<div
					class="py-10px px-20px border border-1px border-[var(--color-border-1)] shadow-lg rounded-xl center overflow-hidden"
					v-if="checkedIdList.length !== 0">
					<a-tooltip content="删除" position="top" mini>
						<div class="action-bar" @click="$emit('delete', checkedIdList)"><div class="i-ri-delete-bin-6-line"></div></div>
					</a-tooltip>
					<a-tooltip content="移动" position="top" mini @click="$emit('move', checkedIdList)">
						<div class="action-bar"><div class="i-ri-share-forward-line"></div></div>
					</a-tooltip>
					<a-tooltip content="取消选中" position="top" mini>
						<div class="action-bar"><div class="i-ri-close-circle-line" @click="checkedIdList.length = 0"></div></div>
					</a-tooltip>
				</div>
			</Transition>
		</footer>
		<!-- <ResetFolderName></ResetFolderName> -->
	</div>
</template>

<style scoped lang="scss">
%card{
	--uno: w-150px h-180px cursor-pointer flex flex-col relative rounded-xl mt-20px items-center select-none;
}

:deep(.arco-checkbox-group) {
	--uno: grid gap-10px grid-cols-[repeat(auto-fit,minmax(150px,max-content))];
}
:deep(.arco-checkbox) {
	--uno: absolute hidden;
}

.checkbox-card {
	@extend %card;
	&:hover {
		--uno: bg-[var(--color-fill-2)];
		.operation,
		:deep(.arco-checkbox) {
			--uno: opacity-100 block;
		}
	}
}
.checkbox-card-checked {
	@extend %card;
	--uno: bg-[var(--color-primary-light-1)];
	&:hover	.operation  {
		--uno: opacity-100;
	}
	:deep(.arco-checkbox) {
		--uno: block;
	}
}
.operation {
	--uno: opacity-0;
}
.action-bar {
	--uno: w-30px h-30px cursor-pointer text-15px center rounded-5px color-[var(--color-text-2)] hover:bg-[var(--color-fill-1)];
	&:last-child {
		--uno: mr-0;
	}
}
</style>
