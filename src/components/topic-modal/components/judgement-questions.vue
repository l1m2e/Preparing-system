<script lang="ts" setup>
import { useTopicSubmit, useGetImageSrcId, useMarkUseImage } from '../composables/useTopic'
import { topicStore, resetTopicStore } from '../store'

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

//重置
const reset = () => resetTopicStore()

//保存
const save = async () => {
	//判空
	if (topicStore.title === '' || topicStore.title === '<p><br></p>') {
		Message.error('题目不能为空')
		return false
	}

	//保存编辑器中的图片
	const imageIdList = [...useGetImageSrcId(topicStore.title), ...useGetImageSrcId(topicStore.analysis)]
	const markImgeRes = await useMarkUseImage(imageIdList)
	if (!markImgeRes) {
		Message.error('图片保存失败')
		return
	}

	//提交
	const param = {
		analysis: topicStore.analysis, // 答案解析
		answer: [topicStore.judgementOptionsAnswer], //答案
		difficulty: topicStore.difficulty, // 难度
		title: topicStore.title, //题目标题
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
		<wang-edit v-model="topicStore.title" placeholder="请输入题目" min-height="200"></wang-edit>
		<wang-edit-show class="mt-20px" placeholder="请输入答案解析 非必填" v-model="topicStore.analysis"></wang-edit-show>
		<div class="mt-20px center justify-start">
			<span>答案：</span>
			<a-select class="max-w-200px" :default-value="1" v-model="topicStore.judgementOptionsAnswer" :options="udgementOptions"></a-select>
			<span class="ml-30px">难度：</span>
			<difficulty v-model="topicStore.difficulty"></difficulty>
		</div>
	</div>
</template>

<style scoped></style>
