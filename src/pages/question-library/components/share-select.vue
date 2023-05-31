<script lang="ts" setup>
import type { File } from '~/components/file-manager/interface'

const emits = defineEmits<{
	ok: [{ id: number; share: number }]
}>()

const show = ref(false)

let fileId: number | undefined = undefined

const open = (file: File) => {
	show.value = true
	fileId = file.id
}

defineExpose({ open })

const save = async (share: number) => {
	if (!fileId) return Message.error('没有选中文件,请尝试重新打开')
	const res = await api.issueBank.shareBatchQuestion({
		ids: [fileId],
		share
	})
	if (res.status === 200) {
		Message.success('修改成功')
		emits('ok', { id: fileId, share })
		show.value = false
	} else {
		Message.error('共享失败')
	}
}
</script>

<template>
	<div>
		<div class="fixed top-0 left-0 right-0 bottom-0 bg-dark-1 z-998 opacity-30" v-if="show" @click="show = false"></div>
		<Transition enter-active-class="animated-zoom-in" leave-active-class="animated-zoom-out" class="animated animated-faster" mode="out-in">
			<div
				class="box-border rounded mt-10px bg-[var(--color-bg-2)] p-10px z-999 fixed w-500px left-[calc(50%-250px)] h-200px top-[calc(50%-100px)]"
				v-if="show">
				<p class="text-center py-35px text-18px text-gray6 dark:text-white">请选择分享的区域</p>
				<div class="flex justify-between px-10px">
					<div class="btn p-15px w-210px text-center text-16px" @click="save(1)">拥有该科目的老师可见</div>
					<div class="btn p-15px w-210px text-center text-16px" @click="save(2)">全校可见</div>
				</div>
			</div>
		</Transition>
	</div>
</template>
