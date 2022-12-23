<script lang="ts" setup>
import dayjs from 'dayjs'
import { setReactive, changeTextToCN } from '~/utils'
const props = defineProps<{
	className: string
	courseName: string
	startTime: string
}>()

let selectionTime: string | number = parseFloat(props.startTime)
const weekCourseList = ref()
// 获取周课表
const getWeekCourseList = async () => {
	const res = await api.getWeekCourse({ className: props.className, courseName: props.courseName, time: dayjs(selectionTime).format('YYYY-MM-DD') })
	if (res.status !== 200) return Message.error('获取课程列表失败')
	weekCourseList.value = res.data
	weekInfo.weekNum = res.data.weekNum
	console.log('res.data', res.data)
}

const weekInfo = reactive({
	endDate: '', //周结束时间
	maxWeek: 0, // 最大周
	schoolStartTime: '', // 开学时间
	startDate: '', // 周开始时间
	weekNum: 0 // 当前周数
})
const weekNumCN = computed(() => `第${changeTextToCN(weekInfo.weekNum)}周`)
// 获取周开始的时间
const getWeekStartTime = async (first = false) => {
	const res = await api.getWeekTime(weekInfo.weekNum)
	if (res.status !== 200) return Message.error('获取周时间失败')
	setReactive(weekInfo, res.data)
	if (first) {
		selectionTime = parseFloat(props.startTime)
	} else {
		selectionTime = weekInfo.startDate
	}
	getWeekCourseList()
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
</script>

<template>
	<div class="w-100% h-100% relative">
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
	</div>
</template>
<style scoped>
.text {
	writing-mode: vertical-rl;
	letter-spacing: 5px;
}
</style>
