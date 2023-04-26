<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
import { pick, setReactive } from '~/utils'
import { topicStore, resetTopicStore } from './store'
import { courseInfoStore } from '~/store/courseStore'

import { getRichTextImageIds } from '~/utils'

const show = ref(false)
const topicType = ref<string>('')

const openParam = {
	id: 0,
	fid: -1,
	isBank: false
}
/**
 * 关闭或者打开模态框
 * @param topic 题型
 * @param operations 是否打开模态框
 * @param param 参数
 */
const toggleModal = async (topic: string, param: { id?: number; fid?: number; isBank?: boolean }) => {
	topicType.value = topic
	//重置
	setReactive(openParam, { id: 0, fid: -1, isBank: false })
	//设置
	setReactive(openParam, param)

	if (param.id) {
		await getTopic(param.id)
	}

	show.value = true
}

/** 获取题目信息 */
const getTopic = async (id: number) => {
	const res = openParam.isBank ? await api.getQuestionInfoById(id) : await api.getQuestionInfoById1(id)
	if (res.status === 200) {
		const obj = pick(res.data, ['analysis', 'title', 'difficulty'])
		setReactive(topicStore, obj)

		switch (topicType.value) {
			case '单选题':
			case '多选题':
				const arr = res.data.choices!.map((item: any) => {
					item.isAnswer = res.data.answer!.includes(item.unique)
					return item
				})
				topicStore.optionList = arr
				break

			case '判断题':
				topicStore.judgementOptionsAnswer = res.data.answer![0]
				break

			case '简答题':
				topicStore.shortQuestionAnswer = res.data.answer![0]
				break

			case '填空题':
				topicStore.clozeQuestionList = res.data.answer!.map((item: any) => {
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
	const res = await api.saveImage(imageIdList)
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
	}[topicType.value]!

	const params = {
		answer,
		type,
		...pick(topicStore, ['analysis', 'title', 'difficulty']),
		...(['单选题', '多选题'].includes(topicType.value) && { choices })
	}

	if (!courseInfoStore.value.id) return message('没有获得课程id')

	loading.value = true
	let res

	if (openParam.fid !== -1 && openParam.id === 0) {
		res = await api.addQuestion({ ...params, fid: openParam.fid })
		loading.value = false
		return res.status === 200
	}

	//如果问题id为0 则为添加 否则 为修改

	if (openParam.id) {
		res = openParam.isBank
			? await api.updateQuestionById(openParam.id, { ...params, fid: openParam.fid })
			: await api.updateQuestionById1(openParam.id, params)
	} else {
		res = await api.addQuestion1(courseInfoStore.value.id, params)
	}
	loading.value = false

	return res.status === 200
}

//获取答案
const getAnswer = () => {
	const { optionList, clozeQuestionList, judgementOptionsAnswer, shortQuestionAnswer } = topicStore
	const answer = {
		单选题: [topicStore.optionList.find((item) => item.isAnswer === true)?.unique].filter(Boolean),
		多选题: [...optionList.filter((item) => item.isAnswer === true).map((item) => item.unique)],
		填空题: [...clozeQuestionList.map((item) => item.text)],
		判断题: [judgementOptionsAnswer],
		简答题: [shortQuestionAnswer]
	}
	return answer[topicType.value] || []
}

//判空
const checkEmpty = (answerList: Array<string | undefined>) => {
	if (!topicStore.title || topicStore.title === '<p><br></p>') return message('标题不能为空')

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
