<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'

const show = ref(false)
const treeData = ref([{ title: '根目录', key: 0, children: [] }])

const open = async () => {
	show.value = true
	const onelevel = await getFileList()
	treeData.value[0].children = onelevel
}
defineExpose({ open })

const pagination = {
	current: 1,
	size: 20,
	page: 1
}
//获取文件列表并且格式化为需要的格式
const getFileList = async (fid?: number) => {
	const param = { ...pagination, ...(fid && { fid }) }
	const res = await api.queryQuestionBankList(param)

	if (res.status === 200) {
		const data = res.data.records.filter((item: any) => item.type === 0)
		return data.map((item: any) => {
			return { title: item.keyword, key: item.id }
		})
	}
}

//加载目录
const loadMore = async (nodeData: any) => {
	return new Promise<void>(async (resolve) => {
		nodeData.children = await getFileList(nodeData.key)
		resolve()
	})
}

const close = () => {
	Modal.info({
		title: '提示',
		content: '您确定要取消操作吗？',
		hideCancel: false,
		onOk: () => {
			show.value = false
		}
	})
}
</script>

<template>
	<a-modal :visible="show" title="请选择您的目录" :width="500" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<div class="h-300px w-100%">
			<a-tree :show-line="true" :data="treeData" :load-more="loadMore" />
		</div>
		<div class="center justify-end mt-30px">
			<div>
				<a-button class="mr-10px" @click="close">取消</a-button>
				<a-button @click="show = true" type="primary">确定</a-button>
			</div>
		</div>
	</a-modal>
</template>

<style lang="scss"></style>
