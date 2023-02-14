import { axios } from '~/service'
import { ILessonPreparation, IopenPreparing, IWeekCourse, IgetClassList } from './types'
// 获取学期课程
export const getSemesterCourse = (time: number) => axios.get('/teacherWeb/course/semesterCourse', { params: { time } })
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
// 获取班级列表
export const getClassList = (data: IgetClassList) => axios.get('/teacherWeb/course/getClassByCourseName', { params: data })
