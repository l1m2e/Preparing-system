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

/** 课件移动参数类 */
export interface CoursewareMoveParam {
	/**
	 * 课件id列表
	 * @uniqueItems true
	 */
	ids: number[]
	/**
	 * 要移动到的位置id
	 * @format int64
	 */
	fid: number
	/** 科目名(导入分享课件专用) */
	courseName?: string
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
	schoolName: string
	/** 姓名 */
	studentName: string
	/** 学号 */
	studentId: string
	/** 卡号 */
	cardId: string
	/** 班级名称 */
	className: string
	/** 类型 老师或学生 */
	type: string
	/** 性别 */
	gender: string
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

/** 题库id和对应分数数组 */
export interface QuestionExa {
	/** @format int64 */
	questionBankId: number
	/** @format int32 */
	score: number
}

/** 绑定问题到测验类 */
export interface QuestionExaBind {
	/**
	 * 测验id
	 * @format int64
	 */
	eid: number
	/** 题库id和对应分数数组 */
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
	/** 父id 0为顶层 */
	fid?: string
	/**
	 * 分享类型 0不分享 1科目分享 2全局分享，默认0
	 * @format int32
	 */
	shareType?: number
	/** 是否文件夹，默认否 */
	folderFlag?: boolean
	/** 课程名 */
	courseName: string
	/**
	 * 文件id
	 * @format int64
	 */
	srcId?: number
}

export interface LinkedMap {
	empty?: boolean
	[key: string]: any
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
	/** @format int64 */
	fid: number
	/** 课件名 */
	coursewareName: string
	/** 课程名 */
	courseName: string
	/**
	 * 文件id
	 * @format int64
	 */
	srcId?: number
	/** 是否文件夹 */
	folderFlag?: boolean
	/**
	 * 分享类型 0不分享 1科目分享 2全局分享
	 * @format int32
	 */
	shareType?: number
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

/** 分页对象 */
export interface MyPageSchoolUserVo {
	/** 数据 */
	records: SchoolUserVo[]
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

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean
	/** request path */
	path: string
	/** content type of request body */
	type?: ContentType
	/** query params */
	query?: QueryParamsType
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseType
	/** request body */
	body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
	securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
	secure?: boolean
	format?: ResponseType
}

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
	public instance: AxiosInstance
	private securityData: SecurityDataType | null = null
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
	private secure?: boolean
	private format?: ResponseType

	constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
		this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || 'http://192.168.88.123:8081' })
		this.secure = secure
		this.format = format
		this.securityWorker = securityWorker
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data
	}

	protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
		const method = params1.method || (params2 && params2.method)

		return {
			...this.instance.defaults,
			...params1,
			...(params2 || {}),
			headers: {
				...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {})
			}
		}
	}

	protected stringifyFormItem(formItem: unknown) {
		if (typeof formItem === 'object' && formItem !== null) {
			return JSON.stringify(formItem)
		} else {
			return `${formItem}`
		}
	}

	protected createFormData(input: Record<string, unknown>): FormData {
		return Object.keys(input || {}).reduce((formData, key) => {
			const property = input[key]
			const propertyContent: any[] = property instanceof Array ? property : [property]

			for (const formItem of propertyContent) {
				const isFileType = formItem instanceof Blob || formItem instanceof File
				formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
			}

			return formData
		}, new FormData())
	}

	public request = async <T = any, _E = any>({
		secure,
		path,
		type,
		query,
		format,
		body,
		...params
	}: FullRequestParams): Promise<AxiosResponse<T>> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.secure) && this.securityWorker && (await this.securityWorker(this.securityData))) || {}
		const requestParams = this.mergeRequestParams(params, secureParams)
		const responseFormat = format || this.format || undefined

		if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
			body = this.createFormData(body as Record<string, unknown>)
		}

		if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
			body = JSON.stringify(body)
		}

		return this.instance.request({
			...requestParams,
			headers: {
				...(requestParams.headers || {}),
				...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
			},
			params: query,
			responseType: responseFormat,
			data: body,
			url: path
		})
	}
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://192.168.88.123:8081
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	v80登录模块 = {
		/**
		 * No description
		 *
		 * @tags 80-登录模块
		 * @name ChangePassword
		 * @summary 5-修改密码
		 * @request PUT:/teacherWeb/user/change
		 */
		changePassword: (data: TeacherUserChangeParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/user/change`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 80-登录模块
		 * @name RegisterSchoolUser
		 * @summary 2-注册老师备课端
		 * @request POST:/teacherWeb/user/register
		 */
		registerSchoolUser: (data: SchoolTeaUserParam, params: RequestParams = {}) =>
			this.request<SchoolUserVo, any>({
				path: `/teacherWeb/user/register`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 80-登录模块
		 * @name Login
		 * @summary 3-登录老师端
		 * @request POST:/teacherWeb/user/login
		 */
		login: (data: TeacherUserParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/user/login`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 80-登录模块
		 * @name UserInfo
		 * @summary 4-获取用户信息
		 * @request GET:/teacherWeb/user/userInfo
		 */
		userInfo: (params: RequestParams = {}) =>
			this.request<SchoolUserVo, any>({
				path: `/teacherWeb/user/userInfo`,
				method: 'GET',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 80-登录模块
		 * @name GetAppletErWeiCode
		 * @summary 1-获取授权登录小程序码
		 * @request GET:/teacherWeb/user/getAppletErWeiCode
		 */
		getAppletErWeiCode: (
			query: {
				/** 登录code */
				scene: string
			},
			params: RequestParams = {}
		) =>
			this.request<Message, any>({
				path: `/teacherWeb/user/getAppletErWeiCode`,
				method: 'GET',
				query: query,
				...params
			})
	}
	v82问题题库模块 = {
		/**
		 * No description
		 *
		 * @tags 82-问题题库模块
		 * @name UpdateQuestionBankById
		 * @summary 7-修改问题
		 * @request PUT:/teacherWeb/questionBank/putQuestion/{id}
		 */
		updateQuestionBankById: (id: number, data: QuestionBankParam, params: RequestParams = {}) =>
			this.request<QuestionVo, any>({
				path: `/teacherWeb/questionBank/putQuestion/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 82-问题题库模块
		 * @name UpdatePath
		 * @summary 10-文件夹重命名
		 * @request PUT:/teacherWeb/questionBank/putPath/{id}
		 */
		updatePath: (
			id: number,
			query: {
				/** 重命名 */
				name: string
			},
			params: RequestParams = {}
		) =>
			this.request<Message, any>({
				path: `/teacherWeb/questionBank/putPath/${id}`,
				method: 'PUT',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 82-问题题库模块
		 * @name MoveQuestionBank
		 * @summary 8-移动问题或目录
		 * @request PUT:/teacherWeb/questionBank/moveQuestion
		 */
		moveQuestionBank: (data: QuestionMoveParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/questionBank/moveQuestion`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 82-问题题库模块
		 * @name GetQuestionBankInfoById
		 * @summary 4-根据id查询问题
		 * @request POST:/teacherWeb/questionBank/getQuestionInfo/{id}
		 */
		getQuestionBankInfoById: (id: number, params: RequestParams = {}) =>
			this.request<QuestionVo, any>({
				path: `/teacherWeb/questionBank/getQuestionInfo/${id}`,
				method: 'POST',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 82-问题题库模块
		 * @name AddQuestionBank
		 * @summary 1-添加问题
		 * @request POST:/teacherWeb/questionBank/add
		 */
		addQuestionBank: (data: QuestionBankParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/questionBank/add`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 82-问题题库模块
		 * @name AddKeyword
		 * @summary 5-添加文件夹
		 * @request POST:/teacherWeb/questionBank/addKeyword
		 */
		addKeyword: (data: QuestionBankKeyword, params: RequestParams = {}) =>
			this.request<QuestionVo, any>({
				path: `/teacherWeb/questionBank/addKeyword`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 82-问题题库模块
		 * @name QueryQuestionBank
		 * @summary 3-查询问题列表
		 * @request GET:/teacherWeb/questionBank/query
		 */
		queryQuestionBank: (
			query?: {
				/**
				 * 第几页
				 * @format int32
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int32
				 * @default 5
				 * @example 5
				 */
				size?: number
				/**
				 * 父id
				 * @format int64
				 * @default 0
				 * @example 0
				 */
				fid?: number
				/** 标题 模糊搜索 */
				title?: string
				/**
				 * 题目类型 1选择 2填空 3简答 4判断 默认全部
				 * @format int32
				 */
				type?: number
				/** 是否查询共享题库 0假 1真 默认全部 */
				shareFlag?: boolean
				/**
				 * 创建时间开始时
				 * @format int64
				 */
				startTime?: number
				/**
				 * 创建时间结束时
				 * @format int64
				 */
				endTime?: number
			},
			params: RequestParams = {}
		) =>
			this.request<MyPageQuestionVo, any>({
				path: `/teacherWeb/questionBank/query`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 82-问题题库模块
		 * @name QueryQuestionBankSim
		 * @summary 6-查询问题列表(简略)
		 * @request GET:/teacherWeb/questionBank/querySim
		 */
		queryQuestionBankSim: (
			query?: {
				/**
				 * 第几页
				 * @format int32
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int32
				 * @default 5
				 * @example 5
				 */
				size?: number
				/**
				 * 父id
				 * @format int64
				 * @default 0
				 * @example 0
				 */
				fid?: number
				/** 标题 模糊搜索 */
				title?: string
				/**
				 * 题目类型 1选择 2填空 3简答 4判断 默认全部
				 * @format int32
				 */
				type?: number
				/** 是否查询共享题库 0假 1真 默认全部 */
				shareFlag?: boolean
				/**
				 * 创建时间开始时
				 * @format int64
				 */
				startTime?: number
				/**
				 * 创建时间结束时
				 * @format int64
				 */
				endTime?: number
			},
			params: RequestParams = {}
		) =>
			this.request<MyPageQuestionVo, any>({
				path: `/teacherWeb/questionBank/querySim`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 82-问题题库模块
		 * @name MovePathById
		 * @summary 9-删除文件夹
		 * @request DELETE:/teacherWeb/questionBank/deletePath
		 */
		movePathById: (data: Array, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/questionBank/deletePath`,
				method: 'DELETE',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 82-问题题库模块
		 * @name DelQuestionBank
		 * @summary 2-删除问题
		 * @request DELETE:/teacherWeb/questionBank/del
		 */
		delQuestionBank: (data: Array, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/questionBank/del`,
				method: 'DELETE',
				body: data,
				type: ContentType.Json,
				...params
			})
	}
	v81问题模块 = {
		/**
		 * No description
		 *
		 * @tags 81-问题模块
		 * @name UpdateQuestionById
		 * @summary 10-修改问题
		 * @request PUT:/teacherWeb/question/putQuestion/{id}
		 */
		updateQuestionById: (id: number, data: QuestionBankParam, params: RequestParams = {}) =>
			this.request<QuestionVo, any>({
				path: `/teacherWeb/question/putQuestion/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 81-问题模块
		 * @name ChangeByQlid
		 * @summary 9-给回答记录改分
		 * @request PUT:/teacherWeb/question/changeByQlid
		 */
		changeByQlid: (data: QuestionTaskCheckParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/question/changeByQlid`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 81-问题模块
		 * @name BindQuestionBank
		 * @summary 11-导入题库问题到备课
		 * @request POST:/teacherWeb/question/importQuestion/{pid}
		 */
		bindQuestionBank: (pid: number, data: Array, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/question/importQuestion/${pid}`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 81-问题模块
		 * @name AddQuestion
		 * @summary 1-添加问题
		 * @request POST:/teacherWeb/question/add/{pid}
		 */
		addQuestion: (pid: number, data: QuestionBankParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/question/add/${pid}`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 81-问题模块
		 * @name QueryQuestion
		 * @summary 3-查询问题列表
		 * @request GET:/teacherWeb/question/query
		 */
		queryQuestion: (
			query?: {
				/**
				 * 第几页
				 * @format int32
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int32
				 * @default 5
				 * @example 5
				 */
				size?: number
				/** 标题 模糊搜索 */
				title?: string
				/**
				 * 题目类型 1选择 2填空 3简答 4判断 默认全部
				 * @format int32
				 */
				type?: number
				/** 是否查询题库 0假 1真 默认全部 */
				bankFlag?: boolean
				/** 是否查询共享题库 0假 1真 默认全部 */
				shareFlag?: boolean
				/**
				 * 创建时间开始时
				 * @format int64
				 */
				startTime?: number
				/**
				 * 创建时间结束时
				 * @format int64
				 */
				endTime?: number
			},
			params: RequestParams = {}
		) =>
			this.request<MyPageQuestionVo, any>({
				path: `/teacherWeb/question/query`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 81-问题模块
		 * @name QueryPreLogByPid
		 * @summary 7-根据备课id查询问题任务记录
		 * @request GET:/teacherWeb/question/queryPreLogByPid
		 */
		queryPreLogByPid: (
			query: {
				/**
				 * 备课id
				 * @format int64
				 */
				pid: number
				/**
				 * 题目类型 1选择 2填空 3简答 4判断 5多选 默认全部
				 * @format int32
				 */
				type: number
				/**
				 * 时间类型 1未开始 2进行中 3已结束 默认已结束
				 * @format int32
				 * @default 3
				 */
				timeType?: number
			},
			params: RequestParams = {}
		) =>
			this.request<QuestionTaskSimVo[], any>({
				path: `/teacherWeb/question/queryPreLogByPid`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 81-问题模块
		 * @name QueryByQlid
		 * @summary 8-根据任务id获取答题信息列表
		 * @request GET:/teacherWeb/question/queryByQlid
		 */
		queryByQlid: (
			query: {
				/**
				 * 是否答对 0错误，1正确，2未改 不填则全部
				 * @format int32
				 */
				resultFlag: number
				/**
				 * 任务id
				 * @format int64
				 */
				plid: number
				/** 学号 */
				studentId: string
			},
			params: RequestParams = {}
		) =>
			this.request<QuestionLogVo[], any>({
				path: `/teacherWeb/question/queryByQlid`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 81-问题模块
		 * @name QueryQuestionByPid
		 * @summary 6-根据备课id查询问题
		 * @request GET:/teacherWeb/question/queryByPid
		 */
		queryQuestionByPid: (
			query: {
				/**
				 * 备课id
				 * @format int64
				 */
				pid: number
				/**
				 * 第几页
				 * @format int32
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int32
				 * @default 5
				 * @example 5
				 */
				size?: number
				/** 标题 模糊搜索 */
				title?: string
				/**
				 * 题目类型 1选择 2填空 3简答 4判断 默认全部
				 * @format int32
				 */
				type?: number
				/** 标识 */
				keyword?: string
				/**
				 * 创建时间开始时
				 * @format int64
				 */
				startTime?: number
				/**
				 * 创建时间结束时
				 * @format int64
				 */
				endTime?: number
			},
			params: RequestParams = {}
		) =>
			this.request<MyPageQuestionVo, any>({
				path: `/teacherWeb/question/queryByPid`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 81-问题模块
		 * @name GetQuestionInfoById
		 * @summary 4-根据题目id获取题目详细信息
		 * @request GET:/teacherWeb/question/getQuestionInfo/{id}
		 */
		getQuestionInfoById: (id: number, params: RequestParams = {}) =>
			this.request<QuestionVo, any>({
				path: `/teacherWeb/question/getQuestionInfo/${id}`,
				method: 'GET',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 81-问题模块
		 * @name UnBindQuery
		 * @summary 5-解绑问题
		 * @request DELETE:/teacherWeb/question/unBindQuery
		 */
		unBindQuery: (data: QuestionBind, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/question/unBindQuery`,
				method: 'DELETE',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 81-问题模块
		 * @name DelQuestion
		 * @summary 2-删除问题
		 * @request DELETE:/teacherWeb/question/del/{pid}
		 */
		delQuestion: (pid: number, data: Array, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/question/del/${pid}`,
				method: 'DELETE',
				body: data,
				type: ContentType.Json,
				...params
			})
	}
	v84测验模块 = {
		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name ChangeByElid
		 * @summary 13-给测验记录改分
		 * @request PUT:/teacherWeb/examination/changeByElid
		 */
		changeByElid: (data: ExamTaskCheckParam, params: RequestParams = {}) =>
			this.request<ExaminationLogVo, any>({
				path: `/teacherWeb/examination/changeByElid`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name BindQuestionForExa
		 * @summary 5-导入题库问题到测验
		 * @request POST:/teacherWeb/examination/bindQuestionForExa
		 */
		bindQuestionForExa: (data: QuestionExaBind, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/examination/bindQuestionForExa`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name BindExamination
		 * @summary 7-绑定测验到备课
		 * @request POST:/teacherWeb/examination/bindExamination
		 */
		bindExamination: (data: ExaminationBind, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/examination/bindExamination`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name AddExamination
		 * @summary 1-添加测验
		 * @request POST:/teacherWeb/examination/add
		 */
		addExamination: (data: ExaminationParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/examination/add`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name QueryPreLogByPid1
		 * @summary 10-根据备课id查询测验任务记录
		 * @request GET:/teacherWeb/examination/queryPreLogByPid
		 */
		queryPreLogByPid1: (
			query: {
				/**
				 * 备课id
				 * @format int64
				 */
				pid: number
				/**
				 * 第几页
				 * @format int32
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int32
				 * @default 5
				 * @example 5
				 */
				size?: number
				/**
				 * 时间类型 1未开始 2进行中 3已结束 默认已结束
				 * @format int32
				 * @default 3
				 */
				timeType?: number
			},
			params: RequestParams = {}
		) =>
			this.request<MyPageExaminationTaskSimVo, any>({
				path: `/teacherWeb/examination/queryPreLogByPid`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name QueryExamination
		 * @summary 3-查询测验
		 * @request GET:/teacherWeb/examination/queryExamination
		 */
		queryExamination: (
			query: {
				/**
				 * 第几页
				 * @format int32
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int32
				 * @default 5
				 * @example 5
				 */
				size?: number
				/** 标识 */
				keyword: string
				/**
				 * 创建时间开始时
				 * @format int64
				 */
				startTime: number
				/**
				 * 创建时间结束时
				 * @format int64
				 */
				endTime: number
			},
			params: RequestParams = {}
		) =>
			this.request<MyPageExaminationVo, any>({
				path: `/teacherWeb/examination/queryExamination`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name QueryExaminationByPid
		 * @summary 9-根据备课id查询测验列表
		 * @request GET:/teacherWeb/examination/queryExaminationByPid
		 */
		queryExaminationByPid: (
			query: {
				/**
				 * 备课id
				 * @format int64
				 */
				pid: number
				/**
				 * 第几页
				 * @format int32
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int32
				 * @default 5
				 * @example 5
				 */
				size?: number
				/** 标识 */
				keyword: string
				/**
				 * 创建时间开始时
				 * @format int64
				 */
				startTime: number
				/**
				 * 创建时间结束时
				 * @format int64
				 */
				endTime: number
			},
			params: RequestParams = {}
		) =>
			this.request<MyPageExaminationVo, any>({
				path: `/teacherWeb/examination/queryExaminationByPid`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name QueryExamLogByTask
		 * @summary 11-根据测验任务id查询测验回答记录
		 * @request GET:/teacherWeb/examination/queryExamLogByTask
		 */
		queryExamLogByTask: (
			query: {
				/**
				 * 第几页
				 * @format int32
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int32
				 * @default 5
				 * @example 5
				 */
				size?: number
				/**
				 * 答题情况 0满分，1及格，2不及格，3未改 不填则全部
				 * @format int32
				 */
				type: number
				/**
				 * 任务id
				 * @format int64
				 */
				plid: number
				/** 学号 */
				studentId: string
			},
			params: RequestParams = {}
		) =>
			this.request<MyPageExaminationLogVo, any>({
				path: `/teacherWeb/examination/queryExamLogByTask`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name GetExaminationOne
		 * @summary 4-查询测验详细
		 * @request GET:/teacherWeb/examination/info/{id}
		 */
		getExaminationOne: (id: number, params: RequestParams = {}) =>
			this.request<ExaminationInfoVo, any>({
				path: `/teacherWeb/examination/info/${id}`,
				method: 'GET',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name GetExamLogInfoById
		 * @summary 12-根据测验记录id获取详细信息
		 * @request GET:/teacherWeb/examination/getExamLogInfoById/{id}
		 */
		getExamLogInfoById: (id: number, params: RequestParams = {}) =>
			this.request<ExaminationLogInfoVo, any>({
				path: `/teacherWeb/examination/getExamLogInfoById/${id}`,
				method: 'GET',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name UnBindQuestionForExa
		 * @summary 6-解绑测验问题
		 * @request DELETE:/teacherWeb/examination/unBindQuestionForExa
		 */
		unBindQuestionForExa: (data: QuestionExaBind, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/examination/unBindQuestionForExa`,
				method: 'DELETE',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name UnBindExamination
		 * @summary 8-解绑测验
		 * @request DELETE:/teacherWeb/examination/unBindExamination
		 */
		unBindExamination: (data: ExaminationBind, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/examination/unBindExamination`,
				method: 'DELETE',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 84-测验模块
		 * @name DelExamination
		 * @summary 2-删除测验
		 * @request DELETE:/teacherWeb/examination/del/{id}
		 */
		delExamination: (id: number, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/examination/del/${id}`,
				method: 'DELETE',
				...params
			})
	}
	v83课件模块 = {
		/**
		 * No description
		 *
		 * @tags 83-课件模块
		 * @name MoveCourseware
		 * @summary 9-移动文件
		 * @request PUT:/teacherWeb/courseware/moveCourseware
		 */
		moveCourseware: (data: CoursewareMoveParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/courseware/moveCourseware`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 83-课件模块
		 * @name CopyShareCourseware
		 * @summary 10-将分享课件导入自己的库
		 * @request PUT:/teacherWeb/courseware/copyShareCourseware
		 */
		copyShareCourseware: (data: CoursewareMoveParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/courseware/copyShareCourseware`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 83-课件模块
		 * @name UploadExamination
		 * @summary 11-上传课件
		 * @request POST:/teacherWeb/courseware/upload
		 */
		uploadExamination: (
			query: {
				/** 科目 */
				courseName: string
				/**
				 * 文件夹id
				 * @format int64
				 * @default 0
				 */
				fid?: number
			},
			data: {
				files: File[]
			},
			params: RequestParams = {}
		) =>
			this.request<FileSrcListVo, any>({
				path: `/teacherWeb/courseware/upload`,
				method: 'POST',
				query: query,
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 83-课件模块
		 * @name BindCourseware
		 * @summary 4-绑定课件到备课
		 * @request POST:/teacherWeb/courseware/bindCourseware
		 */
		bindCourseware: (data: CoursewareBind, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/courseware/bindCourseware`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 83-课件模块
		 * @name AddExamination1
		 * @summary 1-添加课件
		 * @request POST:/teacherWeb/courseware/add
		 */
		addExamination1: (data: CoursewareParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/courseware/add`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 83-课件模块
		 * @name QueryCoursewareByPid
		 * @summary 6-根据备课id查询课件
		 * @request GET:/teacherWeb/courseware/queryCoursewareByPid
		 */
		queryCoursewareByPid: (
			query: {
				/**
				 * 备课id
				 * @format int64
				 */
				pid: number
				/**
				 * 第几页
				 * @format int64
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int64
				 * @default 5
				 * @example 5
				 */
				size?: number
				/** 课件名 模糊搜索 */
				coursewareName: string
			},
			params: RequestParams = {}
		) =>
			this.request<MyPageCoursewareVo, any>({
				path: `/teacherWeb/courseware/queryCoursewareByPid`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 83-课件模块
		 * @name QueryCourseware
		 * @summary 3-查询课件
		 * @request GET:/teacherWeb/courseware/list
		 */
		queryCourseware: (
			query: {
				/**
				 * 第几页
				 * @format int64
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int64
				 * @default 5
				 * @example 5
				 */
				size?: number
				/**
				 * 文件夹id
				 * @format int64
				 * @default 0
				 */
				id?: number
				/** 课件名 模糊搜索 */
				coursewareName: string
				/** 科目名 */
				courseName?: string
				/**
				 * 类型 0不共享 1科目共享 2全部共享
				 * @format int32
				 * @default 0
				 */
				shareType?: number
			},
			params: RequestParams = {}
		) =>
			this.request<MyPageCoursewareVo, any>({
				path: `/teacherWeb/courseware/list`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 83-课件模块
		 * @name GetShareCourseName
		 * @summary 7-查询分享的课件科目
		 * @request GET:/teacherWeb/courseware/getShareCourseName
		 */
		getShareCourseName: (params: RequestParams = {}) =>
			this.request<string[], any>({
				path: `/teacherWeb/courseware/getShareCourseName`,
				method: 'GET',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 83-课件模块
		 * @name GetJobNameByCourseName
		 * @summary 8-查询分享课件科目下的分享老师
		 * @request GET:/teacherWeb/courseware/getJobNameByCourseName
		 */
		getJobNameByCourseName: (
			query: {
				/**
				 * @format int64
				 * @default 1
				 */
				current?: number
				/**
				 * @format int64
				 * @default 5
				 */
				size?: number
				courseName: string
			},
			params: RequestParams = {}
		) =>
			this.request<MyPageSchoolUserVo, any>({
				path: `/teacherWeb/courseware/getJobNameByCourseName`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 83-课件模块
		 * @name UnBindCourseware
		 * @summary 5-解绑课件
		 * @request DELETE:/teacherWeb/courseware/unBindCourseware
		 */
		unBindCourseware: (data: CoursewareBind, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/courseware/unBindCourseware`,
				method: 'DELETE',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 83-课件模块
		 * @name DelExamination1
		 * @summary 2-删除课件
		 * @request DELETE:/teacherWeb/courseware/del
		 */
		delExamination1: (data: Array, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/courseware/del`,
				method: 'DELETE',
				body: data,
				type: ContentType.Json,
				...params
			})
	}
	v85备课主题 = {
		/**
		 * No description
		 *
		 * @tags 85-备课主题
		 * @name UpdatePreparing
		 * @summary 5-修改备课
		 * @request POST:/teacherWeb/preparing/update
		 */
		updatePreparing: (data: PreparingUpdateParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/preparing/update`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 85-备课主题
		 * @name AddPreparing
		 * @summary 1-添加一个备课
		 * @request POST:/teacherWeb/preparing/add
		 */
		addPreparing: (data: PreparingParam, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/preparing/add`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 85-备课主题
		 * @name QueryPreparing
		 * @summary 3-查询备课
		 * @request GET:/teacherWeb/preparing/query
		 */
		queryPreparing: (
			query: {
				/**
				 * 第几页
				 * @format int64
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int64
				 * @default 5
				 * @example 5
				 */
				size?: number
				/** 主题名 */
				title: string
				/** 课程名 */
				courseName: string
				/** 课时 */
				courseHour: string
				/** 班级名称 */
				className: string
				/** 教室名 */
				classRoomName: string
				/** 教室MAC */
				classRoomMac: string
			},
			params: RequestParams = {}
		) =>
			this.request<MyPagePreparing, any>({
				path: `/teacherWeb/preparing/query`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 85-备课主题
		 * @name GetPreparingOneByCourse
		 * @summary 7-根据课程信息查询备课
		 * @request GET:/teacherWeb/preparing/infoByCourse
		 */
		getPreparingOneByCourse: (
			query: {
				/** 课程名 */
				courseName: string
				/**
				 * 课时
				 * @format int32
				 */
				courseHour: number
				/** 班级名 */
				className: string
				/** 学年 */
				year: string
				/**
				 * 学期
				 * @format int32
				 */
				semester: number
			},
			params: RequestParams = {}
		) =>
			this.request<PreparingVo, any>({
				path: `/teacherWeb/preparing/infoByCourse`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 85-备课主题
		 * @name GetPreparingOne
		 * @summary 4-查询详细
		 * @request GET:/teacherWeb/preparing/info/{id}
		 */
		getPreparingOne: (id: number, params: RequestParams = {}) =>
			this.request<PreparingVo, any>({
				path: `/teacherWeb/preparing/info/${id}`,
				method: 'GET',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 85-备课主题
		 * @name GetPreparingTitle
		 * @summary 6-查询主题
		 * @request GET:/teacherWeb/preparing/getPreparingTitle
		 */
		getPreparingTitle: (
			query: {
				/**
				 * 第几页
				 * @format int64
				 * @default 1
				 * @example 1
				 */
				current?: number
				/**
				 * 每页几条
				 * @format int64
				 * @default 5
				 * @example 5
				 */
				size?: number
				/** 主题名 */
				title: string
				/** 课程名 */
				courseName: string
			},
			params: RequestParams = {}
		) =>
			this.request<MyPagePreparing, any>({
				path: `/teacherWeb/preparing/getPreparingTitle`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 85-备课主题
		 * @name DelPreparing
		 * @summary 2-删除一个备课
		 * @request DELETE:/teacherWeb/preparing/del/{id}
		 */
		delPreparing: (id: string, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/teacherWeb/preparing/del/${id}`,
				method: 'DELETE',
				...params
			})
	}
	v55文件模块 = {
		/**
		 * No description
		 *
		 * @tags 55-文件模块
		 * @name UpdateImage
		 * @summary 3-上传图片
		 * @request POST:/file/updateImage
		 */
		updateImage: (
			data: {
				/** @format binary */
				'wangeditor-uploaded-image': File
			},
			params: RequestParams = {}
		) =>
			this.request<LinkedMap, any>({
				path: `/file/updateImage`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 55-文件模块
		 * @name UpdateFiles
		 * @summary 6-批量上传文件(最大支持10个文件 只支持附件)
		 * @request POST:/file/updateFiles
		 */
		updateFiles: (
			data: {
				/** 文件批量 */
				files: File[]
			},
			params: RequestParams = {}
		) =>
			this.request<FileSrcListVo, any>({
				path: `/file/updateFiles`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 55-文件模块
		 * @name UpdateFile
		 * @summary 1-上传文件
		 * @request POST:/file/updateFile
		 */
		updateFile: (
			data: {
				/** @format binary */
				file?: File
			},
			params: RequestParams = {}
		) =>
			this.request<FileSrcVo, any>({
				path: `/file/updateFile`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 55-文件模块
		 * @name SaveImage
		 * @summary 7-保存临时图片
		 * @request POST:/file/saveImage
		 */
		saveImage: (data: Array, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/file/saveImage`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 55-文件模块
		 * @name FileChunkDownload
		 * @summary 2-下载文件
		 * @request GET:/file/download/{type}/{user}/{id}
		 */
		fileChunkDownload: (type: string, user: string, id: string, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/file/download/${type}/${user}/${id}`,
				method: 'GET',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 55-文件模块
		 * @name DeleteFile
		 * @summary 5-删除文件
		 * @request DELETE:/file/delete
		 */
		deleteFile: (data: Array, params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/file/delete`,
				method: 'DELETE',
				body: data,
				type: ContentType.Json,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 55-文件模块
		 * @name DeleteFileUrl
		 * @summary 4-删除文件URL
		 * @request DELETE:/file/deleteUrl
		 */
		deleteFileUrl: (data: string[], params: RequestParams = {}) =>
			this.request<Message, any>({
				path: `/file/deleteUrl`,
				method: 'DELETE',
				body: data,
				type: ContentType.Json,
				...params
			})
	}
	v86课程表 = {
		/**
		 * No description
		 *
		 * @tags 86-课程表
		 * @name GetCourseSimplify
		 * @summary 4-获取课程表一周格式化
		 * @request GET:/teacherWeb/course/weekCourseSimplify
		 */
		getCourseSimplify: (
			query: {
				/**
				 * 时间
				 * @example "2022-12-23"
				 */
				time: string
				/** 课程名 */
				courseName: string
				/** 班级名 */
				className: string
			},
			params: RequestParams = {}
		) =>
			this.request<CourseVo, any>({
				path: `/teacherWeb/course/weekCourseSimplify`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 86-课程表
		 * @name TimeCourse
		 * @summary 3-获取课程表时间信息
		 * @request GET:/teacherWeb/course/timeCourse
		 */
		timeCourse: (
			query?: {
				/**
				 * 第几周 不填可获取当前周信息
				 * @default ""
				 */
				weekNum?: string
			},
			params: RequestParams = {}
		) =>
			this.request<CourseTimeVo, any>({
				path: `/teacherWeb/course/timeCourse`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 86-课程表
		 * @name GetCourseSemester
		 * @summary 5-获取课程一学期
		 * @request GET:/teacherWeb/course/semesterCourse
		 */
		getCourseSemester: (
			query: {
				/**
				 * 学年
				 * @default ""
				 */
				year?: string
				/**
				 * 学期
				 * @default ""
				 */
				semester?: string
				/**
				 * 时间戳
				 * @format int64
				 */
				time: number
			},
			params: RequestParams = {}
		) =>
			this.request<CourseSemesterVo, any>({
				path: `/teacherWeb/course/semesterCourse`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 86-课程表
		 * @name QueryWeekCourse
		 * @summary 2-获取课程表一周(筛选)
		 * @request GET:/teacherWeb/course/queryWeekCourse
		 */
		queryWeekCourse: (
			query: {
				/**
				 * 时间
				 * @example "2022-12-23"
				 */
				time: string
				/** 课程名 */
				courseName: string
				/** 班级名 */
				className: string
			},
			params: RequestParams = {}
		) =>
			this.request<CourseVo, any>({
				path: `/teacherWeb/course/queryWeekCourse`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 86-课程表
		 * @name GetCourseByClassAndCourseName
		 * @summary 7-根据班级和课程名获取下节课的信息
		 * @request GET:/teacherWeb/course/getCourse
		 */
		getCourseByClassAndCourseName: (
			query: {
				/**
				 * 学年
				 * @default ""
				 */
				year?: string
				/**
				 * 学期
				 * @default ""
				 */
				semester?: string
				/** 班级名称 */
				className: string
				/** 课程名 */
				courseName: string
				/**
				 * 时间戳
				 * @format int64
				 */
				time: number
			},
			params: RequestParams = {}
		) =>
			this.request<CourseSemesterOne, any>({
				path: `/teacherWeb/course/getCourse`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 86-课程表
		 * @name GetCourseNameBySemester
		 * @summary 8-获取本学期教的科目列表
		 * @request GET:/teacherWeb/course/getCourseNameBySemester
		 */
		getCourseNameBySemester: (
			query?: {
				/**
				 * 学年
				 * @default ""
				 */
				year?: string
				/**
				 * 学期
				 * @format int32
				 */
				semester?: number
			},
			params: RequestParams = {}
		) =>
			this.request<string[], any>({
				path: `/teacherWeb/course/getCourseNameBySemester`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 86-课程表
		 * @name GetClassByCourseName
		 * @summary 6-根据课程名获取班级列表
		 * @request GET:/teacherWeb/course/getClassByCourseName
		 */
		getClassByCourseName: (
			query: {
				/**
				 * 学年
				 * @default ""
				 * @example "2022-2023"
				 */
				year?: string
				/**
				 * 学期
				 * @default ""
				 * @example 2
				 */
				semester?: string
				/**
				 * 时间戳
				 * @format int64
				 */
				time: number
				/** 课程名 */
				courseName: string
			},
			params: RequestParams = {}
		) =>
			this.request<string[], any>({
				path: `/teacherWeb/course/getClassByCourseName`,
				method: 'GET',
				query: query,
				...params
			}),

		/**
		 * No description
		 *
		 * @tags 86-课程表
		 * @name DayCourse
		 * @summary 1-获取课程表一天
		 * @request GET:/teacherWeb/course/dayCourse
		 */
		dayCourse: (
			query: {
				/**
				 * 时间
				 * @example "2022-09-09"
				 */
				time: string
			},
			params: RequestParams = {}
		) =>
			this.request<CourseVo, any>({
				path: `/teacherWeb/course/dayCourse`,
				method: 'GET',
				query: query,
				...params
			})
	}
	v70通用模块 = {
		/**
		 * No description
		 *
		 * @tags 70-通用模块
		 * @name GetAddress
		 * @summary 1-返回使用的地址
		 * @request GET:/common/address
		 */
		getAddress: (params: RequestParams = {}) =>
			this.request<AddressVo, any>({
				path: `/common/address`,
				method: 'GET',
				...params
			})
	}
}
