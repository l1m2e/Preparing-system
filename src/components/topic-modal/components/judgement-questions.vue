<script lang="ts" setup>
import { useTopicSubmit, useGetImageSrcId, useMarkUseImage } from '../composables/useTopic'

const topic = ref('') //题目富文本
const analysis = ref('') //答案解析富文本
// 判断题选项
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
const judgementOptionsValue = ref('A') // 答案
const difficultyOptionsValue = ref(1) // 问题难度

//重置
const reset = () => {
	topic.value = ''
	analysis.value = ''
}

//保存
const save = async () => {
	//判空
	if (topic.value === '' || topic.value === '<p><br></p>') {
		Message.error('题目不能为空')
		return false
	}

	//保存编辑器中的图片
	const imageIdList = [...useGetImageSrcId(topic.value), ...useGetImageSrcId(analysis.value)]
	const markImgeRes = await useMarkUseImage(imageIdList)
	if (!markImgeRes) {
		Message.error('图片保存失败')
		return
	}

	//提交
	const param = {
		analysis: analysis.value, // 答案解析
		answer: [judgementOptionsValue.value], //答案
		difficulty: difficultyOptionsValue.value, // 难度
		title: topic.value, //题目标题
		type: 4 // 题目类型 1单选 5多选
	}
	const submitRes = await useTopicSubmit(param)
	if (submitRes.isSuccess) {
		Message.success(submitRes.message)
		reset()
		return true
	} else {
		Message.error(submitRes.message)
		return false
	}
}

defineExpose({ reset, save })
</script>

<template>
	<div>
		<wang-edit v-model="topic" placeholder="请输入题目" min-height="200"></wang-edit>
		<wang-edit-show class="mt-20px" placeholder="请输入答案解析 非必填" v-model="analysis"></wang-edit-show>
		<div class="mt-20px center justify-start">
			<span>答案：</span>
			<a-select class="max-w-200px" :default-value="1" v-model="judgementOptionsValue" :options="udgementOptions"></a-select>
			<span class="ml-30px">难度：</span>
			<difficulty v-model="difficultyOptionsValue"></difficulty>
		</div>
	</div>
</template>

<style scoped></style>
