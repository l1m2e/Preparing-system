<script lang="ts" setup>
import { changeTextToCN } from '~/utils'
import { topicStore } from '../store'

//添加答案
const addAnswer = () => {
	const obj = { text: '' }
	topicStore.clozeQuestionList.push(obj)
}
//删除答案
const deleteAnswer = (index: number) => {
	if (topicStore.clozeQuestionList.length <= 1) return Message.error('填空题必须保留一个空')
	topicStore.clozeQuestionList.splice(index, 1)
}
</script>

<template>
	<div>
		<wang-edit v-model="topicStore.title" placeholder="请输入题目 每个填空请用____( 下划线 )表示"></wang-edit>

		<div class="m-auto mt10 flex options-item" v-for="(item, index) in topicStore.clozeQuestionList">
			<div class="min-w-70px center mr-10px">
				<a-button size="large" shape="circle">{{ index + 1 }}</a-button>
			</div>
			<div class="w-100%">
				<a-input size="large" :placeholder="`请输入第${changeTextToCN(index + 1)}个空的答案`" v-model="item.text"></a-input>
			</div>
			<div class="min-w-50px ml-10px center">
				<a-button shape="circle" status="danger" size="mini" class="delete-icon" @click="deleteAnswer(index)">
					<div class="i-ri-delete-bin-2-line"></div>
				</a-button>
			</div>
		</div>

		<div class="center justify-start w-100% box-border mt-30px">
			<a-button @click="addAnswer" type="text">添加一个新的空</a-button>
		</div>

		<wang-edit-show class="mt-20px" placeholder="请输入答案解析 非必填" v-model="topicStore.analysis"></wang-edit-show>

		<div class="mt-20px center justify-start">
			<span>难度：</span>
			<difficulty v-model="topicStore.difficulty"></difficulty>
		</div>
	</div>
</template>

<style scoped>
.delete-icon {
	display: none;
	max-width: 30px;
}
.options-item:hover .delete-icon {
	display: flex;
}
.form:deep(.arco-form-item-label-col) {
	max-width: 30px;
	margin-left: 20px;
}
</style>
