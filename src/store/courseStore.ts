export const courseInfoStore = useStorage('courseInfo', {
	className: '', // 班级名称
	classDeviceName: '', // 教室位置
	classRoomMac: '', // 教室mac
	courseHour: 0, //当前课时
	courseHourAll: '', //总课时
	courseName: '', //课程名称
	endTime: 0, //结束时间
	startTime: 0, //开始时间
	classDevicePosition: '', //上课楼层
	color: '', // 分配的颜色
	classCount: '', //班级人数
	preparingFlag: false // 是否已备课
})
