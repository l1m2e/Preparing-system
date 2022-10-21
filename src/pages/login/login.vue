<script lang="ts" setup>
import { getUuid } from '~/utils'

const loginQrCode = ref()
const getLoginQrCode = async () => {
	const res = await api.getLoginQRcode(getUuid().replace(/-/g, ''))
	if (res.status === 200) {
		loginQrCode.value = res.data.data
	}
}
getLoginQrCode()
</script>

<template>
	<div class="bg flex center">
		<div class="w-450px h-600px bg-white rounded-xl shadow-2xl">
			<a-skeleton v-if="!loginQrCode" :animation="true">
				<a-skeleton-shape shape="circle" size="large" />
			</a-skeleton>
			<img :src="`data:image/jpg;base64,${loginQrCode}`" class="w-300px h-300px mt-50px m-auto" v-else />
			<h1 class="text-center mt-40px">请使用手机微信扫码登录</h1>
			<h1 class="text-center mt-30px text-20px color-gray">备课系统需要配合手机微信使用</h1>
		</div>
	</div>
</template>

<style scoped>
.bg {
	width: 100vw;
	height: 100vh;
	/* background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%); */
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
