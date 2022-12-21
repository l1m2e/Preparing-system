<script lang="ts" setup>
import dayjs from 'dayjs'
import { addColors } from '~/utils'

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
</script>

<template>
	<a-card :bordered="false">
		<div class="text-20px mb-20px">课程详情</div>
		<a-card class="mb-20px h-150px" v-for="item in courseInfoList">
			<div class="flex items-center">
				<div class="text-20px">{{ item.courseName }}</div>
				<a-tag class="ml-20px" :color="item.color">{{ item.className }}</a-tag>
			</div>
			<div class="mt-15px text-16px">下节课开课时间 {{ dayjs(item.startTime).format('YYY-MM-DD HH:mm:ss') }}</div>
			<div class="icon-box mt-15px flex items-center text-16px">
				<a-tag :color="item.color"><div class="i-ri-building-2-line"></div></a-tag>
				<div class="ml-10px">{{ item.floor }}</div>
				<a-tag class="ml-20px" :color="item.color"><div class="i-ri-map-pin-line"></div></a-tag>
				<div class="ml-10px">{{ item.classRoom }}</div>
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
}
</style>
