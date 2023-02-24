<script lang="ts" setup>
import B from './B.vue'
import { useStore } from './store'
const { getList, listStore } = useStore()

getList()

const change = () => {
	console.log('%c%s', 'color: #7892f9', '父组件list', listStore.list)
}
</script>

<template>
	<h1>test</h1>
	<B @onChange="change()"></B>
	<div class="a" v-for="item in listStore.list">{{ item }}</div>
</template>

<style>
.box {
	width: 100px;
	height: 100px;
	background-color: #b673f5;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px;
}
</style>
