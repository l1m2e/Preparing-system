<script lang="ts" setup>
import UploadModal from './components/upload-modal.vue'

// 上传文件
const uploadModalRef = ref()

const uploadSuccess = (fileIdList: Array<number>) => {
	console.log(fileIdList)
}

// 获取本学期的科目列表
const getCourse = async () => {
	const res = await api.courseTable.getCourseNameBySemester()
	console.log(res.data)
}
getCourse()

const isMe = ref(true)
</script>

<template>
	<div>
		<div class="box-border rounded mt-10px bg-[var(--color-bg-2)] select-none p-10px">
			<header class="flex justify-between items-center">
				<div class="btn p-y-10px rounded-xl bg-blue-5 hover:bg-blue-4" @click="uploadModalRef.open()">上传文件</div>
				<div>
					<a-radio-group type="button" size="large" v-model="isMe">
						<a-radio :value="true">我的课件库</a-radio>
						<a-radio :value="false">共享课件库</a-radio>
					</a-radio-group>
				</div>
			</header>
			<main>
				<div class="h-80vh w-100%" ref="coursewareRef"></div>
			</main>
		</div>
		<UploadModal ref="uploadModalRef" @ok="uploadSuccess" />
	</div>
</template>