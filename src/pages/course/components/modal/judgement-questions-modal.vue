<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
import wangEdit from '../editor/wang-edit.vue'
import wangEditShow from '../editor/wang-edit-show.vue'
import { getImageSrcId, markUseImage } from './utils/modalUtils'
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
			reset()
		}
	})
}

const topic = ref('') //题目富文本
const analysis = ref('') //答案解析富文本

// 问题难度
const udgementOptions = [
	{
		value: 'A',
		label: '对'
	},
	{
		value: 'B',
		label: '错'
	}
]
const judgementOptionsValue = ref('A')

// 问题难度
const difficultyOptions = [
	{
		value: 1,
		label: '易'
	},
	{
		value: 2,
		label: '中'
	},
	{
		value: 3,
		label: '难'
	}
]
const difficultyOptionsValue = ref(1)

//重置
const reset = () => {
	topic.value = ''
	analysis.value = ''
}

//提交
const submit = async () => {
	if (topic.value === '' || topic.value === '<p><br></p>') return { message: '题目不能为空', isSuccess: false }
	const param = {
		analysis: analysis.value, // 答案解析
		answer: [judgementOptionsValue.value], //答案
		difficulty: difficultyOptionsValue.value, // 难度
		title: topic.value, //题目标题
		type: 4 // 题目类型 1单选 5多选
	}
	const res = await api.addIssue(param)
	if (res.status === 200) {
		return { message: '提交成功', isSuccess: true }
	}
	return { message: '提交失败', isSuccess: false }
}

//保存
const btnLoading = ref(false)
const saveButton = async () => {
	btnLoading.value = true
	//保存编辑器中的图片
	const imageIdList = [...getImageSrcId(topic.value), ...getImageSrcId(analysis.value)]
	const markImgeRes = await markUseImage(imageIdList)
	if (!markImgeRes) {
		btnLoading.value = false
		Message.error('图片保存失败')
		return
	}
	const submitRes = await submit()
	btnLoading.value = false
	if (submitRes.isSuccess) {
		Message.success(submitRes.message)
		// show.value = true
	} else {
		Message.error(submitRes.message)
	}
}
</script>

<template>
	<a-modal :visible="show" title="添加判断题" :width="1200" okText="保存" cancelText="取消" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<wang-edit v-model="topic" placeholder="请输入题目" min-height="200"></wang-edit>
		<wangEditShow class="mt-20px" placeholder="请输入答案解析 非必填" v-model="analysis"></wangEditShow>
		<div class="mt-20px center justify-start">
			<span>答案：</span>
			<a-select class="max-w-200px" :default-value="1" v-model="judgementOptionsValue" :options="udgementOptions"></a-select>
			<span class="ml-30px">难度：</span>
			<a-select class="max-w-200px" :default-value="1" v-model="difficultyOptionsValue" :options="difficultyOptions"></a-select>
		</div>

		<!-- 底部 -->
		<div class="center justify-between mt-40px">
			<a-tooltip content="清空入的内容" position="right" mini>
				<a-button @click="reset">重置</a-button>
			</a-tooltip>
			<div>
				<a-button class="mr-10px" @click="beforeClose">取消</a-button>
				<a-button :loading="btnLoading" @click="saveButton" type="primary">保存</a-button>
			</div>
		</div>
	</a-modal>
</template>

<style scoped></style>
