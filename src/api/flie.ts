import { axios } from '~/service'

//删除文件
export const deleteFile = (fileArray: Array<any>) => axios.delete('/file/deleteUrl', { data: fileArray })
//标记使用的图片
export const markUseImage = (data: Array<number>) => axios.post('/file/saveImage', data)
