import { axios } from '~/service'
import { IGetCourseList, ILessonPreparation, IopenPreparing, IWeekCourse } from './types'
// 获取学期课程
export const getSemesterCourse = (data: IGetCourseList) => axios.get('/teacherWeb/course/semesterCourse', { params: data })
// 根据课程名和班级名获取当前周的课程表
export const getWeekCourse = (data: IWeekCourse) => axios.get('/teacherWeb/course/queryWeekCourse', { params: data })
// 获取第几周的详细时间
export const getWeekTime = (weekNum: number) => axios.get('/teacherWeb/course/timeCourse', { params: { weekNum } })
// 根据课程名和班级名获取当前周的课程表 格式化
export const weekCourseFormat = (data: IWeekCourse) => axios.get('/teacherWeb/course/weekCourseSimplify', { params: data })
// 查询课程是否备课
export const isLessonPreparation = (data: ILessonPreparation) => axios.get('/teacherWeb/preparing/infoByCourse', { params: data })
// 开启备课
export const openPreparing = (data: IopenPreparing) => axios.post('/teacherWeb/preparing/add', data)
// 获取当学年和学期
export const getSemester = () => axios.get('/teacherWeb/course/getYearAndSemester')
