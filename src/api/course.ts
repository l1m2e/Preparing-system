import { axios } from '~/service'
import { IWeekCourse } from './types'
// 获取学期课程
export const getSemesterCourse = (time: number) => axios.get('/teacherWeb/course/semesterCourse', { params: { time } })
// 根据课程名和班级名获取当前周的课程表
export const getWeekCourse = (data: IWeekCourse) => axios.get('/teacherWeb/course/queryWeekCourse', { params: data })
// 获取第几周的详细时间
export const getWeekTime = (weekNum: number) => axios.get('/teacherWeb/course/timeCourse', { params: { weekNum } })
