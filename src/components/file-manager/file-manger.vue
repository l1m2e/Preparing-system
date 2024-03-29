<script lang="ts" setup>
import dayjs from 'dayjs'
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'
import { useAutoChangGridLayout } from '~/composables'
import type { Props, Emit, File } from './interface.d'
import { richTextFilterText } from '~/utils'

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const modelValue = defineModel<number[]>() //被选中的文件列表

onMounted(() => {
	useRegion(fileContentRef.value, 'data-file-id', (data) => {
		if (props.disabled) return
		modelValue.value = data
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

const fileListUi = computed(() =>
	//标记选中状态
	props.fileList.map((item) => {
		return modelValue.value?.includes(item.id as number) ? { ...item, checked: true } : { ...item, checked: false }
	})
)

const shareColor = {
	1: 'text-white',
	2: 'text-red'
}

const fileOperation = [
	{ icon: 'i-ri-edit-line', text: '重命名', onClick: (file: File) => emit('resetFolderName', file.id) },
	{ icon: 'i-ri-share-line', text: '分享', onClick: (file: File) => emit('onShare', file) },
	{ icon: 'i-ri-link-unlink', text: '取消分享', onClick: (file: File) => emit('onShare', file) },
	{ icon: 'i-ri-share-forward-2-line', text: '移动', onClick: (file: File) => emit('move', file.id) },
	{ icon: 'i-ri-delete-bin-line', text: '删除', onClick: (file: File) => emit('delete', file.id) },
	{ icon: 'i-ri-download-line', text: '下载', onClick: (file: File) => emit('download', file) }
]

// 根据组件权限筛选按钮
const filterFileBtnByPermission = computed(
	() =>
		fileOperation
			.filter((item) => !props.disabledFileOperation || item.text === '下载') // 是否禁用 用户操作
			.filter((item) => props.share || !['分享', '取消分享'].includes(item.text)) //是否显示分享
			.filter((item) => props.download || item.text !== '下载') // 是否显示下载
)

const filterFileBtnByState = (file: File) =>
	filterFileBtnByPermission.value
		.filter((item) => !(file.shareType === 0 && item.text === '取消分享')) // 未分享取隐藏消分享按钮
		.filter((item) => !(file.shareType !== 0 && item.text === '分享')) // 已分享隐藏分享按钮
		.filter((item) => !(file.type === 0 && item.text === '下载')) // 文件夹隐藏下载按钮
		.filter((item) => !([1, 2, 3, 4].includes(file.type) && item.text === '重命名')) // 如果是问题隐藏重命名按钮
</script>

<template>
	<a-dropdown trigger="contextMenu" alignPoint class="block">
		<div class="w-100% min-h-99% select-none relative flex flex-col justify-between" ref="fileContentRef">
			<a-checkbox-group v-model="modelValue">
				<div
					v-for="item in fileListUi"
					:class="`${item.checked ? 'checkbox-card-checked' : 'checkbox-card'}`"
					:data-file-id="item.id"
					@dblclick="$emit('open', item)"
					ref="gridItemsRef">
					<a-checkbox :value="item.id" class="absolute top-6px left-1px" @click.stop="">
						<template #checkbox="row">
							<div
								v-if="!props.disabled"
								:class="`w-15px h-15px  rounded-full  border-solid transition ${
									row.checked ? 'border-5px border-[rgb(var(--primary-6))]' : 'border-1px border-[var(--color-border-3)]'
								}`"></div>
						</template>
					</a-checkbox>

					<a-tooltip :content="item.shareType === 1 ? '已共享至拥有该科目的老师' : '已共享至全校的老师'" position="top" mini>
						<Transition enter-active-class="animated-zoom-in" leave-active-class="animated-zoom-out" class="animated animated-faster">
							<div
								v-if="props.share && item.shareType"
								class="absolute bottom-70px z-1 right-40px i-ri-links-line"
								:class="`${item.shareType && shareColor[item.shareType]} ${item.type === 0 && 'right-25px!'}`"></div>
						</Transition>
					</a-tooltip>

					<img :src="folderSvg" v-if="item.type === 0" class="w-120px h-120px mt-10px" />
					<div v-else class="relative">
						<img :src="fileSvg" class="w-100px h-100px mt-20px mb-10px" />
						<slot name="fileIcon" :type="item.type" :file="item"></slot>
					</div>
					<div class="truncate max-w-130px">{{ richTextFilterText(item.fileName) }}</div>
					<div class="text-12px mt-5px text-[var(--color-text-3)]">
						{{ dayjs(item.createdTimestamp).format('YYYY-MM-DD HH:mm') }}
					</div>
					<a-dropdown trigger="click">
						<div
							v-if="!props.disabled"
							@click.stop=""
							class="absolute right-5px top-5px i-ri-more-line text-[var(--color-border-3)] hover:text-[rgb(var(--primary-6))] text-20px operation"></div>
						<template #content>
							<a-doption v-for="v in filterFileBtnByState(item)" @click="v.onClick(item)">
								<div class="flex items-center">
									<div :class="v.icon"></div>
									<div class="ml-10px">{{ v.text }}</div>
								</div>
							</a-doption>
						</template>
					</a-dropdown>
				</div>
			</a-checkbox-group>

			<div class="flex w-100% h-100px sticky bottom-0 left-0 right-0 center overflow-hidden" @mousedown.stop="">
				<Transition enter-active-class="animated-fade-in-up" leave-active-class="animated-fade-out-down" class="animated animated-faster">
					<slot name="footerPopup" v-if="modelValue.length !== 0">
						<div
							class="py-10px px-20px border border-1px border-[var(--color-border-1)] bg-[var(--color-bg-1)] shadow-lg rounded-xl center overflow-hidden">
							<a-tooltip content="删除" position="top" mini>
								<div class="action-bar" @click="$emit('delete', modelValue)"><div class="i-ri-delete-bin-6-line"></div></div>
							</a-tooltip>
							<a-tooltip content="移动" position="top" mini @click="$emit('move', modelValue)">
								<div class="action-bar"><div class="i-ri-share-forward-line"></div></div>
							</a-tooltip>
							<a-tooltip content="取消选中" position="top" mini>
								<div class="action-bar"><div class="i-ri-close-circle-line" @click="modelValue.length = 0"></div></div>
							</a-tooltip>
						</div>
					</slot>
				</Transition>
			</div>
		</div>
		<!-- 右键菜单 -->
		<template #content>
			<a-doption @click="emit('created')" v-if="!props.disabledCreated">
				<div class="center">
					<div class="i-ri-folder-open-line mr-5px"></div>
					<span>新建文件夹</span>
				</div>
			</a-doption>
			<a-doption @click="emit('refresh')">
				<div class="center">
					<div class="i-ri-restart-line mr-5px"></div>
					<span>刷新</span>
				</div>
			</a-doption>
		</template>
	</a-dropdown>
</template>

<style scoped lang="scss">
%card{
	--uno: w-150px h-180px cursor-pointer flex flex-col relative rounded-xl mt-20px items-center select-none;
}
// prettier-ignore
:deep(.arco-checkbox-group) {
	--uno: grid gap-10px grid-cols-[repeat(auto-fit,minmax(150px,max-content))];
}
:deep(.arco-checkbox) {
	--uno: absolute hidden;
}

// prettier-ignore
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

// prettier-ignore
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
// prettier-ignore
.action-bar {
	--uno: w-30px h-30px cursor-pointer text-15px center rounded-5px color-[var(--color-text-2)] hover:bg-[var(--color-fill-1)] last:mr-0;
}
</style>
