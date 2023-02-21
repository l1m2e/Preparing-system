<script lang="ts" setup>
import fileManager from '~/components/file-manager/file-manager.vue'
</script>

<template>
	<div class="text-20px">问题库管理</div>
	<div :bordered="false" class="p-10px box-border h-850px rounded mt-10px bg-[var(--color-bg-2)] select-none">
		<fileManager></fileManager>
	</div>
</template>

<style></style>
