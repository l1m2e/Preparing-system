import { axios } from '~/service'
// 获取学期课程
export const getSemesterCourse = (time: number) => axios.get('/teacherWeb/course/semesterCourse', { params: { time } })
