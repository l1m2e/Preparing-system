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
