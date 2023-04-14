<script lang="ts" setup>
import { topicStore } from '../store'

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
