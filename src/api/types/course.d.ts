export interface IWeekCourse {
	className: string
	courseName: string
	time: string
}
export interface ILessonPreparation {
	className: string
	courseName: string
	courseHour: number
	year: string
	semester: string
}

export interface IopenPreparing {
	classDeviceName: string
	classDevicePosition: string
	className: string
	classRoomMac: string
	courseHour: number
	courseName: string
	endTime: number
	startTime: number
	year: string
	semester: string
}

export interface IgetClassList {
	courseName: string
	time: number
}
