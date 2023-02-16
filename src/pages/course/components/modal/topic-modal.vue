<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
import clozeQuestions from '../topic/cloze-questions.vue'
import judgementQuestions from '../topic/judgement-questions.vue'
import multipleChoiceQuestion from '../topic/multiple-choice-question.vue'
import shortAnswerQuestion from '../topic/short-answer-question.vue'
const show = ref(false)
const topicType = ref()
const data = ref()
/**
 * 关闭或者打开模态框
 * @param topic 题型
 * @param operations 是否打开模态框
 * @param param 参数
 */
const toggleModal = (topic: string, operations: boolean, param?: any) => {
	show.value = operations
	topicType.value = topic
	data.value = param
	console.log(topic, operations, param)
}

defineExpose({ toggleModal })

//题目ref合集
const multipleChoiceQuestionRef = ref() // 单选题&多选题
const judgementQuestionsRef = ref() //判断题
const clozeQuestionsRef = ref() //填空题
const shortAnswerQuestionRef = ref() //简答题
const computeTopicTypeToRef = () => {
	switch (topicType.value) {
		case '单选题':
			return multipleChoiceQuestionRef
		case '多选题':
			return multipleChoiceQuestionRef
		case '判断题':
			return judgementQuestionsRef
		case '填空题':
			return clozeQuestionsRef
		case '简答题':
			return shortAnswerQuestionRef
	}
}

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

//重置
const reset = () => {
	const topicRef = computeTopicTypeToRef()
	if (topicRef) {
		topicRef.value.reset()
	}
}

const emit = defineEmits(['change'])
//保存
const loading = ref(false)
const save = async () => {
	loading.value = true
	const topicRef = computeTopicTypeToRef()
	if (topicRef) {
		const res = await topicRef.value.save()
		if (res) {
			show.value = false
			emit('change')
		}
		loading.value = false
	}
}
</script>

<template>
	<a-modal :visible="show" :title="topicType" :width="1200" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<clozeQuestions v-if="topicType === '填空题'" ref="clozeQuestionsRef"></clozeQuestions>
		<judgementQuestions v-if="topicType === '判断题'" ref="judgementQuestionsRef"></judgementQuestions>
		<multipleChoiceQuestion v-if="topicType === '单选题'" type="单选题" ref="multipleChoiceQuestionRef"></multipleChoiceQuestion>
		<multipleChoiceQuestion v-if="topicType === '多选题'" type="多选题" ref="multipleChoiceQuestionRef"></multipleChoiceQuestion>
		<shortAnswerQuestion v-if="topicType === '简答题'" ref="shortAnswerQuestionRef"></shortAnswerQuestion>
		<div class="center justify-between mt-30px">
			<a-tooltip content="清空入的内容" position="right" mini>
				<a-button @click="reset">重置</a-button>
			</a-tooltip>
			<div>
				<a-button class="mr-10px" @click="close">取消</a-button>
				<a-button :loading="loading" @click="save" type="primary">保存</a-button>
			</div>
		</div>
	</a-modal>
</template>

<style lang="scss"></style>
