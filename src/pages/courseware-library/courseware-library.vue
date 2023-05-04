<script lang="ts" setup>
import UploadModal from './components/upload-modal.vue'

const uploadModalRef = ref()
</script>

<template>
	<div class="p-10px box-border rounded mt-10px bg-[var(--color-bg-2)] select-none">
		<header>
			<div class="btn p-y-10px rounded-xl bg-blue-5 hover:bg-blue-4" @click="uploadModalRef.open()">上传文件</div>
		</header>
	</div>
	<UploadModal ref="uploadModalRef" />
</template>
