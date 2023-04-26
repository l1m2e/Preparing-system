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

import {
	Array,
	CourseSemesterOne,
	CourseSemesterVo,
	CourseTimeVo,
	CourseVo,
	CoursewareBind,
	CoursewareParam,
	ExaminationBind,
	ExaminationInfoVo,
	ExaminationLogInfoVo,
	ExaminationLogVo,
	ExaminationParam,
	ExamTaskCheckParam,
	Message,
	MyPageCoursewareVo,
	MyPageExaminationLogVo,
	MyPageExaminationTaskSimVo,
	MyPageExaminationVo,
	MyPagePreparing,
	MyPageQuestionVo,
	PreparingParam,
	PreparingUpdateParam,
	PreparingVo,
	QuestionBankKeyword,
	QuestionBankParam,
	QuestionBind,
	QuestionExaBind,
	QuestionLogVo,
	QuestionMoveParam,
	QuestionTaskCheckParam,
	QuestionTaskSimVo,
	QuestionVo,
	SchoolTeaUserParam,
	SchoolUserVo,
	TeacherUserChangeParam,
	TeacherUserParam
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class TeacherWeb<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * No description
	 *
	 * @tags 80-登录模块
	 * @name ChangePassword
	 * @summary 5-修改密码
	 * @request PUT:/teacherWeb/user/change
	 */
	changePassword = (data: TeacherUserChangeParam, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/user/change`,
			method: 'PUT',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 82-问题题库模块
	 * @name UpdateQuestionById
	 * @summary 7-修改问题
	 * @request PUT:/teacherWeb/questionBank/putQuestion/{id}
	 */
	updateQuestionById = (id: number, data: QuestionBankParam, params: RequestParams = {}) =>
		this.request<QuestionVo, any>({
			path: `/teacherWeb/questionBank/putQuestion/${id}`,
			method: 'PUT',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 82-问题题库模块
	 * @name UpdatePath
	 * @summary 10-文件夹重命名
	 * @request PUT:/teacherWeb/questionBank/putPath/{id}
	 */
	updatePath = (
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
		})
	/**
	 * No description
	 *
	 * @tags 82-问题题库模块
	 * @name MoveQuestion
	 * @summary 8-移动问题或目录
	 * @request PUT:/teacherWeb/questionBank/moveQuestion
	 */
	moveQuestion = (data: QuestionMoveParam, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/questionBank/moveQuestion`,
			method: 'PUT',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 81-问题模块
	 * @name UpdateQuestionById1
	 * @summary 10-修改问题
	 * @request PUT:/teacherWeb/question/putQuestion/{id}
	 */
	updateQuestionById1 = (id: number, data: QuestionBankParam, params: RequestParams = {}) =>
		this.request<QuestionVo, any>({
			path: `/teacherWeb/question/putQuestion/${id}`,
			method: 'PUT',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 81-问题模块
	 * @name ChangeByQlid
	 * @summary 9-给回答记录改分
	 * @request PUT:/teacherWeb/question/changeByQlid
	 */
	changeByQlid = (data: QuestionTaskCheckParam, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/question/changeByQlid`,
			method: 'PUT',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name ChangeByElid
	 * @summary 13-给测验记录改分
	 * @request PUT:/teacherWeb/examination/changeByElid
	 */
	changeByElid = (data: ExamTaskCheckParam, params: RequestParams = {}) =>
		this.request<ExaminationLogVo, any>({
			path: `/teacherWeb/examination/changeByElid`,
			method: 'PUT',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 80-登录模块
	 * @name RegisterSchoolUser
	 * @summary 2-注册老师备课端
	 * @request POST:/teacherWeb/user/register
	 */
	registerSchoolUser = (data: SchoolTeaUserParam, params: RequestParams = {}) =>
		this.request<SchoolUserVo, any>({
			path: `/teacherWeb/user/register`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 80-登录模块
	 * @name Login
	 * @summary 3-登录老师端
	 * @request POST:/teacherWeb/user/login
	 */
	login = (data: TeacherUserParam, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/user/login`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 82-问题题库模块
	 * @name GetQuestionInfoById
	 * @summary 4-根据id查询问题
	 * @request POST:/teacherWeb/questionBank/getQuestionInfo/{id}
	 */
	getQuestionInfoById = (id: number, params: RequestParams = {}) =>
		this.request<QuestionVo, any>({
			path: `/teacherWeb/questionBank/getQuestionInfo/${id}`,
			method: 'POST',
			...params
		})
	/**
	 * No description
	 *
	 * @tags 82-问题题库模块
	 * @name AddQuestion
	 * @summary 1-添加问题
	 * @request POST:/teacherWeb/questionBank/add
	 */
	addQuestion = (data: QuestionBankParam, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/questionBank/add`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 82-问题题库模块
	 * @name AddKeyword
	 * @summary 5-添加文件夹
	 * @request POST:/teacherWeb/questionBank/addKeyword
	 */
	addKeyword = (data: QuestionBankKeyword, params: RequestParams = {}) =>
		this.request<QuestionVo, any>({
			path: `/teacherWeb/questionBank/addKeyword`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 81-问题模块
	 * @name BindQuestionBank
	 * @summary 11-导入题库问题到备课
	 * @request POST:/teacherWeb/question/importQuestion/{pid}
	 */
	bindQuestionBank = (pid: number, data: Array, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/question/importQuestion/${pid}`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 81-问题模块
	 * @name AddQuestion1
	 * @summary 1-添加问题
	 * @request POST:/teacherWeb/question/add/{pid}
	 */
	addQuestion1 = (pid: number, data: QuestionBankParam, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/question/add/${pid}`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 85-备课主题
	 * @name UpdatePreparing
	 * @summary 5-修改备课
	 * @request POST:/teacherWeb/preparing/update
	 */
	updatePreparing = (data: PreparingUpdateParam, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/preparing/update`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 85-备课主题
	 * @name AddPreparing
	 * @summary 1-添加一个备课
	 * @request POST:/teacherWeb/preparing/add
	 */
	addPreparing = (data: PreparingParam, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/preparing/add`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name BindQuestionForExa
	 * @summary 5-绑定问题到测验
	 * @request POST:/teacherWeb/examination/bindQuestionForExa
	 */
	bindQuestionForExa = (data: QuestionExaBind, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/examination/bindQuestionForExa`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name BindExamination
	 * @summary 7-绑定测验到备课
	 * @request POST:/teacherWeb/examination/bindExamination
	 */
	bindExamination = (data: ExaminationBind, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/examination/bindExamination`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name AddExamination
	 * @summary 1-添加测验
	 * @request POST:/teacherWeb/examination/add
	 */
	addExamination = (data: ExaminationParam, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/examination/add`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 83-课件模块
	 * @name BindCourseware
	 * @summary 4-绑定课件到备课
	 * @request POST:/teacherWeb/courseware/bindCourseware
	 */
	bindCourseware = (data: CoursewareBind, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/courseware/bindCourseware`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 83-课件模块
	 * @name AddExamination1
	 * @summary 1-添加课件
	 * @request POST:/teacherWeb/courseware/add
	 */
	addExamination1 = (data: CoursewareParam, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/courseware/add`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 80-登录模块
	 * @name UserInfo
	 * @summary 4-获取用户信息
	 * @request GET:/teacherWeb/user/userInfo
	 */
	userInfo = (params: RequestParams = {}) =>
		this.request<SchoolUserVo, any>({
			path: `/teacherWeb/user/userInfo`,
			method: 'GET',
			...params
		})
	/**
	 * No description
	 *
	 * @tags 80-登录模块
	 * @name GetAppletErWeiCode
	 * @summary 1-获取授权登录小程序码
	 * @request GET:/teacherWeb/user/getAppletErWeiCode
	 */
	getAppletErWeiCode = (
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
	/**
	 * No description
	 *
	 * @tags 82-问题题库模块
	 * @name QueryQuestion
	 * @summary 3-查询问题列表
	 * @request GET:/teacherWeb/questionBank/query
	 */
	queryQuestion = (
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
		})
	/**
	 * No description
	 *
	 * @tags 82-问题题库模块
	 * @name QueryQuestionSim
	 * @summary 6-查询问题列表(简略)
	 * @request GET:/teacherWeb/questionBank/querySim
	 */
	queryQuestionSim = (
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
		})
	/**
	 * No description
	 *
	 * @tags 81-问题模块
	 * @name QueryQuestion1
	 * @summary 3-查询问题列表
	 * @request GET:/teacherWeb/question/query
	 */
	queryQuestion1 = (
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
		})
	/**
	 * No description
	 *
	 * @tags 81-问题模块
	 * @name QueryPreLogByPid
	 * @summary 7-根据备课id查询问题任务记录
	 * @request GET:/teacherWeb/question/queryPreLogByPid
	 */
	queryPreLogByPid = (
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
		})
	/**
	 * No description
	 *
	 * @tags 81-问题模块
	 * @name QueryByQlid
	 * @summary 8-根据任务id获取答题信息列表
	 * @request GET:/teacherWeb/question/queryByQlid
	 */
	queryByQlid = (
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
		})
	/**
	 * No description
	 *
	 * @tags 81-问题模块
	 * @name QueryQuestionByPid
	 * @summary 6-根据备课id查询问题
	 * @request GET:/teacherWeb/question/queryByPid
	 */
	queryQuestionByPid = (
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
		})
	/**
	 * No description
	 *
	 * @tags 81-问题模块
	 * @name GetQuestionInfoById1
	 * @summary 4-根据题目id获取题目详细信息
	 * @request GET:/teacherWeb/question/getQuestionInfo/{id}
	 */
	getQuestionInfoById1 = (id: number, params: RequestParams = {}) =>
		this.request<QuestionVo, any>({
			path: `/teacherWeb/question/getQuestionInfo/${id}`,
			method: 'GET',
			...params
		})
	/**
	 * No description
	 *
	 * @tags 85-备课主题
	 * @name QueryPreparing
	 * @summary 3-查询备课
	 * @request GET:/teacherWeb/preparing/query
	 */
	queryPreparing = (
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
		})
	/**
	 * No description
	 *
	 * @tags 85-备课主题
	 * @name GetPreparingOneByCourse
	 * @summary 7-根据课程信息查询备课
	 * @request GET:/teacherWeb/preparing/infoByCourse
	 */
	getPreparingOneByCourse = (
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
		})
	/**
	 * No description
	 *
	 * @tags 85-备课主题
	 * @name GetPreparingOne
	 * @summary 4-查询详细
	 * @request GET:/teacherWeb/preparing/info/{id}
	 */
	getPreparingOne = (id: number, params: RequestParams = {}) =>
		this.request<PreparingVo, any>({
			path: `/teacherWeb/preparing/info/${id}`,
			method: 'GET',
			...params
		})
	/**
	 * No description
	 *
	 * @tags 85-备课主题
	 * @name GetPreparingTitle
	 * @summary 6-查询主题
	 * @request GET:/teacherWeb/preparing/getPreparingTitle
	 */
	getPreparingTitle = (
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
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name QueryPreLogByPid1
	 * @summary 10-根据备课id查询测验任务记录
	 * @request GET:/teacherWeb/examination/queryPreLogByPid
	 */
	queryPreLogByPid1 = (
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
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name QueryExamination
	 * @summary 3-查询测验
	 * @request GET:/teacherWeb/examination/queryExamination
	 */
	queryExamination = (
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
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name QueryExaminationByPid
	 * @summary 9-根据备课id查询测验列表
	 * @request GET:/teacherWeb/examination/queryExaminationByPid
	 */
	queryExaminationByPid = (
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
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name QueryExamLogByTask
	 * @summary 11-根据测验任务id查询测验回答记录
	 * @request GET:/teacherWeb/examination/queryExamLogByTask
	 */
	queryExamLogByTask = (
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
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name GetExaminationOne
	 * @summary 4-查询测验详细
	 * @request GET:/teacherWeb/examination/info/{id}
	 */
	getExaminationOne = (id: number, params: RequestParams = {}) =>
		this.request<ExaminationInfoVo, any>({
			path: `/teacherWeb/examination/info/${id}`,
			method: 'GET',
			...params
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name GetExamLogInfoById
	 * @summary 12-根据测验记录id获取详细信息
	 * @request GET:/teacherWeb/examination/getExamLogInfoById/{id}
	 */
	getExamLogInfoById = (id: number, params: RequestParams = {}) =>
		this.request<ExaminationLogInfoVo, any>({
			path: `/teacherWeb/examination/getExamLogInfoById/${id}`,
			method: 'GET',
			...params
		})
	/**
	 * No description
	 *
	 * @tags 83-课件模块
	 * @name QueryCoursewareByPid
	 * @summary 6-根据备课id查询课件
	 * @request GET:/teacherWeb/courseware/queryCoursewareByPid
	 */
	queryCoursewareByPid = (
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
			/** 类别标识 */
			keyword: string
		},
		params: RequestParams = {}
	) =>
		this.request<MyPageCoursewareVo, any>({
			path: `/teacherWeb/courseware/queryCoursewareByPid`,
			method: 'GET',
			query: query,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 83-课件模块
	 * @name QueryCourseware
	 * @summary 3-查询课件
	 * @request GET:/teacherWeb/courseware/list
	 */
	queryCourseware = (
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
			/** 课件名 模糊搜索 */
			coursewareName: string
			/** 类别标识 */
			keyword: string
		},
		params: RequestParams = {}
	) =>
		this.request<MyPageCoursewareVo, any>({
			path: `/teacherWeb/courseware/list`,
			method: 'GET',
			query: query,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 86-课程表
	 * @name GetCourseSimplify
	 * @summary 4-获取课程表一周格式化
	 * @request GET:/teacherWeb/course/weekCourseSimplify
	 */
	getCourseSimplify = (
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
		})
	/**
	 * No description
	 *
	 * @tags 86-课程表
	 * @name TimeCourse
	 * @summary 3-获取课程表时间信息
	 * @request GET:/teacherWeb/course/timeCourse
	 */
	timeCourse = (
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
		})
	/**
	 * No description
	 *
	 * @tags 86-课程表
	 * @name GetCourseSemester
	 * @summary 5-获取课程一学期
	 * @request GET:/teacherWeb/course/semesterCourse
	 */
	getCourseSemester = (
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
		})
	/**
	 * No description
	 *
	 * @tags 86-课程表
	 * @name QueryWeekCourse
	 * @summary 2-获取课程表一周(筛选)
	 * @request GET:/teacherWeb/course/queryWeekCourse
	 */
	queryWeekCourse = (
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
		})
	/**
	 * No description
	 *
	 * @tags 86-课程表
	 * @name GetCourseByClassAndCourseName
	 * @summary 7-根据班级和课程名获取下节课的信息
	 * @request GET:/teacherWeb/course/getCourse
	 */
	getCourseByClassAndCourseName = (
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
		})
	/**
	 * No description
	 *
	 * @tags 86-课程表
	 * @name GetClassByCourseName
	 * @summary 6-根据课程名获取班级列表
	 * @request GET:/teacherWeb/course/getClassByCourseName
	 */
	getClassByCourseName = (
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
		})
	/**
	 * No description
	 *
	 * @tags 86-课程表
	 * @name DayCourse
	 * @summary 1-获取课程表一天
	 * @request GET:/teacherWeb/course/dayCourse
	 */
	dayCourse = (
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
	/**
	 * No description
	 *
	 * @tags 82-问题题库模块
	 * @name MovePathById
	 * @summary 9-删除文件夹
	 * @request DELETE:/teacherWeb/questionBank/deletePath
	 */
	movePathById = (data: Array, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/questionBank/deletePath`,
			method: 'DELETE',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 82-问题题库模块
	 * @name DelQuestion
	 * @summary 2-删除问题
	 * @request DELETE:/teacherWeb/questionBank/del
	 */
	delQuestion = (data: Array, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/questionBank/del`,
			method: 'DELETE',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 81-问题模块
	 * @name UnBindQuery
	 * @summary 5-解绑问题
	 * @request DELETE:/teacherWeb/question/unBindQuery
	 */
	unBindQuery = (data: QuestionBind, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/question/unBindQuery`,
			method: 'DELETE',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 81-问题模块
	 * @name DelQuestion1
	 * @summary 2-删除问题
	 * @request DELETE:/teacherWeb/question/del/{pid}
	 */
	delQuestion1 = (pid: number, data: Array, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/question/del/${pid}`,
			method: 'DELETE',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 85-备课主题
	 * @name DelPreparing
	 * @summary 2-删除一个备课
	 * @request DELETE:/teacherWeb/preparing/del/{id}
	 */
	delPreparing = (id: string, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/preparing/del/${id}`,
			method: 'DELETE',
			...params
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name UnBindQuestionForExa
	 * @summary 6-解绑测验问题
	 * @request DELETE:/teacherWeb/examination/unBindQuestionForExa
	 */
	unBindQuestionForExa = (data: QuestionExaBind, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/examination/unBindQuestionForExa`,
			method: 'DELETE',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name UnBindExamination
	 * @summary 8-解绑测验
	 * @request DELETE:/teacherWeb/examination/unBindExamination
	 */
	unBindExamination = (data: ExaminationBind, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/examination/unBindExamination`,
			method: 'DELETE',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 84-测验模块
	 * @name DelExamination
	 * @summary 2-删除测验
	 * @request DELETE:/teacherWeb/examination/del/{id}
	 */
	delExamination = (id: number, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/examination/del/${id}`,
			method: 'DELETE',
			...params
		})
	/**
	 * No description
	 *
	 * @tags 83-课件模块
	 * @name UnBindCourseware
	 * @summary 5-解绑课件
	 * @request DELETE:/teacherWeb/courseware/unBindCourseware
	 */
	unBindCourseware = (data: CoursewareBind, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/courseware/unBindCourseware`,
			method: 'DELETE',
			body: data,
			type: ContentType.Json,
			...params
		})
	/**
	 * No description
	 *
	 * @tags 83-课件模块
	 * @name DelExamination1
	 * @summary 2-删除课件
	 * @request DELETE:/teacherWeb/courseware/del
	 */
	delExamination1 = (data: Array, params: RequestParams = {}) =>
		this.request<Message, any>({
			path: `/teacherWeb/courseware/del`,
			method: 'DELETE',
			body: data,
			type: ContentType.Json,
			...params
		})
}
