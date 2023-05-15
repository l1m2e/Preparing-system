<script lang="ts" setup>
import folderSvg from '~/assets/svg/folder.svg'
import fileSvg from '~/assets/svg/file.svg'
import { Props, Emit } from './interface.d'

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
//触底
const pullLoad = () => {}

const selectedList = ref<Array<number>>([])

const clickFile = (item: any) => {}

const cancel = () => {
	emit('update:modelValue', false)
}

//点击面包屑
const clickBreadcrumb = (id: number) => {}

//
const breadcrumbList = reactive([
	{
		fileName: '首页',
		fid: 0,
		id: 0
	}
])
const ok = () => {}
</script>

<template>
	<a-modal
		:visible="props.modelValue"
		title="移动到"
		:width="500"
		:closable="false"
		:mask-closable="false"
		:esc-to-close="false"
		:footer="false"
		:body-style="{ padding: 0 }">
		<header>
			<a-breadcrumb separator=">" :max-count="3" class="ml-10px my-10px">
				<a-breadcrumb-item v-for="item in breadcrumbList" @click="clickBreadcrumb(item.fid)" class="max-w-120px truncate">
					{{ item.fileName }}
				</a-breadcrumb-item>
			</a-breadcrumb>
		</header>
		<main class="w-100% h-500px overflow-y-auto scroll-bar overflow-x-hidden" v-on-reach-bottom="{ cb: pullLoad }">
			<a-row
				v-for="item in props.fileList"
				@click="clickFile(item)"
				class="py-10px mx-10px box-border rounded hover:bg-[var(--color-fill-2)] cursor-pointer !items-center first:mt-10px transition mb-10px"
				:class="selectedList.includes(item.id) && 'bg-blue-1 hover:bg-blue-1 dark:bg-blue-5 dark:hover:bg-blue-5'">
				<a-col :span="3" class="center"><img :src="item.type ? fileSvg : folderSvg" class="w-30px h-30px" /></a-col>
				<a-col :span="21" class="truncate">{{ item.fileName }}</a-col>
			</a-row>
		</main>
		<footer class="w-100% flex items-center justify-between mt-15px p-15px">
			<!-- <div>
				<a-button type="text" @click="createdFolderRef.open()">新建文件夹</a-button>
			</div> -->
			<div>
				<a-button @click="cancel">取消</a-button>
				<a-badge :count="selectedList.length" :dotStyle="{ background: '#3b82f6' }">
					<a-button type="primary" class="ml-10px" @click="ok">移动到此处</a-button>
				</a-badge>
			</div>
		</footer>
		<!-- <CreatedFolder ref="createdFolderRef" :fid="breadcrumbLastId" @ok="createdFolderSuccess"></CreatedFolder> -->
	</a-modal>
</template>
