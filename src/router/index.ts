import { createRouter, createWebHashHistory } from 'vue-router'
import { close, start } from '~/utils/nporgress'
const login = () => import('~/pages/login/login.vue')
const routes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: 'login',
		component: login
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
