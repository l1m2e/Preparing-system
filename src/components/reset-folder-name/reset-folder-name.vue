<script lang="ts" setup>
const emit = defineEmits(['ok'])

// 是否显示弹框
const show = ref(false)
const params = reactive({
	id: 0,
	name: ''
})

// 打开弹框
const open = async (folderId: number) => {
	show.value = true
	window.addEventListener('keydown', watchEnter)
	params.id = folderId
}

defineExpose({ open })

//监听回车按钮
const watchEnter = (event: KeyboardEvent) => {
	if (event.key === 'Enter') {
		restFolderName()
	}
}

const close = () => {
	params.name = ''
	show.value = false
	window.removeEventListener('keydown', watchEnter)
}

// 文件重命名
const restFolderName = async () => {
	const { id, name } = params
	const res = await api.issueBank.updatePath(id, { name })
	if (res.status === 200) {
		Message.success('重命名成功')
		emit('ok', params)
		show.value = false
		return
	}
	Message.error('重命名失败')
}
</script>

<template>
	<a-modal :visible="show" title="重命名文件夹" :width="500" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<a-input placeholder="请输入文件夹名称" v-model="params.name"></a-input>
		<div class="center justify-end mt-30px">
			<div>
				<a-button class="mr-10px" @click="close">取消</a-button>
				<a-button @click="restFolderName" type="primary">确定</a-button>
			</div>
		</div>
	</a-modal>
</template>
