<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 富文本 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IToolbarConfig } from '@wangeditor/editor'

const props = defineProps<{
	placeholder: string
	modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})
const editorConfig = { placeholder: props.placeholder }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value
	if (editor == null) return
	editor.destroy()
})

const handleCreated = (editor: any) => {
	editorRef.value = editor // 记录 editor 实例，重要！
}

//工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {}
toolbarConfig.excludeKeys = [
	'blockquote',
	'header1',
	'header2',
	'header3',
	'|',
	'bold',
	'underline',
	'italic',
	'through',
	'clearStyle',
	'insertLink',
	'insertVideo',
	'codeBlock',
	'numberedList',
	'undo',
	'redo'
]
</script>

<template>
	<div class="richText-box">
		<Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" mode="simple" />
		<Editor class="richText-edit" v-model="valueHtml" :defaultConfig="editorConfig" mode="simple" @onCreated="handleCreated" />
	</div>
</template>

<style scoped>
.richText-box {
	/* border: 1px solid var(--color-border-2); */
	border-radius: 5px;
	/* overflow: hidden; */
	box-shadow: 0px 0px 5px var(--color-border-2);
}
</style>
