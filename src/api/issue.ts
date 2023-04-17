import { axios } from '~/service'
import { IaddIssue, IqueryIssueList, IqueryIssueListFromId } from './types'

/** 添加问题 */
export const addIssue = (id: number, data: IaddIssue) => axios.post(`/teacherWeb/question/add/${id}`, data)
/** 查询问题列表 */
export const queryIssueList = (data: IqueryIssueList) => axios.get('/teacherWeb/question/query', { params: data })
/** 根据备课id查询问题列表 */
export const queryIssueListFromId = (data: IqueryIssueListFromId) => axios.get('/teacherWeb/question/queryByPid', { params: data })
/** 根据问题id删除问题 */
export const deleteIssueById = (idList: Array<number>, pid: string) => axios.delete(`/teacherWeb/question/del/${pid}`, { data: idList })
/** 根据问题id获取问题详细信息 */
export const getTopicInfoById = (id: number | string) => axios.get(`/teacherWeb/question/getQuestionInfo/${id}`)
/** 修改问题 */
export const editIssue = (id: number, data: IaddIssue) => axios.put(`/teacherWeb/question/putQuestion/${id}`, data)
