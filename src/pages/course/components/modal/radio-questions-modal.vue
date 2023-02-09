<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue'
import wangEdit from '../editor/wang-edit.vue'
import wangEditShow from '../editor/wang-edit-show.vue'
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

const outline = ref('') // 提干
const answerResolution = ref('') //答案解析
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

// 问题难度
const options = [
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
const difficulty = ref(1)

// 获取富文本里面的图片id
const getImageSrcId = (richText: string): Array<number> => {
	const temp: Array<number> = []
	let regexp = /<img [^>]*src=['"]([^'"]+)[^>]*>/g
	richText.replace(regexp, (match, capture) => {
		let index = capture.lastIndexOf('/')
		if (index !== -1) {
			temp.push(parseInt(capture.slice(index + 1)))
		}
		return capture
	})
	return temp
}
// 获取编辑器中已用图片ID
const getUseImageId = () => {
	//图片id列表
	let imageIdList: Array<number> = []
	//获取提纲所有图片id && 获取答案解析里面所有图片id
	imageIdList = [...imageIdList, ...getImageSrcId(outline.value), ...getImageSrcId(answerResolution.value)]
	//获取单选项所有图片id
	optionsContentList.value.forEach((item) => {
		imageIdList = [...imageIdList, ...getImageSrcId(item.text)]
	})
	return imageIdList
}
// 标记编辑器中使用了的图片
const markUseImage = async () => {
	const imageIdList = getUseImageId()
	if (imageIdList.length === 0) return
	const res = await api.markUseImage(imageIdList)
	if (res.status !== 200) {
		Message.error('保存编辑器图片失败')
	}
}

//提交
const submit = async () => {
	const answer = filterAnswer()
	const param = {
		analysis: answerResolution.value, // 答案解析
		answer: [answer],
		choices: [
			{
				unique: 'A',
				text: '选项'
			}
		],
		difficulty: difficulty.value,
		fid: -1,
		share_flag: true,
		srcId: [],
		title: outline.value,
		type: 1
	}
}

//筛选出答案
const filterAnswer = () => {
	let index = letterList.value.findIndex((item) => item.isAnswer === true)
	if (index !== -1) {
		return optionsLetter[index]
	} else {
		Message.error('您必须选择一个答案')
		return ''
	}
}
//保存
const saveButton = () => {
	markUseImage()
	submit()
	console.log(optionsContentList)
}

//提交
</script>

<template>
	<a-modal :width="1200" :visible="show" title="添加单选题" okText="保存" cancelText="取消" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<!-- 内容 -->
		<div class="h-700px overflow-y-auto overflow-x-hidden py-20px box-border scroll-bar">
			<div class="w-90% m-auto">
				<wangEdit min-height="50" placeholder="请输入题干" v-model="outline"></wangEdit>
			</div>
			<div class="w-90% m-auto">
				<div class="m-auto mt-10 flex options-item" v-for="(item, index) in optionsList">
					<div class="min-w-70px center mr-10px">
						<a-tooltip content="设为答案" position="left" mini>
							<a-button shape="circle" :type="letterList[index].isAnswer ? 'primary' : 'secondary'" size="large" @click="setAnswer(index)">
								{{ letterList[index].unique }}
							</a-button>
						</a-tooltip>
					</div>
					<div class="w-100%">
						<wangEditShow placeholder="请输入答案选项内容" v-model="item.text"></wangEditShow>
					</div>
					<div class="min-w-50px ml-10px center">
						<a-button shape="circle" status="danger" size="mini" class="delete-icon" @click="deleteOptions(index)"><div class="i-ri-delete-bin-2-line"></div></a-button>
					</div>
				</div>
				<div class="center justify-start w-100% mt-30px box-border">
					<a-button @click="addOptions" type="text">添加一个新的选项</a-button>
				</div>
				<a-divider dashed />
				<div class="w-100%">
					<wangEditShow placeholder="答案解析" v-model="answerResolution"></wangEditShow>
				</div>
				<div class="mt-20px center justify-start">
					<span>难度：</span>
					<a-select class="max-w-200px" :default-value="1" v-model="difficulty" :options="options"></a-select>
				</div>
			</div>
		</div>

		<!-- 底部 -->
		<div class="center justify-end mt-30px">
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
