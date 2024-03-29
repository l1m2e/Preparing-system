<script lang="ts" setup>
import { baseUrl } from '~/config/baseUrl'
import { useToken } from '~/composables'
import type { FileSrcVo } from '~/api/api'
import type { FileItem } from '@arco-design/web-vue'
import { Modal } from '@arco-design/web-vue'

const show = ref(false)

const params = {
	courseName: '',
	fid: '0'
}

const open = (courseName: string, fid: number) => {
	params.fid = fid === -1002 ? '0' : fid.toString()
	params.courseName = courseName
	show.value = true
}
defineExpose({ open })

const fileIdList = reactive<Array<string>>([])
const filelist = ref<Array<FileItem>>([])

//上传成功
const uploadSuccess = (fileItem: FileItem) => {
	const res: FileSrcVo = fileItem.response
	fileIdList.push(res.id)
}

const uploadError = (fileItem: FileItem) => {
	const res = fileItem.response
	Message.error(res.error)
}

const emit = defineEmits(['ok'])

const close = () => {
	const isDone = filelist.value.every((item) => item.status === 'done')
	if (isDone) return cleaFile()
	Modal.warning({
		title: '警告',
		content: `有文件在上传中,请移除文件或者等待上传完毕`
	})
}

// 清空
const cleaFile = () => {
	fileIdList.length = 0
	filelist.value.length = 0
	show.value = false
}

//删除文件
const beforeRemove = (file: FileItem): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		Modal.confirm({
			title: '警告',
			content: `确认删除 ${file.name}`,
			onOk: async () => {
				const id: undefined | number = file?.response[0]?.id

				if (id) {
					const res = await api.courseware.delCourseware([id])
					if (res.status === 200) {
						Message.success('删除成功')
					} else {
						Message.error('删除失败')
						resolve(false)
					}
				}
				resolve(true)
			},
			onCancel: () => reject('cancel')
		})
	})
}
</script>

<template>
	<a-modal :visible="show" title="上传文件" :width="700" :esc-to-close="false" :footer="false" @cancel="close" @before-close="emit('ok')">
		<a-upload
			v-model:file-list="filelist"
			:action="`${baseUrl.httpUrl}/teacherWeb/courseware/upload`"
			:headers="{ token: useToken }"
			:data="{ ...params }"
			@before-remove="beforeRemove"
			@success="uploadSuccess"
			@error="uploadError"
			draggable
			multiple
			name="files" />
	</a-modal>
</template>
