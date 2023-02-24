<script lang="ts" setup>
import { useStore } from './store'
const { getList, listStore } = useStore()
const fn = () => {
	console.log('%c%s', 'color: #7ce5ff', '子组件list', listStore.list)
}
</script>

<template>
	<a-button @click="getList(), $emit('onChange'), fn()">点我获取异步</a-button>
</template>

<style lang="scss"></style>
