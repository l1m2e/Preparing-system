export interface IaddIssue {
	analysis: string
	answer: Array<string>
	choices: Array<Ichoices>
	difficulty: number
	fid?: number
	share_flag: boolean
	srcId: Array<any>
	title: string
	type?: 1 | 2 | 3 | 4
}
interface Ichoices {
	unique: string
	text: string
}
