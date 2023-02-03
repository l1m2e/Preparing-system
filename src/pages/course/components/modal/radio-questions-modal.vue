<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 富文本 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IToolbarConfig } from '@wangeditor/editor'

const show = ref(false)
//将打开对话框的open函数暴露出去
const open = () => {
	show.value = true
}
defineExpose({ open })
//对话框关闭之前
const beforeClose = () => {
	Modal.info({
		title: '提示',
		content: '题目暂未保存，确定取消保存？',
		hideCancel: false,
		onOk() {
			show.value = false
		}
	})
}

// 富文本
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
	setTimeout(() => {
		valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
	}, 1500)
})

const editorConfig = { placeholder: '请输入内容...' }

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
toolbarConfig.excludeKeys = ['blockquote', 'header1', 'header2', 'header3', '|', 'bold', 'underline', 'italic', 'through', 'clearStyle', 'insertLink', 'insertVideo', 'codeBlock']
</script>

<template>
	<a-modal :visible="show" title="添加单选题" width="auto" okText="保存" cancelText="取消" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<!-- 内容 -->
		<div class="w-1000px h-500px">
			<div style="border: 1px solid #ccc">
				<Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="simple" />
				<Editor style="height: 100px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" mode="simple" @onCreated="handleCreated" />
			</div>
		</div>
		<!-- 底部 -->
		<div class="center justify-end">
			<a-button class="mr-10px" @click="beforeClose">取消</a-button>
			<a-button @click="show = false" type="primary">保存</a-button>
		</div>
	</a-modal>
</template>

<style scoped></style>
