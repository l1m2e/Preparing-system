<script lang="ts" setup>
import { baseUrl } from '~/config/baseUrl'
import { useToken } from '~/composables'
import type { FileSrcVo } from '~/api/api'
import type { FileItem } from '@arco-design/web-vue'
import { Modal } from '@arco-design/web-vue'

const show = ref(false)

const open = () => {
	show.value = true
}
defineExpose({ open })

const fileIdList = reactive<Array<number>>([])

const uploadSuccess = (fileItem: FileItem) => {
	const res: FileSrcVo = fileItem.response
	fileIdList.push(res.id)
}

const emits = defineEmits(['ok'])

const ok = () => {
	emits('ok', fileIdList)
	fileIdList.length = 0
	show.value = false
}

const beforeRemove = (file: FileItem): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		Modal.confirm({
			title: '警告',
			content: `确认删除 ${file.name}`,
			onOk: () => {
				const index = fileIdList.findIndex((item: number) => item === file.response)
				fileIdList.splice(index, 1)
				resolve(true)
			},
			onCancel: () => reject('cancel')
		})
	})
}
</script>

<template>
	<a-modal :visible="show" title="上传文件" :width="700" :closable="false" :mask-closable="false" :esc-to-close="false" :footer="false">
		<a-upload
			:action="`${baseUrl.httpUrl}/file/updateFile/0`"
			:headers="{ token: useToken }"
			@before-remove="beforeRemove"
			@success="uploadSuccess"
			draggable
			multiple />
		<!-- 底部 -->
		<footer class="w-100% flex justify-end mt-10px">
			<a-button class="mr-10px" @click="show = false">取消</a-button>
			<a-button type="primary" @click="ok">确定</a-button>
		</footer>
	</a-modal>
</template>
