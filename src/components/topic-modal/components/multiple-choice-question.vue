<script lang="ts" setup>
import { topicStore } from '../store'

const props = defineProps<{
	type: '单选题' | '多选题'
}>()

let modalType = computed(() => (props.type === '单选题' ? true : false)) // true 为单选 false 为多选

//添加一个选项
const optionLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const addOptions = () => {
	if (topicStore.optionList.length >= 26) return Message.error('最多只能添加26个选项')
	topicStore.optionList.push({
		text: '',
		isAnswer: false,
		unique: optionLetter.charAt(topicStore.optionList.length)
	})
}

//删除选项
const deleteOptions = (index: number) => {
	topicStore.optionList.splice(index, 1)
	for (let i = 0; i < topicStore.optionList.length; i++) {
		topicStore.optionList[i].unique = optionLetter[i]
	}
}

//设置答案
const setAnswer = (index: number) => {
	if (modalType.value) {
		// 单选启用排他算法
		topicStore.optionList.forEach((item) => {
			item.isAnswer = false
		})
	}
	topicStore.optionList[index].isAnswer = !topicStore.optionList[index].isAnswer
}
</script>

<template>
	<!-- 内容 -->
	<div class="h-700px overflow-y-auto overflow-x-hidden py-20px box-border scroll-bar">
		<div class="w-90% m-auto">
			<wang-edit min-height="50" placeholder="请输入题目" v-model="topicStore.title"></wang-edit>
		</div>
		<div class="w-90% m-auto">
			<div class="m-auto mt-10 flex options-item" v-for="(item, index) in topicStore.optionList">
				<div class="min-w-70px center mr-10px">
					<a-tooltip :content="`${modalType ? '设为答案' : item.isAnswer ? '取消' : '设为答案'}`" position="left" mini>
						<a-button shape="circle" :type="item.isAnswer ? 'primary' : 'secondary'" size="large" @click="setAnswer(index)">
							{{ item.unique }}
						</a-button>
					</a-tooltip>
				</div>
				<div class="w-100%">
					<wang-edit-show placeholder="请输入答案选项内容" v-model="item.text"></wang-edit-show>
				</div>
				<div class="min-w-50px ml-10px center">
					<a-button shape="circle" status="danger" size="mini" class="delete-icon" @click="deleteOptions(index)">
						<div class="i-ri-delete-bin-2-line"></div>
					</a-button>
				</div>
			</div>
			<div class="center justify-start w-100% mt-30px box-border">
				<a-button @click="addOptions" type="text">添加一个新的选项</a-button>
			</div>
			<a-divider dashed />
			<div class="w-100%">
				<wang-edit-show placeholder="答案解析" v-model="topicStore.analysis"></wang-edit-show>
			</div>
			<div class="mt-20px center justify-start">
				<span>难度：</span>
				<difficulty v-model="topicStore.difficulty"></difficulty>
			</div>
		</div>
	</div>
</template>

<style scoped>
.delete-icon {
	display: none;
}
.options-item:hover .delete-icon {
	display: flex;
}
</style>
