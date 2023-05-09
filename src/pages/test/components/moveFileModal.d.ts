export interface File {
	fileName: string
	id: number
	fid: number
	type: number
}

export interface Props {
	modelValue: boolean
	fileList: Array<File>
}
