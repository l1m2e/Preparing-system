export interface IAddVersion {
	text: string
	problemId: Array<number>
	permissionId: number
	srcId: number
	version: string
}
export interface IGetVersionList {
	current?: number
	size: ?number
	permissionId?: number
}
export interface IGetVersionMax {
	permissionId: number
}

export interface IUpdateDiary {
	versionMin?: number
	versionMax?: number
	problemId?: Array<number>
	permissionId?: string
	srcId?: number
}
