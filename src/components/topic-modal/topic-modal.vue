<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
import { getKeysObjec, setReactive } from '~/utils'
import { topicStore, resetTopicStore } from './store'
import { courseInfoStore } from '~/store/courseStore'
import { getRichTextImageIds } from '~/utils'

const show = ref(false)
const topicType = ref<string>('')

/**
 * 关闭或者打开模态框
 * @param topic 题型
 * @param operations 是否打开模态框
 * @param param 参数
 */
const toggleModal = async (topic: string, operations: boolean, id?: any) => {
	topicType.value = topic
	//如果为打开 并且存在id请求则为编辑提问请求 请求一以前的数据
	if (operations && id) {
		await getTopic(id)
	}

	show.value = operations
}

/** 获取题目信息 */
const getTopic = async (id: number) => {
	const res = await api.getTopicInfoById(id)
	if (res.status === 200) {
		const obj = getKeysObjec(res.data, ['analysis', 'title', 'difficulty'])
		setReactive(topicStore, obj)

		switch (topicType.value) {
			case '单选题':
			case '多选题':
				res.data.choices.forEach((item: any) => {
					item.isAnswer = res.data.answer.includes(item.unique)
				})
				topicStore.optionList = res.data.choices
				console.log(topicStore.optionList)
				break

			case '判断题':
				topicStore.judgementOptionsAnswer = res.data.answer
				break

			case '简答题':
				topicStore.shortQuestionAnswer = res.data.answer[0]
				break

			case '填空题':
				topicStore.clozeQuestionList = res.data.answer.map((item: any) => {
					return {
						text: item
					}
				})
				break
		}
	} else {
		Message.error('获取题目信息失败')
	}
}

defineExpose({ toggleModal })

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

const emit = defineEmits(['change'])

const loading = ref(false)

//保存
const save = async () => {
	const isImageSaved = await saveImage()

	if (!isImageSaved) return Message.error('图片保存失败')

	const isTopicSaved = await saveTopic()

	if (!isTopicSaved) return Message.error('保存题目失败')

	emit('change')
	show.value = false
	Message.success('保存成功')
}

//保存图片
const saveImage = async () => {
	//所有的富文本内容
	const richText = [
		topicStore.analysis,
		topicStore.title,
		...topicStore.clozeQuestionList.map((item) => item.text),
		...topicStore.optionList.map((item) => item.text)
	].join('')

	const imageIdList = getRichTextImageIds(richText)

	// 如果数组为空直接return
	if (imageIdList.length === 0) return true

	loading.value = true
	const res = await api.markUseImage(imageIdList)
	loading.value = false

	// 返回结果
	return res.status === 200
}

//保存题目
const saveTopic = async () => {
	const answer = getAnswer() // 获取答案
	const isEmpty = checkEmpty(answer) // 判空
	if (!isEmpty) return false

	const choices = topicStore.optionList.map((item) => {
		const { isAnswer, ...res } = item
		return res
	})

	const type = {
		单选题: 1,
		填空题: 2,
		简答题: 3,
		判断题: 4,
		多选题: 5
	}[topicType.value]

	const params = {
		answer,
		type,
		...getKeysObjec(topicStore, ['analysis', 'title', 'difficulty']),
		...(['单选题', '多选题'].includes(topicType.value) && { choices })
	}

	if (!courseInfoStore.value.id) return message('没有获得课程id')

	loading.value = true
	const res = await api.addIssue(courseInfoStore.value.id, params)
	loading.value = false

	return res.status === 200
}

//获取答案
const getAnswer = () => {
	switch (topicType.value) {
		case '单选题':
			const answer = topicStore.optionList.find((item) => item.isAnswer === true)?.unique
			return answer ? [answer] : []

		case '多选题':
			return [...topicStore.optionList.filter((item) => item.isAnswer === true).map((item) => item.unique)]

		case '填空题':
			return [...topicStore.clozeQuestionList.map((item) => item.text)]

		case '判断题':
			return [topicStore.judgementOptionsAnswer]

		case '简答题':
			return [topicStore.shortQuestionAnswer]
	}
	return []
}

//判空
const checkEmpty = (answerList: Array<string | undefined>) => {
	if (!topicStore.title || topicStore.title === '<p><br></p>') return message('标题不能为空')
	console.log(topicType.value)
	switch (topicType.value) {
		case '单选题':
		case '多选题':
			if (answerList.length === 0) return message('请选择答案')
			const isOptionsContent = topicStore.optionList.find((item) => item.text === '' || item.text === '<p><br></p>')
			if (isOptionsContent) return message('请填写全部选项内容')
			break

		case '填空题':
			if (topicStore.clozeQuestionList.some((item) => item.text === '')) return message('请将所有空填写完整')
			break

		case '简答题':
			if (topicStore.shortQuestionAnswer === '') return message('简答题答案不可为空')
	}

	return true
}

//封装messag
const message = (msg: string) => {
	Message.error(msg)
	return false
}
</script>

<template>
	<a-modal
		:visible="show"
		:title="topicType"
		:width="1200"
		:closable="false"
		:mask-closable="false"
		:esc-to-close="false"
		:footer="false"
		@before-close="resetTopicStore">
		<cloze-questions v-if="topicType === '填空题'"></cloze-questions>
		<judgement-questions v-if="topicType === '判断题'"></judgement-questions>
		<multiple-choice-question v-if="topicType === '单选题'" type="单选题"></multiple-choice-question>
		<multiple-choice-question v-if="topicType === '多选题'" type="多选题"></multiple-choice-question>
		<short-answer-question v-if="topicType === '简答题'"></short-answer-question>
		<div class="center justify-between mt-30px">
			<a-tooltip content="清空入的内容" position="right" mini>
				<a-button @click="resetTopicStore">重置</a-button>
			</a-tooltip>
			<div>
				<a-button class="mr-10px" @click="close">取消</a-button>
				<a-button :loading="loading" @click="save" type="primary">保存</a-button>
			</div>
		</div>
	</a-modal>
</template>
