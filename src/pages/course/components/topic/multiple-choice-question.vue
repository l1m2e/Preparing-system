<script lang="ts" setup>
import wangEdit from '../editor/wang-edit.vue'
import wangEditShow from '../editor/wang-edit-show.vue'
import difficulty from './components/difficulty.vue'
import { useTopicSubmit, useGetImageSrcId, useMarkUseImage } from './composables/useTopic'

const props = defineProps<{
	type: '单选题' | '多选题'
}>()

let modalType = computed(() => (props.type === '单选题' ? true : false)) // true 为单选 false 为多选
const outline = ref('') // 提干
const answerResolution = ref('') //答案解析
const optionsLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
//字母集合
interface LetterOptions {
	unique: string
	isAnswer: boolean
}
interface textOptions {
	text: string
}
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
	letterList.value[index].isAnswer = false
}

//设置答案
const setAnswer = (index: number) => {
	if (modalType.value) {
		// 单选启用排他算法
		letterList.value.forEach((item) => {
			item.isAnswer = false
		})
	}
	letterList.value[index].isAnswer = !letterList.value[index].isAnswer
}

const difficultyOptionsValue = ref(1) //问题难度

// 获取编辑器中已用图片ID
const getUseImageId = () => {
	//图片id列表
	let imageIdList: Array<number> = []
	//获取提纲所有图片id & 获取答案解析里面所有图片id
	imageIdList = [...imageIdList, ...useGetImageSrcId(outline.value), ...useGetImageSrcId(answerResolution.value)]
	//获取单选项所有图片id
	optionsContentList.value.forEach((item) => {
		imageIdList = [...imageIdList, ...useGetImageSrcId(item.text)]
	})
	return imageIdList
}

//筛选出答案
const filterAnswer = () => {
	if (modalType.value) {
		//单选题筛选逻辑哦
		let index = letterList.value.findIndex((item) => item.isAnswer === true)
		if (index !== -1) {
			return [optionsLetter[index]]
		} else {
			return false
		}
	} else {
		//多选题筛选逻辑
		const answerList: Array<string> = []
		let indexList = letterList.value.map((item, index) => {
			if (item.isAnswer === true) {
				return index
			}
		})
		indexList.forEach((item) => {
			if (item) {
				answerList.push(optionsLetter[item])
			}
		})
		if (answerList.length === 0) return false
		return answerList
	}
}
//筛选出所有选项
const filterOptions = () => optionsList.value.map((item, index) => ({ unique: optionsLetter[index], text: item.text }))

//重置
const reset = () => {
	optionsIndex.value = 4
	outline.value = ''
	answerResolution.value = ''
	optionsContentList.value.forEach((item) => {
		console.log(item.text)
		item.text = ''
	})
	letterList.value.forEach((item) => {
		item.isAnswer = false
	})
}

//保存
const save = async () => {
	const answer = filterAnswer()
	const choices = filterOptions()
	const isOptionsContent = choices.find((item) => item.text === '' || item.text === '<p><br></p>')
	//判空
	if (!answer) {
		Message.error('您必须先选择一个答案')
		return false
	}
	if (!outline.value) {
		Message.error('您必须填写问题题目')
		return false
	}
	if (isOptionsContent) {
		Message.error('请填写全部选项内容')
		return false
	}

	//保存图片
	const markImgeRes = await useMarkUseImage(getUseImageId())
	if (!markImgeRes) {
		Message.error('图片保存失败')
		return
	}

	//提交接口
	const param = {
		analysis: answerResolution.value, // 答案解析
		answer, //答案
		choices, // 选项数组
		difficulty: difficultyOptionsValue.value, // 难度
		fid: -1, // 题库id
		share_flag: false, //是否共享
		title: outline.value, //题目标题
		type: modalType.value ? 1 : 5 // 题目类型 1单选 5多选
	}
	const submitRes = await useTopicSubmit(param)

	if (submitRes.isSuccess) {
		Message.success(submitRes.message)
		reset()
		return true
	} else {
		Message.error(submitRes.message)
		return false
	}
}
defineExpose({ reset, save })
</script>

<template>
	<!-- 内容 -->
	<div class="h-700px overflow-y-auto overflow-x-hidden py-20px box-border scroll-bar">
		<div class="w-90% m-auto">
			<wangEdit min-height="50" placeholder="请输入题目" v-model="outline"></wangEdit>
		</div>
		<div class="w-90% m-auto">
			<div class="m-auto mt-10 flex options-item" v-for="(item, index) in optionsList">
				<div class="min-w-70px center mr-10px">
					<a-tooltip :content="`${modalType ? '设为答案' : letterList[index].isAnswer ? '取消' : '设为答案'}`" position="left" mini>
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
				<difficulty v-model="difficultyOptionsValue"></difficulty>
			</div>
		</div>
	</div>
</template>

<style scoped>
.delete-icon {
	display: none;
}
.options-item:hover .delete-icon {
	display: flex;
}
</style>
