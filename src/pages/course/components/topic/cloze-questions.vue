<script lang="ts" setup>
import wangEdit from '../editor/wang-edit.vue'
import wangEditShow from '../editor/wang-edit-show.vue'
import difficulty from './components/difficulty.vue'
import { changeTextToCN } from '~/utils'
import { useTopicSubmit, useGetImageSrcId, useMarkUseImage } from './composables/useTopic'

const topic = ref('') //题目富文本
const analysis = ref('') //答案解析富文本
const difficultyOptionsValue = ref(1) // 问题难度
const answerList = ref([{ text: '' }]) //问题列表
//添加答案
const addAnswer = () => {
	const obj = { text: '' }
	answerList.value.push(obj)
}
//删除答案
const deleteAnswer = (index: number) => {
	if (answerList.value.length <= 1) return Message.error('填空题必须保留一个空')
	answerList.value.splice(index, 1)
}

//重置
const reset = () => {
	topic.value = ''
	analysis.value = ''
	answerList.value.length = 1
	answerList.value[0].text = ''
}

//保存
const save = async () => {
	//判空
	if (topic.value === '' || topic.value === '<p><br></p>') {
		Message.error('题目不能为空')
		return false
	}
	if (answerList.value.some((item) => item.text === '')) {
		Message.error('请将所有空填写完整')
		return false
	}
	
	//保存编辑器中的图片
	const imageIdList = [...useGetImageSrcId(topic.value), ...useGetImageSrcId(analysis.value)]
	const markImgeRes = await useMarkUseImage(imageIdList)
	if (!markImgeRes) {
		Message.error('图片保存失败')
		return
	}

	//提交接口
	const answer = answerList.value.map((item) => item.text)
	const param = {
		analysis: analysis.value, // 答案解析
		answer: answer, //答案
		difficulty: difficultyOptionsValue.value, // 难度
		title: topic.value, //题目标题
		type: 2
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
	<div>
		<wang-edit v-model="topic" placeholder="请输入题目 每个填空请用____( 下划线 )表示"></wang-edit>
		<div class="m-auto mt10 flex options-item" v-for="(item, index) in answerList">
			<div class="min-w-70px center mr-10px">
				<a-button size="large" shape="circle">{{ index + 1 }}</a-button>
			</div>
			<div class="w-100%">
				<a-input size="large" :placeholder="`请输入第${changeTextToCN(index + 1)}个空的答案`" v-model="item.text"></a-input>
			</div>
			<div class="min-w-50px ml-10px center">
				<a-button shape="circle" status="danger" size="mini" class="delete-icon" @click="deleteAnswer(index)"><div class="i-ri-delete-bin-2-line"></div></a-button>
			</div>
		</div>
		<div class="center justify-start w-100% box-border mt-30px">
			<a-button @click="addAnswer" type="text">添加一个新的空</a-button>
		</div>
		<wangEditShow class="mt-20px" placeholder="请输入答案解析 非必填" v-model="analysis"></wangEditShow>

		<div class="mt-20px center justify-start">
			<span>难度：</span>
			<difficulty v-model="difficultyOptionsValue"></difficulty>
		</div>
	</div>
</template>

<style scoped>
.delete-icon {
	display: none;
	max-width: 30px;
}
.options-item:hover .delete-icon {
	display: flex;
}
.form:deep(.arco-form-item-label-col) {
	max-width: 30px;
	margin-left: 20px;
}
</style>
