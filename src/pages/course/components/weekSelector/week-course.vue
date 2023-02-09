<script lang="ts" setup>
import dayjs from 'dayjs'
import { setReactive, changeTextToCN, getWeekList } from '~/utils'
import { courseInfoStore } from '~/store/courseStore'

let selectionTime: number | string = courseInfoStore.value.startTime
const weekCourseList = ref()
// 获取周课表
const getWeekCourseList = async () => {
	const res = await api.weekCourseFormat({
		className: courseInfoStore.value.className,
		courseName: courseInfoStore.value.courseName,
		time: dayjs(selectionTime).format('YYYY-MM-DD')
	})
	if (res.status !== 200) return Message.error('获取课程列表失败')
	weekCourseList.value = weekCourseListFormat(res.data.weekCourseSim)
	weekInfo.weekNum = res.data.weekNum
	//给选中的课程标记颜色
	weekCourseList.value.forEach((item: any) => {
		item.courseInfo.forEach((course: any) => {
			if (course.startTime) {
				if (course.startTime === courseInfoStore.value.startTime) {
					console.log(course.startTime, courseInfoStore.value.startTime)
					course.selected = true
				}
			}
		})
	})
}

//课程表数据格式化函数
const weekCourseListFormat = (data: Array<any>) => {
	data.forEach((item: any) => {
		item.courseInfo.unshift({
			startTime: item.startTime,
			endTime: item.endTime
		})
	})
	return data
}

const weekInfo = reactive({
	endDate: '', //周结束时间
	maxWeek: 0, // 最大周
	schoolStartTime: '', // 开学时间
	startDate: '', // 周开始时间
	weekNum: 1 // 当前周数
})
const weekNumCN = computed(() => `第${changeTextToCN(weekInfo.weekNum)}周`)
// 获取周开始的时间
const getWeekStartTime = async (first = false) => {
	const res = await api.getWeekTime(weekInfo.weekNum)
	if (res.status !== 200) return Message.error('获取周时间失败')
	setReactive(weekInfo, res.data)
	if (first) {
		selectionTime = courseInfoStore.value.startTime
	} else {
		selectionTime = weekInfo.startDate
		console.log(weekInfo.startDate)
	}
	getWeekCourseList()
	//每次获取周开始时间重新计算 当前周日期列表
	getSelectedWeekList(weekInfo.startDate)
}
getWeekStartTime(true)

//上一周和下一周按钮
type UpDownButtonType = 'add' | 'reduce'
const upDownButton = (type: UpDownButtonType) => {
	switch (type) {
		case 'add':
			weekInfo.weekNum++
			getWeekStartTime()
			break
		case 'reduce':
			weekInfo.weekNum--
			getWeekStartTime()
			break
	}
}

const weekDateArr = ref() //周日期列表
// 获取选中的周的日期
const getSelectedWeekList = (date: string) => {
	weekDateArr.value = getWeekList(date)
}

//监听班级改变重新拉取课程表
watch(
	() => courseInfoStore.value.className,
	() => getWeekCourseList()
)

//选中课时 修改store里面的数据
const electedCourseHour = (info: any) => {
	setReactive(courseInfoStore.value, info)
	//排他算法 清除其他选中的颜色
	weekCourseList.value.forEach((item: any) => {
		item.courseInfo.forEach((course: any) => {
			course.selected = false
		})
	})
	info.selected = true
	console.log(weekCourseList.value)
}
// 开启备课的时候重新查询周课表

const onPreparesLessonInfoChange = () => {
	getWeekCourseList()
}
defineExpose({ onPreparesLessonInfoChange })
</script>

<template>
	<div class="w-100% h-100% relative overflow-hidden">
		<div class="center w-60px h-100% flex-col absolute right-0">
			<a-tooltip content="上一周" position="right" mini>
				<a-button shape="circle" @click="upDownButton('reduce')" :disabled="weekInfo.weekNum <= 1">
					<template #icon><icon-up /></template>
				</a-button>
			</a-tooltip>
			<div class="my-10px text">{{ weekNumCN }}</div>
			<a-tooltip content="下一周" position="right" mini>
				<a-button shape="circle" @click="upDownButton('add')" :disabled="weekInfo.weekNum >= weekInfo.maxWeek">
					<template #icon><icon-down /></template>
				</a-button>
			</a-tooltip>
			<a-tooltip content="当前周" position="right" mini>
				<a-button shape="circle" class="mt-10px" @click="getWeekStartTime(true)">
					<template #icon><icon-star-fill /></template>
				</a-button>
			</a-tooltip>
		</div>
		<div class="w-100% h-100% pr-60px">
			<div class="w-100% h-100% overflow-auto relative scroll-bar">
				<div class="w-100%">
					<!-- 头部星期几 -->
					<div class="center h-40px backdrop-blur-xl w-100% sticky top-0 text-center">
						<div class="flex-1 mr-5px max-w-100px">#</div>
						<div class="flex-1 mr-5px max-w-100px" v-for="item in weekDateArr">
							<p class="">{{ item.week }}</p>
							<p class="mt-5px">{{ dayjs(item.date).format('MM/DD') }}</p>
						</div>
					</div>
					<!-- 内容 -->
					<div class="w-100%">
						<div class="w-100% center h-50px mb-5px" v-for="(item, index) in weekCourseList">
							<div class="flex-1 mr-5px last:mr-3px max-w-100px" v-for="(v, i) in item.courseInfo">
								<div v-if="i === 0" class="text-center">
									<p class="text-16px">{{ index + 1 }}</p>
									<p class="text-12px">{{ v.startTime }}</p>
									<p class="text-12px">{{ v.endTime }}</p>
								</div>
								<!-- 有课 并且判断有课已备课的颜色-->
								<div
									v-else-if="v.startTime"
									@click="electedCourseHour(v), $emit('onChange')"
									:class="`w-100% h-50px cursor-pointer center
									${v.preparingFlag ? 'bg-[rgb(var(--green-2))] hover:bg-[rgb(var(--green-4))]' : 'bg-[rgb(var(--cyan-2))] hover:bg-[rgb(var(--cyan-4))]'} 
									${v.selected ? 'bg-[rgb(var(--primary-3))] hover:bg-[rgb(var(--primary-4))]' : ''} 
									`">
									{{ v.preparingFlag ? '已备课' : '未备课' }}
								</div>
								<!-- 无课 -->
								<div v-else class="bg-[var(--color-fill-2)] w-100% h-50px cursor-pointer hover:bg-[var(--color-fill-4)] transition-all"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.text {
	writing-mode: vertical-rl;
	letter-spacing: 5px;
}
</style>
