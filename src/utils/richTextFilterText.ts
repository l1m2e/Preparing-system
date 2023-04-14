/**
 * 这个函数用于提取所有符合html标准的富文本的文本内容
 * @param richText 富文本
 * @returns 文本
 */
export const richTextFilterText = (richText: string) => {
	const parser = new DOMParser()
	const doc = parser.parseFromString(richText, 'text/html')
	const textContent = doc.body.textContent ? doc.body.textContent : ''
	return textContent
}

/**
 * 传入一个富文本 自动搜索富文本中所有的图片 并返回图片的id数组 这个函数具有强业务绑定 如果后端修改了图片标识位置则不会生效
 * @param richText 富文本
 * @returns number[]
 */
export const getRichTextImageIds = (richText: string) => {
	// 创建dom
	const parser = new DOMParser()
	// 解析html
	const parsedHtml = parser.parseFromString(richText, 'text/html')
	// 搜索图片url
	const imageUrlList = Array.from(parsedHtml.querySelectorAll('img')).map((item) => item.getAttribute('src'))
	// 获取图片id 数组
	return imageUrlList.map((url) => url?.split('/').pop() || '').map((item) => parseInt(item))
}
