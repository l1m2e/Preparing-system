<script lang="ts" setup>
import dayjs from 'dayjs'
import classRoomJpg from '~/assets/img/classroom.png'
import router from '~/router'
import { addColors, pick, setReactive } from '~/utils'
import { courseInfoStore } from '~/store/courseStore'

const courseInfoList = ref()
const getCourseInfo = async () => {
	const res = await api.courseTable.getCourseSemester({ time: dayjs().valueOf() })
	if (res.status === 200) {
		addColors(res.data.list!, 'className') // 添加颜色
		courseInfoList.value = formatData(res.data.list!) // 格式化数据结构s
	} else {
		Message.error('获取课程列表失败')
	}
}
getCourseInfo()

//将数据格式化成嵌套结构
const formatData = (list: Array<any>) => {
	const arr: Array<any> = []
	list.forEach((item) => {
		const res = arr.find((v) => v.courseName === item.courseName)
		if (res) {
			res.child.push(item)
		} else {
			let obj = { courseName: item.courseName, child: [] as Array<any> }
			obj.child.push(item)
			arr.push(obj)
		}
	})
	return arr
}

const goLessonPrepare = (info: any) => {
	//需要添加到store的字段
	const arr = [
		'className', //班级名称
		'classDeviceName', //教室位置
		'classRoomMac', //教室mac
		'courseHour', //当前课时
		'courseHourAll', // 总课时
		'courseName', //课程名称
		'endTime', //结束时间
		'startTime', //开始时间
		'classDevicePosition', //上课楼层
		'color', //分配颜色
		'classCount', // 班级人数
		'preparingFlag' //是否已备课
	]
	setReactive(courseInfoStore.value, pick(info, arr))
	router.push('/course/prepare')
}
</script>

<template>
	<a-card :bordered="false">
		<div class="text-20px mb-20px">课程详情</div>
		<a-card class="w-100% course" v-for="(item, index) in courseInfoList" :bordered="false" :key="item.courseName">
			<div class="w-100% flex h-auto">
				<!-- 图片 -->
				<div class="relative mr-20px rounded-md overflow-hidden">
					<img class="w-100% h-100% object-cover" :src="classRoomJpg" alt="" />
					<div class="absolute left-0 right-0 top-0 bottom-0 bg-[#00000042] center color-white text-19px">{{ item.courseName }}</div>
				</div>
				<div class="w-100%">
					<!-- 课程标题 -->
					<div class="text-20px mt-10px">{{ item.courseName }}</div>
					<div class="h-auto w-100% grid lg:grid-cols-1 xl:grid-cols-2 gap-4 mt-10px">
						<a-card v-for="child in item.child" class="card">
							<!-- 班级标题 -->
							<div class="center justify-between">
								<div class="flex">
									<div class="text-18px">{{ child.className }}</div>
									<a-tag class="ml-10px" :color="child.color">
										<div class="i-ri-group-line"></div>
										<div class="ml-5px">{{ child.classCount }}</div>
									</a-tag>
								</div>
								<a-tag class="ml-20px" color="green" v-if="child.preparingFlag">
									<div>已备课</div>
									<div class="i-ri-check-line"></div>
								</a-tag>
								<a-tag class="ml-20px" v-else>未备课</a-tag>
							</div>
							<!-- 详细信息 -->
							<div class="w-100%">
								<div class="min-w-300px">
									<div class="mt-25px text-16px">下节课开课时间 {{ dayjs(child.startTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
									<div class="center justify-between mt-25px">
										<div class="icon-box flex items-center text-16px">
											<a-tag :color="child.color"><div class="i-ri-building-2-line"></div></a-tag>
											<div class="ml-10px">{{ child.classDevicePosition }}</div>
											<a-tag class="ml-20px" :color="child.color"><div class="i-ri-map-pin-line"></div></a-tag>
											<div class="ml-10px">{{ child.classDeviceName }}</div>
										</div>
										<a-button type="primary" @click="goLessonPrepare(child)">去备课</a-button>
									</div>
									<a-progress class="mt-20px" :animation="true" :percent="parseFloat((child.courseHour / child.courseHourAll).toFixed(2))">
										<template v-slot:text="scope">{{ scope.percent * 100 }}% {{ child.courseHourAll }} /{{ child.courseHour }}</template>
									</a-progress>
								</div>
							</div>
						</a-card>
					</div>
				</div>
			</div>
			<a-divider class="divider" v-if="index !== courseInfoList.length - 1" />
		</a-card>
	</a-card>
</template>

<style scoped>
:deep(.arco-card-body) {
	color: var(--color-text-1);
}
.icon-box :deep(.arco-tag) {
	border-radius: 5px;
}

.card:hover {
	box-shadow: 0px 5px 10px #0000000c;
	transform: translateY(-1px);
	transition: transform 0.6s;
}
.course :deep(.arco-divider-horizontal) {
	margin-top: 40px;
	margin-bottom: 10px;
}
</style>
