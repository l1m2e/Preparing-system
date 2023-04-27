<script lang="ts" setup>
// 是否显示弹框
const show = ref(false)

// 打开弹框
const open = async (folderId: number) => {
	show.value = true
	window.addEventListener('keydown', watchEnter)
	id.value = folderId
}
defineExpose({ open })

//监听回车按钮
const watchEnter = (event: KeyboardEvent) => {
	if (event.key === 'Enter') {
		restFolderName()
	}
}

const close = () => {
	name.value = ''
	show.value = false
	window.removeEventListener('keydown', watchEnter)
}

const id = ref(0)
const name = ref('')

const emits = defineEmits(['ok'])

// 文件重命名
const restFolderName = async () => {
	const res = await api.issueBank.updatePath(id.value, { name: name.value })
	if (res.status === 200) {
		Message.success('重命名成功')
		emits('ok')
		show.value = false
		return
	}
	Message.error('重命名失败')
}
</script>

<template>
	<a-modal :visible="show" title="重命名文件夹" :width="500" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<a-input placeholder="请输入文件夹名称" v-model="name"></a-input>
		<div class="center justify-end mt-30px">
			<div>
				<a-button class="mr-10px" @click="close">取消</a-button>
				<a-button @click="restFolderName" type="primary">确定</a-button>
			</div>
		</div>
	</a-modal>
</template>
