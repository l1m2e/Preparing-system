<script lang="ts" setup>
import wangEdit from './wang-edit.vue'
const props = defineProps<{
	placeholder: string
	modelValue: string
	minHeight?: string
}>()
const emit = defineEmits(['update:modelValue'])
const valueHtml = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})
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
		<wangEdit v-if="flag" v-model="valueHtml" :placeholder="props.placeholder" :onOnEditBlur="editBlur" :minHeight="props.minHeight"></wangEdit>
		<div
			v-else-if="valueHtml && valueHtml !== '<p><br></p>'"
			@click="onClick"
			class="cursor-pointer p-10px bg-[var(--color-fill-1)] w-100% h-42px overflow-y-auto scroll-bar rounded-5px"
			v-html="valueHtml"></div>
		<div @click="onClick" v-else class="cursor-pointer p-10px bg-[var(--color-fill-1)] w-100% h-42px overflow-y-auto scroll-bar rounded-5px text-[rgb(var(--gray-5))]">
			{{ props.placeholder }}
		</div>
	</div>
</template>
