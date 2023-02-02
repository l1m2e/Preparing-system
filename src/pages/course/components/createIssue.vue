<script lang="ts" setup>
const show = ref(false)

const open = () => {
	show.value = true
}
defineExpose({ open })
setTimeout(() => {}, 5000)
</script>

<template>
	<a-drawer height="100" :visible="show" :header="false" :footer="false" :hide-cancel="false" placement="bottom">
		<a-button @click="show = false">关闭</a-button>
	</a-drawer>
</template>

<style scoped></style>
