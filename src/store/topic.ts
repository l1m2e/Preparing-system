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
	/** 选项数量 */
	optionsCount: number
}

// 选择题 store
export const choiceStore = reactive<IChoiceStore>({
	optionList: [
		{ unique: 'A', text: '', isAnswer: false },
		{ unique: 'B', text: '', isAnswer: false },
		{ unique: 'C', text: '', isAnswer: false },
		{ unique: 'D', text: '', isAnswer: false },
		{ unique: 'E', text: '', isAnswer: false },
		{ unique: 'F', text: '', isAnswer: false },
		{ unique: 'G', text: '', isAnswer: false },
		{ unique: 'H', text: '', isAnswer: false },
		{ unique: 'I', text: '', isAnswer: false },
		{ unique: 'J', text: '', isAnswer: false },
		{ unique: 'K', text: '', isAnswer: false },
		{ unique: 'L', text: '', isAnswer: false },
		{ unique: 'N', text: '', isAnswer: false },
		{ unique: 'M', text: '', isAnswer: false },
		{ unique: 'O', text: '', isAnswer: false },
		{ unique: 'P', text: '', isAnswer: false },
		{ unique: 'Q', text: '', isAnswer: false },
		{ unique: 'R', text: '', isAnswer: false },
		{ unique: 'S', text: '', isAnswer: false },
		{ unique: 'T', text: '', isAnswer: false },
		{ unique: 'U', text: '', isAnswer: false },
		{ unique: 'V', text: '', isAnswer: false },
		{ unique: 'W', text: '', isAnswer: false },
		{ unique: 'X', text: '', isAnswer: false },
		{ unique: 'Y', text: '', isAnswer: false },
		{ unique: 'Z', text: '', isAnswer: false }
	],
	optionsCount: 4
})
export const optionsList = computed(() => choiceStore.optionList.slice(0, choiceStore.optionsCount))
