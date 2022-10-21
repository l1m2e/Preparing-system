export interface IGetUserList {
	current: number
	size: number
}
export interface IaddUserPermission {
	permissionId: string
	write: boolean
}
export interface IdeleteUserPermission {
	permissionId: string
}
export interface IAddIssueApi {
	title: string
	permission_id: string
	type: string
	text: string
	srcId: string
}
