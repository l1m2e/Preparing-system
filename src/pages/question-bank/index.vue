<script lang="ts" setup>
import fileManager from '~/components/file-manager/file-manager.vue'
</script>

<template>
	<div class="text-20px">问题库管理</div>
	<div :bordered="false" class="p-10px box-border h-85vh rounded mt-10px bg-[var(--color-bg-2)]">
		<fileManager></fileManager>
	</div>
</template>

<style lang="scss"></style>
