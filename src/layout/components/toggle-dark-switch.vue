<script lang="ts" setup>
const flag = ref(isDark.value)
</script>

<template>
	<a-switch class="mr-40px" v-model="flag" size="medium" checked-color="#434344" @click="toggleDark()">
		<template #checked-icon>
			<div i-carbon:moon class="w-12px h-12px color-white"></div>
		</template>
		<template #unchecked-icon>
			<div i-carbon:sun class="w-12px h12px color-black"></div>
		</template>
	</a-switch>
</template>

<style scoped>
:deep(.arco-switch-handle) {
	background-color: var(--color-bg-5);
}
</style>
