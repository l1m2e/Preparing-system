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

export interface AddQuestionParams {
	title: string
	srcId?: Record<string, unknown>[]
	choices?: {
		unique?: string
		text?: string
	}[]
	answer?: Record<string, unknown>[]
	analysis?: string
	type: number
	share_flag?: boolean
	fid?: number
	difficulty: number
}
