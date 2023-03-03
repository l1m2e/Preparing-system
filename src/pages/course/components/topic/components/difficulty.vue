<script lang="ts" setup>
const props = defineProps<{
	modelValue: number
}>()
const difficultyOptions = [
	{
		value: 1,
		label: '易'
	},
	{
		value: 2,
		label: '中'
	},
	{
		value: 3,
		label: '难'
	}
]
const emit = defineEmits(['update:modelValue'])
const selected = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})
</script>

<template>
	<a-select class="max-w-200px" :default-value="1" v-model="selected" :options="difficultyOptions"></a-select>
</template>
