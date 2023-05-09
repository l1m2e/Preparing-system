<script lang="ts" setup>
const emit = defineEmits(['update:modelValue', 'ok'])

const props = defineProps<{
	modelValue: boolean
}>()

const name = ref('')

//取消
const cancel = () => {
	emit('update:modelValue', false)
}

//确定
const ok = () => {
	emit('ok', name.value)
}
</script>

<template>
	<a-modal
		:visible="props.modelValue"
		title="重命名文件夹"
		:width="500"
		:closable="false"
		:mask-closable="false"
		:esc-to-close="false"
		:footer="false"
		@before-close="name = ''">
		<a-input placeholder="请输入文件夹名称" v-model="name"></a-input>
		<div class="center justify-end mt-30px">
			<div>
				<a-button class="mr-10px" @click="cancel">取消</a-button>
				<a-button @click="ok" type="primary">确定</a-button>
			</div>
		</div>
	</a-modal>
</template>
