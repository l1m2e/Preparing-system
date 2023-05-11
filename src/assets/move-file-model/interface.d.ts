export interface Props {
	modelValue: boolean
	fileList: Array<File>
}
export interface File {
	fileName: string
	id: number
	fid: number
	type: number
}

export interface Emit {
	(e: 'update:modelValue', show: boolean): void
}
