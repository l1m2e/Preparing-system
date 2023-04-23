import { axios } from '~/service'

//删除文件
export const deleteFile = (fileArray: Array<any>) => axios.delete('/file/deleteUrl', { data: fileArray })
//标记使用的图片
export const markUseImage = (data: Array<number>) => axios.post('/file/saveImage', data)

//批量删除文件夹
export const batchDeleteFolders = (data: Array<number>) => axios.delete('/teacherWeb/questionBank/deletePath', { data })
//批量删除问题
export const batchDeleteFlie = (data: Array<number>) => axios.delete('/teacherWeb/questionBank/del', { data })
