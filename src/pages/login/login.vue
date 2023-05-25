<script lang="ts" setup>
import router from '~/router'
import { useToken, useGetUserInfo, useUserInfo } from '~/composables'
import { pick } from '~/utils'
const flag = ref(true)
//登陆表单
const form = reactive({
	jobNum: 'P1000100',
	password: '123456'
})

const login = async () => {
	if (form.jobNum && form.password) {
		const res = await api.login.login(form)
		if (res.status === 200) {
			useToken.value = res.data.message
			router.push('/course/list')
			await useGetUserInfo()
			Message.success(`欢迎回来 ${useUserInfo.value.schoolUser.studentName}`)
		} else if (res.status === 400) {
			Message.error('账号或者密码错误')
		}
	} else {
		Message.error('账号或者密码不能为空')
	}
}

const registerForm = reactive({
	studentId: '',
	studentName: '',
	password: '',
	repassword: ''
})

const register = async () => {
	if (!registerForm.studentId) return Message.error('工号不能为空')
	if (!registerForm.studentName) return Message.error('昵称不能为空')
	if (!registerForm.password) return Message.error('密码不能为空')
	if (!registerForm.repassword) return Message.error('请输入确认密码')
	if (registerForm.password !== registerForm.repassword) return Message.error('两次输入的密码不一致')

	const res = await api.login.registerSchoolUser(pick(registerForm, ['studentId', 'studentName', 'password']))

	if (res.status === 200) {
		Message.success('注册成功，请前往登录')
		clearForm(registerForm)
	}

	if (res.status === 400) {
		const { message } = res.data as any
		Message.error(`注册失败 ${message}`)
	}
}

// 清空表单
const clearForm = (obj: object) => {
	Object.keys(obj).forEach((item) => {
		obj[item] = ''
	})
}

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
						<a-input v-model="form.jobNum" size="large" placeholder="请输入工号">
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
							<div class="button" @click="login">登录</div>
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
						<a-input v-model="registerForm.studentName" size="large" placeholder="请输入教师姓名">
							<template #prefix>
								<div i-carbon:user text-4 />
							</template>
						</a-input>
					</a-form-item>
					<a-form-item field="uid" label="工号" mt-2>
						<a-input v-model="registerForm.studentId" size="large" placeholder="请输入教师工号">
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
							<div class="button" @click="register">立即注册</div>
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
  --uno: w-280px h-50px bg-#6777ef mt-5 rounded center color-#ffffff hover:bg-#4e59ad;
  box-shadow: 0 0 20px #6777ef56;
  transition: all 0.6s;
	cursor:pointer;
}
</style>
