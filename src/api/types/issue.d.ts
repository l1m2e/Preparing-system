export interface IaddIssue {
	analysis: string
	answer: Array<string>
	choices?: Array<Ichoices>
	difficulty: number
	fid?: number
	share_flag?: boolean
	srcId?: Array<any>
	title: string
	type?: number
}
interface Ichoices {
	unique: string
	text: string
}
export interface IqueryIssueList {
	bankFlag?: boolean
	current: number
	shareFlag?: boolean
	size: number
	endTime?: number
	keyword?: string
	startTime?: number
	title?: string
	type?: number
}
export interface IqueryIssueListFromId {
	pid: number
	current: number
	size: number
	endTime?: number
	keyword?: string
	startTime?: number
	title?: string
	type?: number
}
