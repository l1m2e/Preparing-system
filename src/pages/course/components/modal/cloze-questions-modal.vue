<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
const show = ref(false)
//将打开对话框的open函数暴露出去
const open = () => {
	show.value = true
}
defineExpose({ open })

const beforeClose = () => {
	Modal.info({
		title: '提示',
		content: '题目暂未保存，确定取消保存？',
		hideCancel: false,
		onOk: () => {
			show.value = false
		}
	})
}
</script>

<template>
	<a-modal :visible="show" title="添加单选题" :width="1200" okText="保存" cancelText="取消" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<h1>就立刻煎熬了就给朗朗</h1>
		<h1>就立刻煎熬了就给朗朗</h1>
		<h1>就立刻煎熬了就给朗朗</h1>
		<h1>就立刻煎熬了就给朗朗</h1>
		<h1>就立刻煎熬了就给朗朗</h1>
		<div class="center justify-end">
			<a-button class="mr-10px" @click="beforeClose">取消</a-button>
			<a-button @click="show = false" type="primary">保存</a-button>
		</div>
	</a-modal>
</template>

<style scoped></style>
