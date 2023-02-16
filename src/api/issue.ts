import { axios } from '~/service'
import { IaddIssue, IqueryIssueList, IqueryIssueListFromId } from './types'

//删除文件
export const addIssue = (data: IaddIssue, id: number) => axios.post(`/teacherWeb/question/add/${id}`, data)
//查询问题列表
export const queryIssueList = (data: IqueryIssueList) => axios.get('/teacherWeb/question/query', { params: data })
//根据备课id查询问题列表
export const queryIssueListFromId = (data: IqueryIssueListFromId) => axios.get('/teacherWeb/question/queryByPid', { params: data })
//根据问题id删除问题
export const deleteIssueById = (idList: Array<number>) => axios.delete('/teacherWeb/question/del', { data: idList })
