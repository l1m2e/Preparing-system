<script lang="ts" setup>
const modelValue = defineModel<number[]>()
const props = defineProps<{
	size?: 'mini' | 'medium' | 'large' | 'small' | undefined
	width?: number
	maxTagCount?: number
}>()

const emits = defineEmits<{
	change: []
}>()
</script>

<template>
	<a-select
		v-model:model-value="modelValue"
		placeholder="请选择这个课件"
		default-active-first-option
		@change="emits('change')"
		multiple
		:max-tag-count="props.maxTagCount ? maxTagCount : 3"
		:size="props.size"
		:style="{ width: props.width ? props.width + 'px' : '300px' }">
		<a-option :disabled="modelValue?.length === 1 && modelValue[0] === 1" :value="1">课前预习</a-option>
		<a-option :disabled="modelValue?.length === 1 && modelValue[0] === 2" :value="2">仅老师可见</a-option>
		<a-option :disabled="modelValue?.length === 1 && modelValue[0] === 4" :value="4">课后</a-option>
	</a-select>
</template>
