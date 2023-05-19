<script lang="ts" setup>
import { Props, Emit } from './interface.d'

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

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
		:title="props.title"
		:width="500"
		:closable="false"
		:mask-closable="false"
		:esc-to-close="false"
		:footer="false"
		@before-close="name = ''">
		<a-input v-model="name" :placeholder="props.placeholder"></a-input>
		<div class="center justify-end mt-30px">
			<div>
				<a-button class="mr-10px" @click="cancel">取消</a-button>
				<a-button @click="ok" type="primary">确定</a-button>
			</div>
		</div>
	</a-modal>
</template>
