<script lang="ts" setup>
// import { resetTopicStore } from '~/store/topicStore'
import { useTopicSubmit, useGetImageSrcId, useMarkUseImage } from '../composables/useTopic'
import { topicStore, resetTopicStore } from '../store'

const props = defineProps<{
	type: '单选题' | '多选题'
}>()

let modalType = computed(() => (props.type === '单选题' ? true : false)) // true 为单选 false 为多选

//添加一个选项
const optionLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const addOptions = () => {
	if (topicStore.optionList.length >= 26) return Message.error('最多只能添加26个选项')
	topicStore.optionList.push({
		text: '',
		isAnswer: false,
		unique: optionLetter.charAt(topicStore.optionList.length)
	})
}

//删除选项
const deleteOptions = (index: number) => {
	topicStore.optionList.splice(index, 1)
	for (let i = 0; i < topicStore.optionList.length; i++) {
		topicStore.optionList[i].unique = optionLetter[i]
	}
}

//设置答案
const setAnswer = (index: number) => {
	if (modalType.value) {
		// 单选启用排他算法
		topicStore.optionList.forEach((item) => {
			item.isAnswer = false
		})
	}
	topicStore.optionList[index].isAnswer = !topicStore.optionList[index].isAnswer
}

// 获取编辑器中已用图片ID
const getUseImageId = () => {
	//图片id列表
	let imageIdList: Array<number> = []
	//获取提纲所有图片id & 获取答案解析里面所有图片id
	imageIdList = [...imageIdList, ...useGetImageSrcId(topicStore.title), ...useGetImageSrcId(topicStore.analysis)]
	//获取单选项所有图片id
	topicStore.optionList.forEach((item) => {
		imageIdList = [...imageIdList, ...useGetImageSrcId(item.text)]
	})
	return imageIdList
}

//筛选出答案
const filterAnswer = () => {
	if (modalType.value) {
		//单选题筛选逻辑
		let res = topicStore.optionList.find((item) => item.isAnswer === true)
		return res ? [res.text] : []
	} else {
		return topicStore.optionList.filter((item) => item.isAnswer === true).map((item) => item.text)
	}
}

//重置
const reset = () => {
	resetTopicStore()
}

//保存
const save = async () => {
	//判空
	if (!topicStore.title) {
		Message.error('您必须填写问题题目')
		return false
	}

	const answer = filterAnswer()
	if (!answer) {
		Message.error('您必须先选择一个答案')
		return false
	}

	const isOptionsContent = topicStore.optionList.find((item) => item.text === '' || item.text === '<p><br></p>')
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

	const choices = topicStore.optionList.map((item) => {
		const { isAnswer, ...res } = item
		return res
	})

	//提交接口
	const param = {
		analysis: topicStore.analysis, // 答案解析
		answer, //答案
		choices, // 选项数组
		difficulty: topicStore.difficulty, // 难度
		fid: -1, // 题库id
		share_flag: false, //是否共享
		title: topicStore.title, //题目标题
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
			<wang-edit min-height="50" placeholder="请输入题目" v-model="topicStore.title"></wang-edit>
		</div>
		<div class="w-90% m-auto">
			<div class="m-auto mt-10 flex options-item" v-for="(item, index) in topicStore.optionList">
				<div class="min-w-70px center mr-10px">
					<a-tooltip :content="`${modalType ? '设为答案' : item.isAnswer ? '取消' : '设为答案'}`" position="left" mini>
						<a-button shape="circle" :type="item.isAnswer ? 'primary' : 'secondary'" size="large" @click="setAnswer(index)">
							{{ item.unique }}
						</a-button>
					</a-tooltip>
				</div>
				<div class="w-100%">
					<wang-edit-show placeholder="请输入答案选项内容" v-model="item.text"></wang-edit-show>
				</div>
				<div class="min-w-50px ml-10px center">
					<a-button shape="circle" status="danger" size="mini" class="delete-icon" @click="deleteOptions(index)">
						<div class="i-ri-delete-bin-2-line"></div>
					</a-button>
				</div>
			</div>
			<div class="center justify-start w-100% mt-30px box-border">
				<a-button @click="addOptions" type="text">添加一个新的选项</a-button>
			</div>
			<a-divider dashed />
			<div class="w-100%">
				<wang-edit-show placeholder="答案解析" v-model="topicStore.analysis"></wang-edit-show>
			</div>
			<div class="mt-20px center justify-start">
				<span>难度：</span>
				<difficulty v-model="topicStore.difficulty"></difficulty>
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
