<script lang="ts" setup>
import dayjs from 'dayjs'

const fileList = reactive<any>([])

for (let i = 0; i <= 2; i++) {
	const obj = {
		fileName: `文件${i}`,
		id: i,
		fid: 0,
		type: true,
		createdTimestamp: dayjs().valueOf()
	}
	fileList.push(obj)
}

const fn = (data) => {
	console.log(data)
}
</script>

<template>
	<div mt-100px w-80vw m-auto>
		<a-card>
			<div h-80vh>
				<FileManger :file-list="fileList" @open="fn"></FileManger>
			</div>
		</a-card>
	</div>
</template>
