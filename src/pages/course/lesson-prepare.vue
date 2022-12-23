<script lang="ts" setup>
import { setReactive } from '~/utils'
import classRoomJpg from '~/assets/img/classroom.png'
import weekCourse from './components/week-course.vue'
const route = useRoute()
const courseInfo = reactive({
	className: '',
	classRoom: '',
	classRoomMac: '',
	courseHour: '',
	courseHourAll: '',
	courseName: '',
	endTime: '',
	floor: '',
	startTime: '',
	color: '',
	classCount: ''
})
setReactive(courseInfo, route.query)
console.log('courseInfo', courseInfo)
</script>

<template>
	<a-card :bordered="false">
		<div class="flex">
			<div class="min-w-250px h-150px relative mr-20px rounded-md overflow-hidden">
				<img class="w-100% h-100%" :src="classRoomJpg" alt="" />
				<div class="absolute left-0 right-0 top-0 bottom-0 bg-[#00000042] center color-white text-19px">{{ courseInfo.courseName }}</div>
			</div>
			<div>
				<div class="text-20px mt-10px flex">
					<div>{{ courseInfo.courseName }}</div>
				</div>
				<div class="icon-box mt-20px flex items-center text-16px">
					<a-tag color="blue"><div class="i-ri-group-line"></div></a-tag>
					<a-select class="ml-10px max-w-120px" v-model="courseInfo.className" placeholder="班级选择">
						<a-option>班级名称2</a-option>
					</a-select>
					<a-tag class="ml-20px" color="blue"><div class="i-ri-parent-line"></div></a-tag>
					<div class="ml-10px w-120px truncate">{{ courseInfo.classCount }} 人</div>
				</div>
				<div class="icon-box mt-10px flex items-center text-16px">
					<a-tag color="blue"><div class="i-ri-building-2-line"></div></a-tag>
					<div class="ml-10px w-120px truncate">{{ courseInfo.floor }}</div>
					<a-tag class="ml-20px" color="blue"><div class="i-ri-map-pin-line"></div></a-tag>
					<div class="ml-10px w-120px truncate">{{ courseInfo.classRoom }}</div>
				</div>
			</div>
			<div class="w-100% h-200px">
				<weekCourse :course-name="courseInfo.courseName" :class-name="courseInfo.className" :start-time="courseInfo.startTime"></weekCourse>
			</div>
		</div>

		<!-- <div class="flex center justify-start h-40px">
			<div class="text-12px min-w-260px">
				<span>共计</span>
				<a-tag class="mx-10px">{{ courseInfo.courseHourAll }}</a-tag>
				<span>课时</span>
				<span class="ml-20px">当前课时</span>
				<a-tag class="mx-10px">{{ courseInfo.courseHour }}</a-tag>
			</div>
			<div class="w-100% center">
				<a-progress
					:steps="parseInt(courseInfo.courseHour)"
					:animation="true"
					size="mini"
					:percent="parseFloat((parseInt(courseInfo.courseHour) / parseInt(courseInfo.courseHourAll)).toFixed(2))" />
			</div>
		</div> -->
	</a-card>
</template>

<style scoped>
.icon-box :deep(.arco-tag) {
	border-radius: 5px;
	padding: 15px;
}
</style>
