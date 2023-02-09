import { axios } from '~/service'
import { IaddIssue } from './types'

//删除文件
export const addIssue = (data: IaddIssue) => axios.post('/teacherWeb/question/add', data)
