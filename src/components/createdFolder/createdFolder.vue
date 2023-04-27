<script lang="ts" setup>
const props = defineProps<{
	fid: number
}>()

const params = reactive({
	keyword: ''
})

const emits = defineEmits(['ok'])

const addFolder = async () => {
	if (params.keyword === '') return Message.error('文件夹昵称不能为空')
	const res = await api.issueBank.addKeyword({ ...params, fid: props.fid })
	if (res.status === 200) {
		show.value = false
		params.keyword = ''
		emits('ok', res.data)
		Message.success('添加文件夹成功')
	} else {
		Message.error('添加文件夹失败')
	}
}

const show = ref(false) // 是否显示弹框

// 打开弹框
const open = async () => {
	show.value = true
	window.addEventListener('keydown', watchEnter)
}
defineExpose({ open })

const close = () => {
	params.keyword = ''
	show.value = false
	window.removeEventListener('keydown', watchEnter)
}

//监听回车按钮
const watchEnter = (event: KeyboardEvent) => {
	if (event.key === 'Enter') {
		addFolder()
	}
}
</script>

<template>
	<a-modal :visible="show" title="新建文件夹" :width="500" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<a-input placeholder="请输入文件夹名称" v-model="params.keyword"></a-input>
		<div class="center justify-end mt-30px">
			<div>
				<a-button class="mr-10px" @click="close">取消</a-button>
				<a-button @click="addFolder" type="primary">确定</a-button>
			</div>
		</div>
	</a-modal>
</template>

<style lang="scss"></style>
