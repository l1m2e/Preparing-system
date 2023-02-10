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
