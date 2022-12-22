import { createRouter, createWebHashHistory } from 'vue-router'
import { close, start } from '~/utils/nporgress'
const layout = () => import('~/layout/layout.vue')
const routes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('~/pages/login/login.vue')
	},
	{
		path: '/layout',
		name: 'layout',
		component: layout
	},
	{
		path: '/course',
		name: 'course',
		component: layout,
		children: [
			{
				path: 'list',
				name: 'courseList',
				component: () => import('~/pages/course/course.vue')
			},
			{
				path: 'prepare',
				name: 'coursePrepare',
				component: () => import('~/pages/course/lesson-prepare.vue')
			}
		]
	},
	{
		path: '/scan-qr-login',
		name: 'scan-qr-login',
		component: () => import('~/pages/login/scan-qr-codes.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

// 路由 前置守卫
router.beforeEach((to, from, next) => {
	start()
	next()
})
// 路由 后置守卫
router.afterEach(() => {
	close()
})

export default router
