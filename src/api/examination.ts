import axios from 'axios'
import type { AddExaminationParams } from './types'
//添加测验
export const addExamination = (data: AddExaminationParams) => axios.post('/teacherWeb/examination/add', data)
