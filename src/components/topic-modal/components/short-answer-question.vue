<script lang="ts" setup>
import { topicStore } from '../store'
</script>

<template>
	<wang-edit v-model="topicStore.title" placeholder="请输入题目"></wang-edit>
	<wang-edit class="mt-20px" v-model="topicStore.shortQuestionAnswer" placeholder="请输入答案"></wang-edit>
	<wang-edit-show class="mt-20px" placeholder="请输入答案解析 非必填" v-model="topicStore.analysis"></wang-edit-show>
	<div class="mt-20px center justify-start">
		<span>难度：</span>
		<difficulty v-model="topicStore.difficulty"></difficulty>
	</div>
</template>

<style scoped></style>
