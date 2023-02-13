<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'

const show = ref(false)
const topicType = ref()
const data = ref()
/**
 * 关闭或者打开模态框
 * @param topic 题型
 * @param operations 是否打开模态框
 * @param param 参数
 */
const toggleModal = (topic: string, operations: boolean, param: any) => {
	show.value = operations
	topicType.value = topic
	data.value = param
}

defineExpose({ toggleModal })

const close = () => {
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
	<a-modal :visible="show" title="添加单选题" :width="1200" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<h1>就立刻煎熬了就给朗朗</h1>
		<h1>就立刻煎熬了就给朗朗</h1>
		<h1>就立刻煎熬了就给朗朗</h1>
		<h1>就立刻煎熬了就给朗朗</h1>
		<h1>就立刻煎熬了就给朗朗</h1>
		<div class="center justify-end">
			<a-button class="mr-10px" @click="close">取消</a-button>
			<a-button @click="show = false" type="primary">保存</a-button>
		</div>
	</a-modal>
</template>

<style lang="scss"></style>
