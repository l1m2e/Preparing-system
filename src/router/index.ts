import { createRouter, createWebHistory } from 'vue-router'
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
		path: '/scan-qr-login',
		name: 'scan-qr-login',
		component: () => import('~/pages/login/scan-qr-codes.vue')
	},
	{
		path: '/layout',
		name: 'layout',
		component: layout
	},
	{
		path: '/course',
		name: 'course-page',
		component: layout,
		children: [
			{
				path: 'list',
				name: 'course',
				component: () => import('~/pages/course/components/course.vue')
			},
			{
				path: 'prepare',
				name: 'lesson-prepare',
				component: () => import('~/pages/course/lesson-prepare.vue')
			}
		]
	},
	{
		path: '/question-library',
		name: 'question-library',
		component: layout,
		children: [
			{
				path: 'list',
				name: 'question-library-list',
				component: () => import('~/pages/question-library/question-library.vue')
			}
		]
	},
	{
		path: '/courseware-library',
		name: 'courseware-library',
		component: layout,
		children: [
			{
				path: 'list',
				name: 'courseware-library-list',
				component: () => import('~/pages/courseware-library/courseware-library.vue')
			}
		]
	},
	{
		path: '/test',
		name: 'test',
		component: () => import('~/pages/test/test.vue')
	}
]

const router = createRouter({
	history: createWebHistory('/webapp'),
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
