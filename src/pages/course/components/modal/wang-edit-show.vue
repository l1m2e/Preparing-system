<script lang="ts" setup>
import wangEdit from './wang-edit.vue'
const props = defineProps<{
	placeholder: string
	modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])
const valueHtml = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})
const flag = ref(false)
const wangEditRef = ref()
const onClick = () => {
	flag.value = true
	wangEditRef.value.focus()
}
//编辑器失去焦点
const editBlur = () => {
	flag.value = false
}
</script>

<template>
	<div ref="wangEditRef">
		<wangEdit v-if="flag" v-model="valueHtml" :placeholder="props.placeholder" :onOnEditBlur="editBlur"></wangEdit>
		<div v-else @click="onClick" class="p-10px w-100% h-45px border-1 border-[var(--color-border-2)] overflow-y-auto show-box" v-html="valueHtml"></div>
	</div>
</template>

<style scoped>
.show-box::-webkit-scrollbar {
	width: 8px;
	background: #00000000;
}

.show-box::-webkit-scrollbar-thumb {
	background: #00000000;
	border-radius: 4px;
}
.show-box:hover::-webkit-scrollbar {
	background: var(--color-fill-1);
}
.show-box:hover::-webkit-scrollbar-thumb {
	background: var(--color-fill-4);
}
</style>
