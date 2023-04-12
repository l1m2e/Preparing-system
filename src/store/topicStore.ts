import { setReactive } from '~/utils'

// export const topicStore = {}

/** 编辑题目信息 */
export const topicStore = reactive({
	/** 题目id */
	id: 0,
	/** 题目标题 */
	title: '',
	/** 教师姓名 */
	teacherName: '',
	/** 附件id */
	srcId: [],
	choices: [
		/** 选项 */
		{
			/** 选项 ABCD 之类的内容 */
			unique: '',
			/** 选项的内容 */
			text: ''
		}
	],
	/** 标准答案数组 */
	answer: [],
	/** 答案解析 */
	analysis: '',
	/** 是否允许查询答案 */
	result: true,
	/** 题目类型 0-单选题，1-多选题，2-判断题，3-填空题 */
	type: 0,
	/** 类型标识 */
	keyword: '',
	/** 是否为共享题库 */
	shareFlag: true,
	/** 父id */
	fid: 0,
	/** 创建时间戳 */
	createdTimestamp: 0
})

/** 获取题目信息 */
export const getTopic = async (id: number) => {
	const res = await api.getTopicInfoById(id)
	if (res.status === 200) {
		setReactive(topicStore, res.data)
		console.log(topicStore)
	} else {
		Message.error('获取题目信息失败')
	}
}

// 重置TopicStore状态
export const resetTopicStore = () => {
	console.log('resetTopicStore')
	setReactive(topicStore, {
		id: 0,
		title: '',
		teacherName: '',
		srcId: [],
		choices: [
			{
				unique: '',
				text: ''
			}
		],
		answer: [],
		analysis: '',
		result: true,
		type: 0,
		keyword: '',
		shareFlag: true,
		fid: 0,
		createdTimestamp: 0
	})
}
