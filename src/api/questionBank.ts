import { axios } from '~/service'
import { AddKeywordParams, IqueryQuestionBankList, MoveQuestionParams } from './types'

// 查询问题列表省略
export const queryQuestionBankList = (data: IqueryQuestionBankList) => axios.get('/teacherWeb/questionBank/querySim', { params: data })
// 添加题库文件夹
export const addFolder = (data: AddKeywordParams) => axios.post('/teacherWeb/questionBank/addKeyword', data)
//export cosnt
export const moveFolder = (data: MoveQuestionParams) => axios.put('/teacherWeb/questionBank/moveQuestion', data)
