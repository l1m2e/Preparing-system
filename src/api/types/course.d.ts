export interface IWeekCourse {
	className: string
	courseName: string
	time: string
}
export interface ILessonPreparation {
	className: string
	courseName: string
	courseHour: number
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
}

export interface IGetCourseList {
	semester: string
	time: number
	year: string
}
