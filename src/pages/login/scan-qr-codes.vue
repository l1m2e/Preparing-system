<script lang="ts" setup>
import { useLoginQrCode, useloginIo, useGetLoginQrCode } from '~/composables/useLogin'
onMounted(() => {
	useGetLoginQrCode()
})
onUnmounted(() => {
	useloginIo.disconnect()
	console.log('主动断开')
})
</script>

<template>
	<div class="bg flex center">
		<div class="w-450px h-600px bg-white rounded-xl shadow-2xl">
			<a-skeleton v-if="!useLoginQrCode" :animation="true" class="center flex-col">
				<a-skeleton-shape shape="circle" size="large" />
				<a-space direction="vertical" class="mt-40px m-auto w-80%" size="large">
					<a-skeleton-line :rows="2" :line-height="50" />
				</a-space>
			</a-skeleton>
			<div v-else>
				<img :src="`data:image/jpg;base64,${useLoginQrCode}`" class="w-300px h-300px mt-50px m-auto" />
				<h1 class="text-center mt-40px color-gray6">请使用手机微信扫码登录</h1>
				<h1 class="text-center mt-30px text-20px color-gray">备课系统需要配合手机微信使用</h1>
			</div>
		</div>
	</div>
</template>

<style scoped>
.bg {
	width: 100vw;
	height: 100vh;
	background: url(//res.wx.qq.com/t/wx_fed/webwx/res/static/img/2zrdI1g.jpg) no-repeat 50%;
	background-size: cover;
}
.bg :deep(.arco-skeleton-shape-large) {
	width: 300px;
	height: 300px;
	margin: 0 auto;
	margin-top: 50px;
}
</style>
