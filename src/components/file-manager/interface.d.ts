export type Props = {
	modelValue: Array<number>
	fileList: Array<File>
}

export interface Emit {
	(e: 'open', item: File): void
	(e: 'update:modelValue', item: Array<number>): void
	(e: 'resetFolderName', id: number): void
	(e: 'move', data: number | Array<number>): void
	(e: 'delete', data: number | Array<number>): void
	(e: 'created', item: File): void

	// 'update:modelValue': [val: Array<number>]
	// open: [val: File]
	// resetFolderName: [id: number]
	// move: [val: number | Array<number>]
	// delete: [val: number | Array<number>]
	// created: [item: File]
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
}
