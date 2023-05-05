<script lang="ts" setup>
import { useAutoChangGridLayout } from '~/composables'
const gridboxRef = ref()
onMounted(() => {
	useAutoChangGridLayout(gridboxRef, 150, 30)
})
</script>

<template>
	<div class="grid w-100% grid-cols-[repeat(auto-fit,minmax(150px,max-content))] gap-10px" ref="gridboxRef">
		<div class="bg-red w-100px h-100px" v-for="item in 30">{{ item }}</div>
	</div>
</template>

<style>
.uno {
	-uno: w-100px h-100px bg-red;
}
</style>
