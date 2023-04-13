export interface ITopicStore {
	/** 题目标题 */
	title: string
	/** 答案解析 */
	analysis: string
	/** 问题难度 */
	difficulty: number
	/** 是否共享 */
	share_flag: boolean
	/** 选择题独有 选项列表 */
	optionList: Array<{
		/** 选项的字母 */
		unique: string
		/** 选项的内容 */
		text: string
		/** 选项是否被选中 */
		isAnswer: boolean
	}>
	/** 判断题选项答案 */
	judgementOptionsAnswer: string
	/** 简答题答案 */
	shortQuestionAnswer: ''
}
