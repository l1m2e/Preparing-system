export const topicStore = reactive({
	/** 题目标题 */
	title: '',
	/** 答案解析 */
	analysis: '',
	/** 问题难度 */
	difficulty: 0,
	share_flag: false //是否共享
})

type IChoiceStore = {
	/** 选项 */
	optionList: Array<{
		/** 选项的字母 */
		unique: string
		/** 选项的内容 */
		text: string
		/** 选项是否被选中 */
		isAnswer: boolean
	}>
}

// 选择题 store
export const choiceStore = reactive<IChoiceStore>({
	optionList: [
		{ unique: 'A', text: '', isAnswer: false },
		{ unique: 'B', text: '', isAnswer: false },
		{ unique: 'C', text: '', isAnswer: false },
		{ unique: 'D', text: '', isAnswer: false }
	]
})
