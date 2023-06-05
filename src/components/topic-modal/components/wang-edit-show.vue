<script lang="ts" setup>
const props = defineProps<{
	placeholder: string
	minHeight?: string
}>()

const modelValue = defineModel<string>()

const flag = ref(false)

const onClick = () => {
	flag.value = true
}
//编辑器失去焦点
const editBlur = () => {
	flag.value = false
}
</script>

<template>
	<div>
		<wang-edit v-if="flag" v-model="modelValue" :placeholder="props.placeholder" :onOnEditBlur="editBlur" :minHeight="props.minHeight"></wang-edit>
		<div
			v-else-if="modelValue && modelValue !== '<p><br></p>'"
			@click="onClick"
			class="cursor-pointer p-10px bg-[var(--color-fill-1)] w-100% h-42px overflow-y-auto scroll-bar rounded-5px"
			v-html="modelValue"></div>
		<div
			@click="onClick"
			v-else
			class="cursor-pointer p-10px bg-[var(--color-fill-1)] w-100% h-42px overflow-y-auto scroll-bar rounded-5px text-[rgb(var(--gray-5))]">
			{{ props.placeholder }}
		</div>
	</div>
</template>
