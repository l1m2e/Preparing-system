<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
import wangEdit from './wang-edit.vue'
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
// const set
</script>

<template>
	<a-modal :width="1200" :visible="show" title="添加单选题" okText="保存" cancelText="取消" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<!-- 内容 -->
		<a-scrollbar class="h-700px overflow-y-auto py-20px box-border">
			<div class="w-90% m-auto">
				<wangEdit placeholder="请输入题干" v-model="outline"></wangEdit>
			</div>
			<div class="w-90% m-auto mt-10 flex" v-for="(item, index) in optionsList">
				<div class="min-w-70px center mr-10px">
					<div class="w-50px h-50px rounded-full bg-red center">{{ letterList[index].unique }}</div>
				</div>
				<div class="w-100%">
					<wangEdit placeholder="请输入答案" v-model="item.text"></wangEdit>
				</div>
				<div class="min-w-50px ml-10px center">
					<a-button shape="circle" status="danger" @click="deleteOptions(index)"><div class="i-ri-delete-bin-2-line text-18px"></div></a-button>
				</div>
			</div>
			<div class="center w-100% mt-30px">
				<a-button @click="addOptions">添加一个新的选项</a-button>
			</div>
		</a-scrollbar>

		<!-- 底部 -->
		<div class="center justify-end">
			<a-button class="mr-10px" @click="beforeClose">取消</a-button>
			<a-button @click="show = false" type="primary">保存</a-button>
		</div>
	</a-modal>
</template>

<style scoped></style>
