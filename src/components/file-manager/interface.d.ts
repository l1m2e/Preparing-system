export type Props = {
	/** 被选中的列表 */
	modelValue: Array<number>
	/** 文件列表 */
	fileList: Array<File>
	//** 禁用操作 */
	disabled?: boolean
	//是否允许操作
	share?: boolean
}

export type Emit = {
	/** 更新 model value */
	'update:modelValue': [val: Array<number>]
	/** 打开 */
	open: [val: File]
	/** 重命名文件事件 */
	resetFolderName: [id: number]
	/** 移动文件事件 */
	move: [val: number | Array<number>]
	/** 删除文件事件 */
	delete: [val: number | Array<number>]
	/** 创建事件 */
	created: []
	/** 滚动到底部 */
	scrollTobottom: []
	/** 刷新 */
	refresh: []
	// 共享操作
	onShare: [val: File]
}

export interface File {
	/** 文件名称 */
	fileName: string
	/** id */
	id: number
	/** 父id */
	fid: number
	/** 创建时间戳 */
	createdTimestamp: number
	/** 类型 */
	type: number
	/** 0 不分享 1 科目分享 2 文件分享 */
	shareType?: number
}
