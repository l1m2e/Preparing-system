<script lang="ts" setup>
const show = ref(false)

const title = ref('')

const open = async () => {
	show.value = true
	const res = await api.issue.getQuestionInfoById(295)
	title.value = res.data.title
}

const close = () => {
	api.issue.updateQuestionById(295, { title: title.value, analysis: '', difficulty: 1, answer: ['xx'], type: 3 })
	title.value = ''
	show.value = false
}

//保存题目

//修改题目
</script>

<template>
	<div class="w-100vw h-100vh m-auto bg-dark center flex flex-col">
		<a-modal :visible="show" @ok="close">
			<wang-edit-show placeholder="请输入中文" v-model="title" />
		</a-modal>
		<div mt-30px>
			<div class="btn" @click="open">打开</div>
			<div class="btn ml-10px" @click="close">关闭</div>
		</div>
	</div>
</template>
