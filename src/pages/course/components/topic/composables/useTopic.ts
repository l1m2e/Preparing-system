import type { IaddIssue } from '~/api/types'
import { courseInfoStore } from '~/store/courseStore'

/**
 * 封装部分复用的请求逻辑
 * @param obj 添加问题请求参数对象
 * @returns 提交成功失败与提示信息的对象
 */
export const useTopicSubmit = async (obj: IaddIssue) => {
	if (!courseInfoStore.value.id) return { message: '提交成功', isSuccess: true }
	const res = await api.addIssue(obj, courseInfoStore.value.id)
	if (res.status === 200) {
		return { message: '提交成功', isSuccess: true }
	}
	return { message: '提交失败', isSuccess: false }
}

/**
 * 此函数接收一段富文本字符串 返回富文本中包含所有图片的id数组
 * @param richText 富文本字符串
 * @returns 返回富文本中所有图片的 id 数组
 */
export const useGetImageSrcId = (richText: string): Array<number> => {
	const temp: Array<number> = []
	let regexp = /<img [^>]*src=['"]([^'"]+)[^>]*>/g
	richText.replace(regexp, (match, capture) => {
		let index = capture.lastIndexOf('/')
		if (index !== -1) {
			temp.push(parseInt(capture.slice(index + 1)))
		}
		return capture
	})
	return temp
}

/**
 * 标记图片为已使用
 * @param imageIdList 图片id数组
 * @returns 是否保存成功的布尔值
 */
export const useMarkUseImage = async (imageIdList: Array<number>) => {
	if (imageIdList.length === 0) return true
	const res = await api.markUseImage(imageIdList)
	if (res.status !== 200) {
		Message.error('保存编辑器图片失败')
		return false
	}
	return true
}
