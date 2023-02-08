import { axios } from '~/service'

//删除文件
export const deleteFile = (fileArray: Array<any>) => axios.delete('/file/deleteUrl', { data: fileArray })
