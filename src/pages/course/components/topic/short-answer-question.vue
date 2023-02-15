<script lang="ts" setup>
import wangEdit from '../editor/wang-edit.vue'
import wangEditShow from '../editor/wang-edit-show.vue'
import difficulty from './components/difficulty.vue'
import { useTopicSubmit, useGetImageSrcId, useMarkUseImage } from './composables/useTopic'
const topic = ref('') //题目富文本
const analysis = ref('') //答案解析富文本
const answer = ref('')

const difficultyOptionsValue = ref(1)

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
	const imageIdList = [...useGetImageSrcId(topic.value), ...useGetImageSrcId(analysis.value), ...useGetImageSrcId(answer.value)]
	const markImgeRes = await useMarkUseImage(imageIdList)
	if (!markImgeRes) {
		Message.error('图片保存失败')
		return
	}

	//提交
	const param = {
		analysis: analysis.value, // 答案解析
		answer: [answer.value], //答案
		difficulty: difficultyOptionsValue.value, // 难度
		title: topic.value, //题目标题
		type: 3
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
	<wang-edit v-model="topic" placeholder="请输入题目"></wang-edit>
	<wang-edit class="mt-20px" v-model="answer" placeholder="请输入答案"></wang-edit>
	<wangEditShow class="mt-20px" placeholder="请输入答案解析 非必填" v-model="analysis"></wangEditShow>
	<div class="mt-20px center justify-start">
		<span>难度：</span>
		<difficulty v-model="difficultyOptionsValue"></difficulty>
	</div>
</template>

<style scoped></style>
