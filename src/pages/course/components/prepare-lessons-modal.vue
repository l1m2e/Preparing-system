<script lang="ts" setup>
import { pick } from '~/utils'
import { courseInfoStore, semesterStore } from '~/store/courseStore'

const emits = defineEmits(['change'])
const show = ref(false)
//将打开对话框的open函数暴露出去
const open = () => {
	show.value = true
}
defineExpose({ open })

const ok = async () => {
	if (!form.title) return Message.error('您必须输入备课主题的名称')
	const param = pick(courseInfoStore.value, [
		'classDeviceName',
		'classDevicePosition',
		'className',
		'classRoomMac',
		'courseHour',
		'courseName',
		'endTime',
		'startTime'
	])
	const res = await api.addPreparing({ ...param, ...form, ...semesterStore.value })
	if (res.status === 200) {
		courseInfoStore.value.preparingFlag = true
		courseInfoStore.value.id = parseInt(res.data.message!)
		Message.success('开启备课成功')
		console.log(courseInfoStore.value)
		emits('change')
		show.value = false
		beforeCancel()
	} else {
		Message.error('开启备课失败')
	}
}

const beforeCancel = (): boolean => {
	form.title = ''
	return true
}

const form = reactive({
	title: ''
})
</script>

<template>
	<a-modal v-model:visible="show" title="创建主题" @cancel="show = false" @ok="ok" @before-cancel="beforeCancel">
		<a-form :model="form" layout="vertical">
			<a-form-item field="name" label="主题名称">
				<a-input v-model="form.title" placeholder="请输入主题名称" />
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<style scoped></style>
