import router from '~/router'
import { TeacherWeb } from './TeacherWeb'
import { File } from './File'
import { Common } from './Common'
import { omit } from 'lodash-es'

// common.instance common.request
const api = { ...new TeacherWeb(), ...omit(new File(), 'instance', 'request'), ...omit(new Common(), 'instance', 'request') }

//配置请求拦截器
api.instance.interceptors.request.use(
	(config) => {
		if (config.headers) {
			config.headers.token = window.localStorage.getItem('token') || '' //添加token
			config.timeout = 6000
		}
		return config
	},
	(error) => Promise.reject(error)
)

//配置响应拦截器
api.instance.interceptors.response.use(
	(res) => {
		return res
	},
	(err) => {
		try {
			if (err.response.status === 401) {
				localStorage.removeItem('token')
				router.push('/login')
			}
		} catch (error) {
			console.log('[ error ] >', error)
		}
		if (err.code === 'ECONNABORTED' || err.message === 'Network Error' || err.message.includes('timeout')) {
			Message.error('连接超时,请检查网络')
		}
		return err.response
	}
)

export default api
