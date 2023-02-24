<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
import { getFileList } from '~/store/fileStore'

const params = reactive({
	keyword: '',
	fid: 0
})

const addFolder = async () => {
	const res = await api.addFolder(params)
	if (res.status === 200) {
		Message.success('添加文件夹成功')
		await getFileList()
		show.value = false
	} else {
		Message.error('添加文件夹失败')
	}
}

const show = ref(false)
const open = async (fid?: number) => {
	show.value = true
	if (fid) {
		params.fid = fid
	}
}
defineExpose({ open })

const close = () => {
	Modal.info({
		title: '提示',
		content: '您确定要取消操作吗？',
		hideCancel: false,
		onOk: () => {
			show.value = false
			params.keyword = ''
		}
	})
}
</script>

<template>
	<a-modal :visible="show" title="新建文件夹" :width="500" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<a-input placeholder="请输入文件夹名称" v-model="params.keyword"></a-input>
		<div class="center justify-end mt-30px">
			<div>
				<a-button class="mr-10px" @click="close">取消</a-button>
				<a-button @click="addFolder" type="primary">确定</a-button>
			</div>
		</div>
	</a-modal>
</template>

<style lang="scss"></style>
