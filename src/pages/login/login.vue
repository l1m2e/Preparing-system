<script lang="ts" setup>
// import loginbg from '~/assets/img/login-bg.svg'
// import { loginApi, getAccessMenuApi, registerApi } from '~/api'
// import { useMenuStore, useUserStore } from '~/store'
// import { adminRoutes } from '~/router/modules/admin'
import router from '~/router'

const flag = ref(true)
//登陆表单
const form = reactive({
	uid: '',
	password: ''
})

const registerForm = reactive({
	uid: '',
	name: '',
	password: '',
	phone: '',
	info: '',
	repassword: ''
})

const scanQRcodesLogin = () => {
	router.push('/scan-qr-login')
}
</script>

<template>
	<div w-100vw h100vh flex>
		<div flex-1 overflow-hidden center bg="#4c5775">
			<!-- <img w="60%" h="60%" :src="" alt="" /> -->
		</div>
		<div flex-1 bg="[var(--color-fill-1)]" center>
			<div v-if="flag" bg="[var(--color-bg-1)]" w-420px h-540px rounded-4 border="#6777ef t-16">
				<h1 font-700 color="[var(--color-text-1)]" text-8 mt-10 text-center>登录</h1>
				<a-form :model="form" layout="vertical" p-5>
					<a-form-item field="name" label="工号">
						<a-input v-model="form.uid" size="large" placeholder="请输入工号">
							<template #prefix>
								<div i-carbon:user text-4 />
							</template>
						</a-input>
					</a-form-item>
					<a-form-item field="password" label="密码" mt-3>
						<a-input-password v-model="form.password" size="large" placeholder="请输入密码">
							<template #prefix>
								<div i-carbon:password text-4 />
							</template>
						</a-input-password>
					</a-form-item>
					<a-form-item>
						<div w="100%" h="100%" center>
							<div class="button" @click="">登录</div>
						</div>
					</a-form-item>
				</a-form>
				<p color-warmgray text-center>
					还没有账号？
					<a-link @click="flag = false">👉马上注册</a-link>
				</p>
				<p color-warmgray text-center mt-10px>
					使用小程序扫码登录？
					<a-link @click="scanQRcodesLogin">去登录</a-link>
				</p>
			</div>
			<div v-else bg="[var(--color-bg-1)]" w-550px h-800px rounded-4 border="#6777ef t-16" p-5>
				<p font-700 color="#6777ef" text-5 mt-5>注册</p>
				<a-form :model="registerForm" layout="vertical" p-5>
					<a-form-item field="name" label="昵称" mt-2>
						<a-input v-model="registerForm.name" size="large" placeholder="请输入教师姓名">
							<template #prefix>
								<div i-carbon:user text-4 />
							</template>
						</a-input>
					</a-form-item>
					<a-form-item field="uid" label="工号" mt-2>
						<a-input v-model="registerForm.uid" size="large" placeholder="请输入教师工号">
							<template #prefix>
								<div i-carbon:account text-4 />
							</template>
						</a-input>
					</a-form-item>
					<a-form-item field="password" label="密码">
						<a-input-password v-model="registerForm.password" size="large" placeholder="请输入密码">
							<template #prefix>
								<div i-carbon:password text-4 />
							</template>
						</a-input-password>
					</a-form-item>
					<a-form-item field="password" label="确认密码">
						<a-input-password v-model="registerForm.repassword" size="large" placeholder="请确认密码">
							<template #prefix>
								<div i-carbon:password text-4 />
							</template>
						</a-input-password>
					</a-form-item>
					<a-form-item>
						<div w="100%" h="100%" center>
							<div class="button" @click="">立即注册</div>
						</div>
					</a-form-item>
				</a-form>
				<p color-warmgray text-center>
					已经有账号了？
					<a-link @click="flag = true">👉马上登录</a-link>
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.button {
  --at-apply: w-280px h-50px bg-#6777ef mt-5 rounded center color-#ffffff hover:bg-#4e59ad;
  box-shadow: 0 0 20px #6777ef56;
  transition: all 0.6s;
}
</style>
