export interface IqueryQuestionBankList {
	current?: number
	endTime?: number
	fid?: number
	shareFlag?: boolean
	size?: number
	startTime?: number
	title?: string
	type?: number
}
export interface AddKeywordParams {
	keyword: string
	fid?: number
}

export interface MoveQuestionParams {
	ids: number[]
	fid: number
}
