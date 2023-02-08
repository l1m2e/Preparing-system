<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 富文本 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IToolbarConfig, IEditorConfig } from '@wangeditor/editor'
import { baseUrl } from '~/config/baseUrl'
import { useToken } from '~/composables'

const props = defineProps<{
	placeholder: string
	modelValue: string
}>()
const emit = defineEmits(['update:modelValue', 'onEditBlur'])

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

//聚焦焦点
const focus = () => {
	editorRef.value.focus()
}
defineExpose({ focus })

//失去焦点
const saveAction: any = inject('saveAction')
const getEditIMage: any = inject('getEditIMage')
watch(
	() => saveAction.value,
	(flag) => {
		if (flag) {
			console.log('保存按钮', flag)
			const temp = editorRef.value.getElemsByType('image').map((item: any) => item.src)
			console.log(temp + 'temp')
			getEditIMage(temp)
		}
	},
	{ deep: true }
)
const onBlur = async () => {
	emit('onEditBlur')
	// markImage(editImageList)
	// 	const temp = fileList.filter((item) => !editImageList.includes(item))
	// 	if (temp.length !== 0) {
	// 		console.log(temp, 'temp')
	// 		const res = await api.deleteFile(temp)
	// 		temp.forEach((item) => {
	// 			const index = fileList.findIndex((v) => v === item)
	// 			if (index !== -1) {
	// 				fileList.splice(index, 1)
	// 			}
	// 		})
	// 		console.log(res)
	// 		console.log(fileList)
	// 	}
}

//上传图片
// const fileList: Array<any> = [] // 上传的图片列表
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
		<Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" mode="simple" />
		<Editor class="richText-edit" v-model="valueHtml" :defaultConfig="editorConfig" mode="simple" @onCreated="handleCreated" @onBlur="onBlur" />
	</div>
</template>

<style scoped>
.richText-box {
	border-radius: 5px;
	box-shadow: 2px 2px 10px var(--color-border-2);
}
</style>
