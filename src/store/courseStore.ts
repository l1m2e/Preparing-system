export const courseInfoStore = useStorage('courseInfo', {
	/** 班级名称 */
	className: '',
	/** 教室位置 */
	classDeviceName: '',
	/** 教室mac */
	classRoomMac: '',
	/** 当前课时 */
	courseHour: 0,
	/** 总课时 */
	courseHourAll: '',
	/** 课程名称 */
	courseName: '',
	/** 结束时间 */
	endTime: 0,
	/** 开始时间 */
	startTime: 0,
	/** 上课楼层 */
	classDevicePosition: '',
	/** 分配的颜色 */
	color: '',
	/** 班级人数 */
	classCount: '',
	/** 是否已备课, */
	preparingFlag: false,
	/** 课程id */
	id: null
})

export const semesterStore = useStorage('semester', {
	/** 学年度 */
	year: '',
	/** 学期 */
	semester: ''
})
