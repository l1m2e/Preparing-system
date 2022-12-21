<template>
	<main font-sans>
		<router-view />
	</main>
</template>
<script setup>
import { baseUrl } from './config/baseUrl'
import { axios } from '~/service'
const model = import.meta.env.MODE === 'development' ? true : false
const getWebScoketBaseUrl = async () => {
	if (model) return // 若是开发模式不需要去请求ws的路径
	const res = await request.get(`${baseUrl.httpUrl}/common/address`)
	if (res.status === 200) {
		baseUrl.websocketUrl = res.data.websocketUrl
		console.log('[ baseUrl ] >', baseUrl)
	}
}
getWebScoketBaseUrl()
</script>
