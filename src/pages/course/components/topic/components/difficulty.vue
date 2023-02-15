<script lang="ts" setup>
defineProps<{
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
</script>

<template>
	<a-select class="max-w-200px" :default-value="1" v-model="modelValue" :options="difficultyOptions"></a-select>
</template>
