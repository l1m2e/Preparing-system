<script lang="ts" setup>
import dayjs from 'dayjs'
import classRoomJpg from '~/assets/img/classroom.png'
import weekCourse from './components/week-course.vue'
import prepareLessonsModal from './components/prepare-lessons-modal.vue'
import courseIssue from './components/course-issue.vue'
import courseware from './components/courseware.vue'
import { changeTextToCN, pick, setReactive } from '~/utils'
import { courseInfoStore, semesterStore } from '~/store/courseStore'

// 查询是否备课 200 已备课 400 未备课
const queryLessonPrepare = async () => {
	console.log('备课请求 ')

	const res = await api.prepare.getPreparingOneByCourse({
		...pick(courseInfoStore.value, ['className', 'courseHour', 'courseName']),
		...semesterStore.value
	})
	if (res.status === 200) {
		courseInfoStore.value.preparingFlag = true
		courseInfoStore.value.id = res.data.id!
	}
	if (res.status === 400) {
		courseInfoStore.value.preparingFlag = false
		courseInfoStore.value.id = 0
	}
}
queryLessonPrepare()

// 课时改变重新查询是否备课
const courseHourChange = () => {
	queryLessonPrepare()
	tabsaActiveKey.value = '1'
}
// 开启备课
const prepareLessonsModalRef = ref()
const openPreparesLesson = async () => {
	prepareLessonsModalRef.value.open()
}

const weekCourseRef = ref()
const classOptions = ref()

//通过课程名称查询班级名称
const getClassList = async () => {
	const res = await api.courseTable.getClassByCourseName({ time: dayjs().valueOf(), courseName: courseInfoStore.value.courseName })
	if (res.status !== 200) return Message.error('获取班级名称失败')
	classOptions.value = res.data
}
getClassList()

//班级改变
const classChange: any = async (className: string) => {
	const res = await api.courseTable.getCourseByClassAndCourseName({
		className,
		courseName: courseInfoStore.value.courseName,
		time: dayjs().valueOf()
	})
	if (res.status !== 200) return Message.error('获取班级详细信息失败')
	weekCourseRef.value.getWeekCourseList()
	setReactive(courseInfoStore.value, res.data!)
	console.log(res.data)
}

const tabsaActiveKey = ref('1')
</script>

<template>
	<div>
		<!-- 头部操作栏 -->
		<a-card :bordered="false">
			<div class="flex flex-col 2xl:flex-row 2xl:justify-between">
				<div class="flex w-100% 2xl:w-auto justify-center 2xl:justify-center">
					<div class="min-w-250px relative mr-150px 2xl:mr-20px rounded-md overflow-hidden">
						<img class="w-100% h-100%" :src="classRoomJpg" alt="" />
						<div class="absolute left-0 right-0 top-0 bottom-0 bg-[#00000042] center color-white text-19px">{{ courseInfoStore.courseName }}</div>
					</div>
					<div>
						<div class="text-20px mt-10px flex">
							<div>{{ courseInfoStore.courseName }}</div>
						</div>
						<div class="icon-box mt-20px flex items-center text-16px">
							<a-tag color="blue"><div class="i-ri-group-line"></div></a-tag>
							<a-select class="ml-10px max-w-120px" v-model="courseInfoStore.className" placeholder="班级选择" @change="classChange">
								<a-option v-for="item in classOptions">{{ item }}</a-option>
							</a-select>
							<a-tag class="ml-20px" color="blue"><div class="i-ri-parent-line"></div></a-tag>
							<div class="ml-10px w-120px truncate">{{ courseInfoStore.classCount }} 人</div>
						</div>
						<div class="icon-box mt-10px flex items-center text-16px">
							<a-tag color="blue"><div class="i-ri-building-2-line"></div></a-tag>
							<div class="ml-10px w-120px truncate">{{ courseInfoStore.classDevicePosition }}</div>
							<a-tag class="ml-20px" color="blue"><div class="i-ri-map-pin-line"></div></a-tag>
							<div class="ml-10px w-120px truncate">{{ courseInfoStore.classDeviceName }}</div>
						</div>
						<div class="icon-box mt-10px flex items-center text-16px">
							<a-tag color="blue"><div class="i-ri-timer-line"></div></a-tag>
							<div class="ml-10px">
								{{ dayjs(courseInfoStore.startTime).format('YYYY-MM-DD') }} &nbsp;
								{{ `星期${changeTextToCN(dayjs(courseInfoStore.startTime).day())}` }} &nbsp; {{ dayjs(courseInfoStore.startTime).format('HH:mm') }}~{{
									dayjs(courseInfoStore.endTime).format('HH:mm')
								}}
							</div>
						</div>
						<div class="icon-box mt-10px flex items-center text-16px">
							<a-tag color="blue"><div class="i-ri-book-3-line"></div></a-tag>
							<div class="ml-10px">当前课时 {{ courseInfoStore.courseHour }} 总课时 {{ courseInfoStore.courseHourAll }}</div>
						</div>
						<div class="icon-box mt-20px flex items-center text-12px">
							<div class="w-20px h-20px rounded-sm bg-indigo-4 dark:bg-indigo-5 mr-10px ml-5px"></div>
							<span>当前选中</span>
							<div class="w-20px h-20px rounded-sm bg-blue-4 dark:bg-blue-5 mx-10px"></div>
							<span>未备课</span>
							<div class="w-20px h-20px rounded-sm bg-green-4 dark:bg--5 mx-10px"></div>
							<span>已备课</span>
							<div class="w-20px h-20px rounded-sm bg-[var(--color-fill-2)] mx-10px"></div>
							<span>无课程</span>
						</div>
					</div>
				</div>

				<div class="w-900px h-260px mt-50px m-auto 2xl:mt-0">
					<weekCourse @onChange="courseHourChange" ref="weekCourseRef"></weekCourse>
				</div>
			</div>
		</a-card>
		<!-- 内容展示 -->
		<a-card :bordered="false" class="mt-30px" v-if="courseInfoStore.preparingFlag">
			<a-tabs default-active-key="1" v-model:active-key="tabsaActiveKey">
				<a-tab-pane key="1" title="课堂问题">
					<courseIssue v-if="tabsaActiveKey === '1'"></courseIssue>
				</a-tab-pane>
				<!-- <a-tab-pane key="2" title="课堂测验">Content of Tab Panel 2</a-tab-pane> -->
				<a-tab-pane key="2" title="课件">
					<courseware v-if="tabsaActiveKey === '2'"></courseware>
				</a-tab-pane>
			</a-tabs>
		</a-card>
		<!-- 未开启备课遮罩层 -->
		<a-card :bordered="false" class="mt-30px h-550px overflow-hidden relative center" v-else>
			<!-- backdrop-blur-xl -->
			<div class="absolute top-0 left-0 right-0 bottom-0 z-1 center flex-col">
				<h1>当前课时暂未开启备课，是否开启备课</h1>
				<a-button shape="round" size="large" type="primary" class="ml-20px" @click="openPreparesLesson">开启备课</a-button>
			</div>
		</a-card>
		<prepareLessonsModal ref="prepareLessonsModalRef" @change="weekCourseRef.getWeekCourseList()"></prepareLessonsModal>
	</div>
</template>

<style scoped>
.icon-box :deep(.arco-tag) {
	border-radius: 5px;
	padding: 15px;
}
</style>
