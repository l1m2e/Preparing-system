<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
import wangEdit from './wang-edit.vue'
import wangEditShow from './wang-edit-show.vue'
const show = ref(false)
//将打开对话框的open函数暴露出去
const open = () => {
	show.value = true
}
defineExpose({ open })

//对话框关闭之前 询问用户是否需要保存 如果取消保存 重置表单
const beforeClose = () => {
	Modal.info({
		title: '提示',
		content: '题目暂未保存，确定取消保存？',
		hideCancel: false,
		onOk() {
			show.value = false
			reset()
		}
	})
}

// 提干
const outline = ref('')

interface LetterOptions {
	unique: string
	isAnswer: boolean
}
interface textOptions {
	text: string
}
const optionsLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
//字母集合
const letterList = ref<Array<LetterOptions>>([])
optionsLetter.forEach((item: string) => {
	letterList.value.push({ unique: item, isAnswer: false })
})

//内容集合
const optionsContentList = ref<Array<textOptions>>([])
for (let i = 0; i <= optionsLetter.length + 1; i++) {
	optionsContentList.value.push({ text: '' })
}

//动态计算 选项集合
let optionsIndex = ref(4)
const optionsList = computed(() => optionsContentList.value.slice(0, optionsIndex.value))

//添加一个选项
const addOptions = () => {
	if (optionsIndex.value >= 26) return Message.error('最多只能添加26个选项')
	optionsIndex.value++
}

//删除选项
const deleteOptions = (index: number) => {
	optionsIndex.value--
	optionsContentList.value.splice(index, 1)
}

//设置答案
const setAnswer = (index: number) => {
	letterList.value.forEach((item) => {
		item.isAnswer = false
	})
	letterList.value[index].isAnswer = true
}

//重置
const reset = () => {
	optionsIndex.value = 4
	outline.value = ''
	optionsContentList.value.forEach((item) => {
		console.log(item.text)
		item.text = ''
	})
	letterList.value.forEach((item) => {
		item.isAnswer = false
	})
}

//记录编辑器内部图片
let saveAction = ref(false)
let markImageList: Array<string> = []
provide('saveAction', saveAction)
provide('getEditIMage', (data: Array<string>) => {
	markImageList = [...markImageList, ...data]
	console.log('data', data)
	saveAction.value = false
})

const getImageSrc = (richText: string): Array<string> => {
	let regexp = /<img [^>]*src=['"]([^'"]+)[^>]*>/g
	richText.replace(regexp, (match, capture) => {
		console.log(capture)
	})
	// richText.replace(regexp,)
	return []
}
//保存
const saveButton = () => {
	saveAction.value = true
	// show.value = false
	console.log(optionsContentList.value)
	optionsContentList.value.forEach((item) => {
		getImageSrc(item.text)
	})
}

// 获取富文本里面的全部src
// const getImgSrc = (rich: any) => {
// 	let imgList: Array<string> = []
// 	htmlstr.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
// 		imgList.push(capture)
// 	})
// 	return imgList
// }
</script>

<template>
	<a-modal :width="1200" :visible="show" title="添加单选题" okText="保存" cancelText="取消" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<!-- 内容 -->
		<a-scrollbar class="h-700px overflow-y-auto py-20px box-border">
			<div class="w-90% m-auto">
				<wangEdit placeholder="请输入题干" v-model="outline"></wangEdit>
			</div>
			<div class="w-90% m-auto mt-10 flex options-item" v-for="(item, index) in optionsList">
				<div class="min-w-70px center mr-10px">
					<a-button shape="circle" :type="letterList[index].isAnswer ? 'primary' : 'secondary'" size="large" @click="setAnswer(index)">
						{{ letterList[index].unique }}
					</a-button>
				</div>
				<div class="w-100%">
					<wangEditShow placeholder="请输入答案" v-model="item.text"></wangEditShow>
				</div>
				<div class="min-w-50px ml-10px center">
					<a-button shape="circle" status="danger" size="mini" class="delete-icon" @click="deleteOptions(index)"><div class="i-ri-delete-bin-2-line"></div></a-button>
				</div>
			</div>
			<div class="center w-100% mt-30px">
				<a-button @click="addOptions">添加一个新的选项</a-button>
			</div>
		</a-scrollbar>

		<!-- 底部 -->
		<div class="center justify-end mt-20px">
			<a-button class="mr-10px" @click="beforeClose">取消</a-button>
			<a-button @click="saveButton" type="primary">保存</a-button>
		</div>
	</a-modal>
</template>

<style scoped>
.delete-icon {
	display: none;
}
.options-item:hover .delete-icon {
	display: flex;
}
</style>
