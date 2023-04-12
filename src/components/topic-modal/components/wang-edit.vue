<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 富文本 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IToolbarConfig, IEditorConfig } from '@wangeditor/editor'
import { baseUrl } from '~/config/baseUrl'
import { useToken } from '~/composables'

interface Props {
	placeholder: string
	modelValue: string
	minHeight?: string
}
const props = withDefaults(defineProps<Props>(), {
	minHeight: '80'
})
const emit = defineEmits(['update:modelValue', 'onEditBlur'])

const minHeight = computed(() => props.minHeight + 'px')

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})
const editorConfig: Partial<IEditorConfig> = { placeholder: props.placeholder, MENU_CONF: {} }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value
	if (editor == null) return
	editor.destroy()
	console.log('销毁')
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
	'redo',
	'insertImage',
	'fullScreen'
]

//聚集焦点
const isFocus = ref<boolean>(false)
const onFocus = () => {
	editorRef.value.focus(true)
	isFocus.value = true
}
//失去焦点
const onBlur = async () => {
	isFocus.value = false
	emit('onEditBlur')
	console.log('失去焦点')
}
const borderColor = computed(() => (isFocus.value ? ' 1px solid rgb(var(--primary-6))' : ' 1px solid var(--color-border-2)'))
watch(borderColor, (n) => {
	console.log(n)
})
//上传图片
if (editorConfig.MENU_CONF) {
	editorConfig.MENU_CONF['uploadImage'] = {
		server: baseUrl.httpUrl + '/file/updateImage',
		headers: {
			token: useToken.value
		},
		//上传成功
		onSuccess(file: File, res: any) {
			console.log(`${file.name} 上传成功`, res)
			// fileList.push(res.data.url)
		},
		// 上传失败
		onFailed(file: File, res: any) {
			Message.error(`${file.name} 上传失败`)
		},
		// 上传错误，或者触发 timeout 超时
		onError(file: File, err: any, res: any) {
			Message.error(`${file.name} 上传出错 ${err}`)
		}
	}
}

//上传图片
</script>

<template>
	<div class="richText-box">
		<Toolbar class="richText-toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" mode="simple" />
		<Editor
			class="richText-edit"
			v-model="valueHtml"
			:defaultConfig="editorConfig"
			mode="simple"
			@onCreated="handleCreated"
			@onBlur="onBlur"
			@onFocus="onFocus" />
	</div>
</template>

<style scoped>
.richText-box {
	border-radius: 5px;
	border: v-bind(borderColor);
	transition: all 0.6s;
}
.richText-toolbar :deep(.w-e-bar) {
	border-radius: 5px 5px 0px 0px;
}
.richText-edit :deep(.w-e-text-container) {
	border-radius: 0px 0px 5px 5px;
	min-height: v-bind(minHeight);
}
</style>
