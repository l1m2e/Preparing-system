import { axios } from '~/service'
import { AddKeywordParams, IqueryQuestionBankList, MoveQuestionParams, AddQuestionParams } from './types'

// 查询问题列表省略
export const queryQuestionBankList = (data: IqueryQuestionBankList) => axios.get('/teacherWeb/questionBank/querySim', { params: data })
// 添加题库文件夹
export const addFolder = (data: AddKeywordParams) => axios.post('/teacherWeb/questionBank/addKeyword', data)
// 移动文件夹
export const moveFolder = (data: MoveQuestionParams) => axios.put('/teacherWeb/questionBank/moveQuestion', data)
//添加问题
export const addBankIssue = (data: AddQuestionParams) => axios.post('/teacherWeb/questionBank/add', data)
//根据id查询问题
export const getBankQuestionInfoById = (id: number) => axios.post(`/teacherWeb/questionBank/getQuestionInfo/${id}`)
//修改问题
export const editBankQuestion = (id: number, data: AddQuestionParams) => axios.put(`/teacherWeb/questionBank/putQuestion/${id}`, data)
