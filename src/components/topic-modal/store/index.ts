import type { ITopicStore } from '../types'
import { setReactive } from '~/utils'

export const topicStore = reactive<ITopicStore>({
	title: '', //  题目标题
	analysis: '', // 答案解析
	difficulty: 1, // 难度
	share_flag: false, // 是否共享
	// 选择题选项
	optionList: [
		{ unique: 'A', text: '', isAnswer: false },
		{ unique: 'B', text: '', isAnswer: false },
		{ unique: 'C', text: '', isAnswer: false },
		{ unique: 'D', text: '', isAnswer: false }
	],
	// 判断题答案
	judgementOptionsAnswer: 'A',
	// 填空题
	clozeQuestionList: [{ text: '' }],
	// 简答题
	shortQuestionAnswer: ''
})

// 重置 topicStore
export const resetTopicStore = () =>
	setReactive(topicStore, {
		title: '', //  题目标题
		analysis: '', // 答案解析
		difficulty: 1, // 难度
		share_flag: false, // 是否共享
		// 选择题选项
		optionList: [
			{ unique: 'A', text: '', isAnswer: false },
			{ unique: 'B', text: '', isAnswer: false },
			{ unique: 'C', text: '', isAnswer: false },
			{ unique: 'D', text: '', isAnswer: false }
		],
		// 判断题答案
		judgementOptionsAnswer: 'A',
		// 填空题
		clozeQuestionList: [{ text: '' }],
		// 简答题
		shortQuestionAnswer: ''
	})
