/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** 老师端修改账号密码 */
export interface TeacherUserChangeParam {
	/** 工号 */
	jobNum: string
	/** 原密码 */
	oldPassword: string
	/** 新密码 */
	password: string
}

/** 通用消息提示 */
export interface Message {
	/** 消息 */
	message?: string
	/** 错误消息 */
	error?: string
}

/**
 * 选项数组
 * @example [{"unique":"A","text":"选项"}]
 */
export interface Choice {
	unique?: string
	text?: string
}

/** 添加问题参数 */
export interface QuestionBankParam {
	/** 题目 */
	title: string
	/**
	 * 附件id数组
	 * @uniqueItems true
	 */
	srcId?: number[]
	/**
	 * 选项数组
	 * @uniqueItems true
	 * @example [{"unique":"A","text":"选项"}]
	 */
	choices?: Choice[]
	/**
	 * 参考答案列表 填空题按顺序添加数组
	 * @example ["A"]
	 */
	answer?: string[]
	/** 答案解析 */
	analysis?: string
	/**
	 * 题目类型 1选择 2填空 3简答 4判断 5多选 默认1
	 * @format int32
	 */
	type: number
	/** 是否共享 */
	share_flag?: boolean
	/**
	 * 父id -1为不添加题库 其余为添加
	 * @format int64
	 */
	fid?: number
	/**
	 * 难易度 数字越大越难
	 * @format int32
	 */
	difficulty: number
}

/** 问题详细信息 */
export interface QuestionVo {
	/**
	 * 问题id
	 * @format int64
	 */
	id: number
	/** 题目 */
	title: string
	/** 发布者名字 */
	teacherName: string
	/**
	 * 附件id
	 * @uniqueItems true
	 */
	srcId?: number[]
	/**
	 * 选项
	 * @uniqueItems true
	 */
	choices?: Choice[]
	/** 参考答案 */
	answer?: string[]
	/** 答案解析 */
	analysis?: string
	/** 是否允许查询答案 */
	result: boolean
	/**
	 * 题目类型 1选择 2填空 3简答 4判断
	 * @format int32
	 */
	type: number
	/** 类型 标识 */
	keyword?: string
	/** 是否为题库 0假 1真 */
	shareFlag: boolean
	/**
	 * 难易度
	 * @format int32
	 */
	difficulty: number
	/**
	 * 父id
	 * @format int64
	 */
	fid?: number
	/**
	 * 创建时间戳
	 * @format int64
	 */
	createdTimestamp: number
}

/** 问题移动参数类 */
export interface QuestionMoveParam {
	/**
	 * 问题id列表
	 * @uniqueItems true
	 */
	ids: number[]
	/**
	 * 要移动到的位置id
	 * @format int64
	 */
	fid: number
}

/** 批改问题类 */
export interface QuestionTaskCheckParam {
	/**
	 * 需要批改的问题记录id
	 * @format int64
	 */
	qlid: number
	/** 是否正确 */
	resultFlag: boolean
}

/** 批改测验类 */
export interface ExamTaskCheckParam {
	/**
	 * 需要批改的测验记录id
	 * @format int64
	 */
	elid: number
	/** 改分数组 */
	list: ExamTaskQuestionCheckParam[]
}

/** 测验问题改分类 */
export interface ExamTaskQuestionCheckParam {
	/**
	 * id
	 * @format int64
	 */
	id: number
	/**
	 * 分数
	 * @format int32
	 */
	score: number
}

/** 测验回答记录信息 */
export interface ExaminationLogVo {
	/**
	 * id
	 * @format int64
	 */
	id: number
	/** 标题 */
	title: string
	/**
	 * 及格线
	 * @format int32
	 */
	passLine: number
	/** 学生姓名 */
	studentName: string
	/** 学生学号 */
	studentId: string
	/**
	 * 得分
	 * @format int32
	 */
	scores: number
	/** 是否及格 */
	passFlag: boolean
	/** 是否已改 */
	checkFlag: boolean
	/**
	 * 创建时间
	 * @format int64
	 */
	createdTimestamp: number
	/**
	 * 总分
	 * @format int32
	 */
	totalScores: number
}

/** 注册老师端 */
export interface SchoolTeaUserParam {
	/** 姓名 */
	studentName: string
	/** 学号 */
	studentId: string
	/** 密码 */
	password: string
}

/** 绑定的个人信息 */
export interface SchoolUserVo {
	/** 学校名称 */
	schoolName?: string
	/** 姓名 */
	studentName?: string
	/** 学号 */
	studentId?: string
	/** 卡号 */
	cardId?: string
	/** 班级名称 */
	className?: string
	/** 类型 老师或学生 */
	type?: string
	/** 性别 */
	gender?: string
	jobNum?: string
	teachName?: string
}

/** 老师端登录账号密码 */
export interface TeacherUserParam {
	/** 工号 */
	jobNum: string
	/** 密码 */
	password: string
}

/** 题库文件夹类 */
export interface QuestionBankKeyword {
	/** 文件夹名 */
	keyword: string
	/**
	 * 父id
	 * @format int64
	 */
	fid?: number
}

/**
 * 题库问题id列表
 * @uniqueItems true
 */
export type Array = number[]

export interface PreparingUpdateParam {
	/**
	 * 备课id
	 * @format int64
	 */
	id: number
	/** 主题名 */
	title?: string
	/** 是否覆盖主题 */
	titleFlag?: boolean
	/** 教室名称 */
	classDeviceName?: string
	/** 教室mac */
	classRoomMac?: string
	/** 楼层名称 */
	classDevicePosition?: string
}

export interface PreparingParam {
	/** 主题名 */
	title: string
	/** 主题覆盖 默认否 */
	titleFlag?: boolean
	/** 课程名 */
	courseName: string
	/**
	 * 课时
	 * @format int32
	 */
	courseHour: number
	/** 学年 */
	year: string
	/**
	 * 学期
	 * @format int32
	 */
	semester: number
	/**
	 * 上课时间
	 * @format int64
	 */
	startTime: number
	/**
	 * 下课时间
	 * @format int64
	 */
	endTime: number
	/** 班级名称 */
	className: string
	/** 教室名称 */
	classDeviceName: string
	/** 教室mac */
	classRoomMac: string
	/** 楼层名称 */
	classDevicePosition: string
}

/** 问题id和对应分数数组 */
export interface QuestionExa {
	/** @format int64 */
	questionId?: number
	/** @format int32 */
	score?: number
}

/** 绑定问题到测验类 */
export interface QuestionExaBind {
	/**
	 * 测验id
	 * @format int64
	 */
	eid: number
	/**
	 * 问题id和对应分数数组
	 * @uniqueItems true
	 */
	qidList: QuestionExa[]
}

/** 测验绑定类 */
export interface ExaminationBind {
	/**
	 * 备课id
	 * @format int64
	 */
	pid: number
	/**
	 * 测验id数组
	 * @uniqueItems true
	 */
	eidList: number[]
}

/** 添加测验参数 */
export interface ExaminationParam {
	/** 标题 */
	title: string
	/** 标识 */
	keyword: string
	/**
	 * 及格线(分数达到百分之多少算及格) 0~100
	 * @format int32
	 */
	passLine: number
}

/** 绑定课件类 */
export interface CoursewareBind {
	/**
	 * 备课id
	 * @format int64
	 */
	pid: number
	/**
	 * 课件id数组
	 * @uniqueItems true
	 */
	cidList: number[]
}

/** 添加课件模型 */
export interface CoursewareParam {
	/** 课件名 */
	coursewareName: string
	/** 类别 标识 */
	keyword?: string
	/**
	 * 文件id
	 * @format int64
	 */
	srcId: number
}

export interface LinkedMap {
	empty?: boolean
	[key: string]: any
}

/** 文件批量返回类 */
export interface FileSrcListVo {
	/** 上传成功的文件数组 */
	fileSrcVos: FileSrcVo[]
	/** 上传失败的文件数组 */
	errorFiles: FileSrcVo[]
}

/** 文件返回类 */
export interface FileSrcVo {
	/**
	 * 文件id
	 * @format int64
	 */
	id: number
	/** 文件名 */
	name: string
	/** 文件url */
	url: string
}

/** 分页对象 */
export interface MyPageQuestionVo {
	/** 数据 */
	records: QuestionVo[]
	/**
	 * 总数
	 * @format int64
	 */
	total: number
	/**
	 * 每页总长度
	 * @format int64
	 */
	size: number
	/**
	 * 当前页数
	 * @format int64
	 */
	current: number
	/** 排序字段信息 */
	orders?: OrderItem[]
	/** 是否查询总数 */
	searchCount: boolean
	/**
	 * 总页数
	 * @format int64
	 */
	pages: number
}

/** 排序字段信息 */
export interface OrderItem {
	column?: string
	asc?: boolean
}

/** 问题任务列表简略信息类 */
export interface QuestionTaskSimVo {
	/**
	 * 任务id
	 * @format int64
	 */
	id: number
	/**
	 * 答题开始时间
	 * @format int64
	 */
	startTime: number
	/**
	 * 答题结束时间
	 * @format int64
	 */
	endTime: number
	/**
	 * 可抢答人数
	 * @format int32
	 */
	signCount?: number
	/**
	 * 答题总人数
	 * @format int32
	 */
	count: number
	/**
	 * 题目类型
	 * @format int32
	 */
	type: number
	/**
	 * 回答正确的人数
	 * @format int32
	 */
	just: number
	/**
	 * 回答错误的人数
	 * @format int32
	 */
	wrong: number
	/**
	 * 未批改人数
	 * @format int32
	 */
	uncorrected: number
}

/** 问题返回类 */
export interface QuestionLogVo {
	/**
	 * id
	 * @format int64
	 */
	id: number
	/**
	 * 任务id
	 * @format int64
	 */
	plid: number
	/** 课程名 */
	courseName: string
	/** 班级名 */
	className: string
	/**
	 * 课时
	 * @format int32
	 */
	courseHour: number
	/** 学号 */
	studentId: string
	/** 姓名 */
	studentName: string
	/**
	 * 答题时长
	 * @format int64
	 */
	quizTime: number
	/** 回答的答案 */
	answer?: string[]
	/** 回答是否正确 */
	resultFlag: boolean
	/**
	 * 创建时间
	 * @format int64
	 */
	createdTimestamp: number
}

/** 分页对象 */
export interface MyPagePreparing {
	/** 数据 */
	records: Preparing[]
	/**
	 * 总数
	 * @format int64
	 */
	total: number
	/**
	 * 每页总长度
	 * @format int64
	 */
	size: number
	/**
	 * 当前页数
	 * @format int64
	 */
	current: number
	/** 排序字段信息 */
	orders?: OrderItem[]
	/** 是否查询总数 */
	searchCount: boolean
	/**
	 * 总页数
	 * @format int64
	 */
	pages: number
}

/** 数据 */
export interface Preparing {
	/** @format int64 */
	id?: number
	title?: string
	titleFlag?: boolean
	courseName: string
	/** @format int32 */
	courseHour: number
	year: string
	/** @format int32 */
	semester: number
	/** @format int64 */
	startTime: number
	/** @format int64 */
	endTime: number
	className: string
	jobNum: string
	classDeviceName: string
	classRoomMac: string
	teacherName: string
	classDevicePosition?: string
}

/** 课件返回类 */
export type CoursewareVo = {
	/** @format int64 */
	id: number
	/** 课件名 */
	coursewareName: string
	/** 类别 标识 */
	keyword?: string
	/**
	 * 文件id
	 * @format int64
	 */
	srcId: number
	/**
	 * 更新时间戳
	 * @format int64
	 */
	updateTimestamp: number
} | null

/** 测验信息 */
export type ExaminationVo = {
	/**
	 * id
	 * @format int64
	 */
	id: number
	/** 标题 */
	title: string
	/** 标识 */
	keyword?: string
	/**
	 * 创建时间
	 * @format int64
	 */
	createdTimestamp: number
	/**
	 * 总分
	 * @format int32
	 */
	totalScores: number
	/**
	 * 问题列表总数
	 * @format int32
	 */
	totalQuestion: number
} | null

/** 备课详细信息 */
export interface PreparingVo {
	/**
	 * id
	 * @format int64
	 */
	id: number
	/** 主题名 */
	title: string
	/** 课程名 */
	courseName: string
	/**
	 * 课时
	 * @format int32
	 */
	courseHour: number
	/**
	 * 问题信息数组
	 * @uniqueItems true
	 */
	questionVos?: QuestionVo[] | null
	/**
	 * 测验id数组
	 * @uniqueItems true
	 */
	examinationList?: ExaminationVo[] | null
	/**
	 * 课件信息数组
	 * @uniqueItems true
	 */
	coursewareVos?: CoursewareVo[] | null
	/** 班级名称 */
	className: string
	/** 老师工号 */
	jobNum: string
	/** 教室名称 */
	classDeviceName: string
	/** 教室mac */
	classRoomMac: string
	/** 老师名称 */
	teacherName: string
	/**
	 * 修改时间戳
	 * @format int64
	 */
	updateTimestamp: number
	/**
	 * 创建时间戳
	 * @format int64
	 */
	createdTimestamp: number
}

/** 测验任务列表简略信息类 */
export interface ExaminationTaskSimVo {
	/**
	 * 任务id
	 * @format int64
	 */
	id: number
	/**
	 * 测验开始时间
	 * @format int64
	 */
	startTime: number
	/**
	 * 测验结束时间
	 * @format int64
	 */
	endTime: number
	/**
	 * 答题总人数
	 * @format int32
	 */
	count: number
	/**
	 * 满分人数
	 * @format int32
	 */
	fullMarkCount: number
	/**
	 * 及格人数
	 * @format int32
	 */
	passCount: number
	/**
	 * 不及格人数
	 * @format int32
	 */
	failCount: number
	/**
	 * 未出分人数
	 * @format int32
	 */
	unfinishedCount: number
}

/** 分页对象 */
export interface MyPageExaminationTaskSimVo {
	/** 数据 */
	records: ExaminationTaskSimVo[]
	/**
	 * 总数
	 * @format int64
	 */
	total: number
	/**
	 * 每页总长度
	 * @format int64
	 */
	size: number
	/**
	 * 当前页数
	 * @format int64
	 */
	current: number
	/** 排序字段信息 */
	orders?: OrderItem[]
	/** 是否查询总数 */
	searchCount: boolean
	/**
	 * 总页数
	 * @format int64
	 */
	pages: number
}

/** 分页对象 */
export interface MyPageExaminationVo {
	/** 数据 */
	records: ExaminationVo[]
	/**
	 * 总数
	 * @format int64
	 */
	total: number
	/**
	 * 每页总长度
	 * @format int64
	 */
	size: number
	/**
	 * 当前页数
	 * @format int64
	 */
	current: number
	/** 排序字段信息 */
	orders?: OrderItem[]
	/** 是否查询总数 */
	searchCount: boolean
	/**
	 * 总页数
	 * @format int64
	 */
	pages: number
}

/** 分页对象 */
export interface MyPageExaminationLogVo {
	/** 数据 */
	records: ExaminationLogVo[]
	/**
	 * 总数
	 * @format int64
	 */
	total: number
	/**
	 * 每页总长度
	 * @format int64
	 */
	size: number
	/**
	 * 当前页数
	 * @format int64
	 */
	current: number
	/** 排序字段信息 */
	orders?: OrderItem[]
	/** 是否查询总数 */
	searchCount: boolean
	/**
	 * 总页数
	 * @format int64
	 */
	pages: number
}

/** 测验详细信息2 */
export interface ExaminationInfoVo {
	/**
	 * id
	 * @format int64
	 */
	id: number
	/** 标题 */
	title: string
	/** 标识 */
	keyword?: string
	/** 问题列表id */
	questions: QuestionExaVo[]
	/**
	 * 创建时间
	 * @format int64
	 */
	createdTimestamp: number
	/**
	 * 总分
	 * @format int32
	 */
	totalScores: number
	/**
	 * 问题列表总数
	 * @format int32
	 */
	totalQuestion: number
}

/** 问题列表id */
export interface QuestionExaVo {
	/**
	 * 问题id
	 * @format int64
	 */
	id: number
	/** 题目 */
	title: string
	/**
	 * 附件id
	 * @uniqueItems true
	 */
	srcId?: number[]
	/**
	 * 选项
	 * @uniqueItems true
	 */
	choices?: Choice[]
	/** 答案 */
	answer: string[]
	/**
	 * 题目类型 0选择 1填空 2简答 3判断
	 * @format int32
	 */
	type: number
	/**
	 * 分数
	 * @format int32
	 */
	score: number
}

/** 题目回答详细信息 */
export interface ExaminationLogDetailVo {
	/**
	 * id
	 * @format int64
	 */
	id: number
	/** 题目 */
	title: string
	/**
	 * 选项数组
	 * @uniqueItems true
	 */
	choices?: Choice[]
	/**
	 * 题目类型
	 * @format int32
	 */
	type: number
	/**
	 * 得分
	 * @format int32
	 */
	score: number
	/**
	 * 题分
	 * @format int32
	 */
	questionScore: number
	/** 答案 */
	answer?: string[]
}

export interface ExaminationLogInfoVo {
	/**
	 * id
	 * @format int64
	 */
	id: number
	/** 测验标题 */
	title: string
	/** 学生名字 */
	studentName: string
	/** 学生学号 */
	studentId: string
	/** 题目回答详细信息 */
	list: ExaminationLogDetailVo[]
	/**
	 * 交卷时间
	 * @format int64
	 */
	createdTimestamp: number
}

/** 分页对象 */
export interface MyPageCoursewareVo {
	/** 数据 */
	records: CoursewareVo[]
	/**
	 * 总数
	 * @format int64
	 */
	total: number
	/**
	 * 每页总长度
	 * @format int64
	 */
	size: number
	/**
	 * 当前页数
	 * @format int64
	 */
	current: number
	/** 排序字段信息 */
	orders?: OrderItem[]
	/** 是否查询总数 */
	searchCount: boolean
	/**
	 * 总页数
	 * @format int64
	 */
	pages: number
}

/** 单个课程表信息 */
export interface CourseOne {
	/** 课程名 */
	courseName: string
	/** 班级名称 */
	className: string
	/** 楼层名 */
	classDevicePosition: string
	/** 教室名称 */
	classDeviceName: string
	/** 课程索引 */
	courseIndex: string
	/** 上课时间 */
	startTime: object
	/** 下课时间 */
	endTime: object
	/** 老师名字 */
	teacherName: string
	/**
	 * 课程最大课时
	 * @format int32
	 */
	maxCourseHour: number
	/**
	 * 课程当前课时
	 * @format int32
	 */
	courseHour: number
	/** 是否备课 */
	preparingFlag?: boolean
}

/** 课程表信息格式化 */
export interface CourseSimVo {
	/**
	 * 第几节课 从0开始
	 * @format int64
	 */
	id: number
	/** 上课时间 */
	startTime: string
	/** 下课时间 */
	endTime: string
	/** 周一到周日的课程名 */
	courseName?: string[]
	/** 周一到周日的课程数据 */
	courseInfo?: CourseOne[]
}

/** 课程时间表信息 */
export interface CourseVo {
	/** 第几周 */
	weekNum: string
	/** 一天几节课 */
	courseNum: string
	/** 学年 */
	year: string
	/**
	 * 学期
	 * @format int32
	 */
	semester: number
	/** 上课时间 */
	time?: JSONObject[]
	/** 课程表数组 */
	weekCourse?: CourseOne[][]
	/** 课程表格式化数组 */
	weekCourseSim?: CourseSimVo[]
}

/** 上课时间 */
export interface JSONObject {
	empty?: boolean
	[key: string]: any
}

/** 课程时间表 */
export interface CourseTimeVo {
	/**
	 * 最大周
	 * @format int32
	 */
	maxWeek: number
	/** 开学时间 */
	schoolStartTime: string
	/** 周开始时间 */
	startDate: string
	/** 周结束时间 */
	endDate: string
	/** @format int32 */
	weekNum: number
}

/** 课程表一学期单个 */
export type CourseSemesterOne = {
	/** @format int64 */
	id: number
	/** 课程名 */
	courseName: string
	/**
	 * 总课时
	 * @format int32
	 */
	courseHourAll: number
	/**
	 * 当前课时
	 * @format int32
	 */
	courseHour: number
	/** 班级名称 */
	className: string
	/**
	 * 班级人数
	 * @format int32
	 */
	classCount: number
	/** 下节课教学楼位置 */
	classDevicePosition: string
	/** 下节课教室位置 */
	classDeviceName: string
	/**
	 * 下节课上课时间
	 * @format int64
	 */
	startTime: number
	/**
	 * 下节课下课时间
	 * @format int64
	 */
	endTime: number
	/** 教室MAC */
	classRoomMac: string
	/** 下节课是否已备 */
	preparingFlag?: boolean
	/**
	 * 下节课备课的时间
	 * @format int64
	 */
	prepareTime?: number
} | null

/** 课程表一学期返回类 */
export interface CourseSemesterVo {
	/** 学年 */
	year: string
	/** 学期 */
	semester: string
	/** 课程表列表数据 */
	list?: CourseSemesterOne[] | null
}

/** 接口地址数据 */
export interface AddressVo {
	/** websocket地址 */
	websocketUrl: string
}

/** 问题绑定类 */
export interface QuestionBind {
	/**
	 * 备课id
	 * @format int64
	 */
	pid: number
	/**
	 * 问题id数组
	 * @uniqueItems true
	 */
	qidList: number[]
}
