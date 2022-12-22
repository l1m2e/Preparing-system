<script lang="ts" setup>
import dayjs from 'dayjs'
import { addColors, getKeysObjec } from '~/utils'
import classRoomJpg from '~/assets/img/classroom.png'
import router from '~/router'

const courseInfoList = ref<any[]>([])
const getCourseInfo = async () => {
	const res = await api.getSemesterCourse(dayjs().valueOf())
	if (res.status === 200) {
		courseInfoList.value = res.data
		addColors(courseInfoList.value, 'className')
	} else {
		Message.error('获取课程列表失败')
	}
}
getCourseInfo()

const goLessonPrepare = (info: any) => {
	const arr = ['className', 'classRoomMac', 'courseName', 'startTime', 'endTime', 'floor', 'classRoom', 'courseHour', 'courseHourAll', 'color', 'classCount']
	router.push({ path: '/course/prepare', query: getKeysObjec(info, arr) })
}
</script>

<template>
	<a-card :bordered="false">
		<div class="text-20px mb-20px">课程详情</div>
		<a-card class="mb-20px w-100% card" v-for="item in courseInfoList">
			<div class="w-100% flex h-120px">
				<div class="min-w-200px h-120px relative mr-20px rounded-md overflow-hidden">
					<img class="w-100% h-100%" :src="classRoomJpg" alt="" />
					<div class="absolute left-0 right-0 top-0 bottom-0 bg-[#00000042] center color-white text-19px">{{ item.courseName }}</div>
				</div>
				<div class="min-w-300px">
					<div class="flex items-center">
						<div class="text-20px">{{ item.courseName }}</div>
						<a-tag class="ml-20px" :color="item.color">{{ item.className }}</a-tag>
					</div>
					<div class="mt-25px text-16px">下节课开课时间 {{ dayjs(item.startTime).format('YYY-MM-DD HH:mm:ss') }}</div>
					<div class="icon-box mt-25px flex items-center text-16px">
						<a-tag :color="item.color"><div class="i-ri-building-2-line"></div></a-tag>
						<div class="ml-10px">{{ item.floor }}</div>
						<a-tag class="ml-20px" :color="item.color"><div class="i-ri-map-pin-line"></div></a-tag>
						<div class="ml-10px">{{ item.classRoom }}</div>
					</div>
				</div>
				<div class="center ml-20px min-w-120px h-100% flex-col">
					<a-progress type="circle" :animation="true" :percent="parseFloat((item.courseHour / item.courseHourAll).toFixed(2))" />
					<div class="text-12px mt-15px">总课时：{{ item.courseHourAll }}</div>
					<div class="text-12px mt-5px">当前课时：{{ item.courseHour }}</div>
				</div>
				<!-- <div class="center ml-20px min-w-120px h-100% flex-col">
					<a-progress type="circle" color="#7816ff" :animation="true" :percent="parseFloat((item.courseHour / item.courseHourAll).toFixed(2))" />
					<div class="text-12px mt-15px">考勤情况：{{ item.courseHourAll + '/' + item.courseHour }}</div>
					<a-button type="text" size="mini" class="text-12px">考勤详情</a-button>
				</div> -->
				<div class="w-100% h-100% center flex-col items-end justify-start">
					<a-tag class="ml-20px" color="green" v-if="item.prepare">
						<div>已备课</div>
						<div class="i-ri-check-line"></div>
					</a-tag>
					<a-tag class="ml-20px" v-else>未备课</a-tag>
					<a-button type="primary" class="mt-60px" @click="goLessonPrepare(item)">去备课</a-button>
				</div>
			</div>
		</a-card>
	</a-card>
</template>

<style scoped>
:deep(.arco-card-body) {
	color: var(--color-text-1);
}
.icon-box :deep(.arco-tag) {
	border-radius: 5px;
	/* background-color: #00000042; */
}
.card:hover {
	box-shadow: 0px 0px 20px #0000001a;
	transform: translateY(-1px);
	transition: transform 0.6s;
}
</style>
