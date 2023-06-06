<script lang="ts" setup>
import ToggleDarkSwitch from './components/toggle-dark-switch.vue'
import courseSvg from '~/assets/svg/course.svg'
import router from '~/router'
import { useUserInfo, useLogout } from '~/composables'
import resetPassword from './components/reset-password.vue'

//菜单折叠
const collapsed = ref(false)
const sideWidth = ref('250px')
const onCollapse = () => {
	collapsed.value = !collapsed.value
	sideWidth.value = collapsed.value ? '55px' : '250px'
}
//菜单列表
const menuList = ref([
	{ text: '日常', icon: 'i-ri-star-line', routerLink: '/1' },
	{ text: '课程', icon: 'i-ri-book-mark-line', routerLink: '/course/list' },
	{ text: '课表', icon: 'i-ri-calendar-2-line', routerLink: '/3' },
	{ text: '问题库', icon: 'i-ri-todo-fill', routerLink: '/question-library/list' },
	{ text: '课件库', icon: 'i-ri-folder-5-fill', routerLink: '/courseware-library/list' }
])
const route = useRoute()
//路由跳转
const onClickMenuItem = (key: string) => {
	router.push(key)
	console.log(route.path)
}

const resetPasswordRef = ref()
</script>

<template>
	<!-- 头部 -->
	<div class="fixed top-0 w-100% h-75px bg-[var(--color-bg-2)] flex z-99 border-b border-[var(--color-neutral-3)] backdrop-blur">
		<div class="w-50% h-100% center justify-start box-border pl-20px">
			<div class="w-45px h-45px"><img :src="courseSvg" alt="" /></div>
			<div class="font-600 text-20px ml-20px">备课系统</div>
		</div>
		<div class="w-50% h-100% center justify-end pr-20px">
			<ToggleDarkSwitch></ToggleDarkSwitch>
			<!-- 退出按钮 -->

			<a-dropdown trigger="hover">
				<div @click="" class="flex items-center mr-40px cursor-pointer select-none">
					<div class="w-35px h-35px center bg-gray-1 hover:bg-gray-2 dark:(bg-dark-1 hover:bg-dark-2) rounded-full mr-10px">
						<div class="i-ri-user-line"></div>
					</div>
					<div>{{ useUserInfo.schoolUser.studentName }}</div>
				</div>
				<template #content>
					<a-doption @click="resetPasswordRef.open()">
						<template #icon>
							<div i-ri-edit-line></div>
						</template>
						<template #default>修改密码</template>
					</a-doption>
					<a-doption @click="useLogout">
						<template #icon>
							<div i-ri-logout-box-line></div>
						</template>
						<template #default>退出登陆</template>
					</a-doption>
				</template>
			</a-dropdown>
		</div>
	</div>
	<!-- 侧边 -->
	<div class="side z-99">
		<a-menu :default-selected-keys="[route.path]" @menuItemClick="onClickMenuItem">
			<div class="w-100% h-25px hover:bg-[var(--color-fill-1)] center mb-10px" @click="onCollapse">
				<div class="i-ri-more-line"></div>
			</div>
			<a-menu-item :key="item.routerLink" v-for="item in menuList">
				<template #icon>
					<div :class="item.icon"></div>
				</template>
				{{ item.text }}
			</a-menu-item>
		</a-menu>
	</div>
	<!-- 内容 -->
	<div class="content">
		<!-- <router-view /> -->
		<router-view v-slot="{ Component }">
			<Transition enter-active-class="animated-fade-in" leave-active-class="animated-fade-out" class="animated animated-duration-150ms" mode="out-in">
				<component :is="Component" />
			</Transition>
		</router-view>
	</div>

	<resetPassword ref="resetPasswordRef"></resetPassword>
</template>
<style scoped>
.side {
	position: fixed;
	height: calc(100vh - 75px);
	top: 75px;
	background-color: var(--color-bg-2);
	width: v-bind(sideWidth);
	transition: width 0.3s;
	border-right: 1px solid var(--color-neutral-3);
}
.content {
	--uno: pt-95px pr-20px pb-20px min-h-100vh w-100% box-border;
	padding-left: calc(v-bind(sideWidth) + 20px);
	background-color: var(--color-neutral-2);
	transition: padding 0.3s;
}
</style>
