/**
 * 此函数接收一段富文本字符串 返回富文本中包含所有图片的id数组
 * @param richText 富文本字符串
 * @returns 返回富文本中所有图片的 id 数组
 */
export const getImageSrcId = (richText: string): Array<number> => {
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
export const markUseImage = async (imageIdList: Array<number>) => {
	if (imageIdList.length === 0) return true
	const res = await api.markUseImage(imageIdList)
	if (res.status !== 200) {
		Message.error('保存编辑器图片失败')
		return false
	}
	return true
}
