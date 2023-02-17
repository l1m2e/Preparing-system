import { axios } from '~/service'
import { IqueryQuestionBankList } from './types'

// 查询问题列表省略
export const queryQuestionBankList = (data: IqueryQuestionBankList) => axios.get('/teacherWeb/questionBank/querySim', { params: data })
