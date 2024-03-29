import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { baseUrl } from '~/config/baseUrl'
import router from '~/router'

axios.defaults.baseURL = baseUrl.httpUrl
axios.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		if (config.headers) {
			config.headers.token = window.localStorage.getItem('token') || '' //添加token
			config.timeout = 6000
		}
		return config
	},
	(error) => Promise.reject(error)
)

axios.interceptors.response.use(
	(res: AxiosResponse) => {
		return res
	},
	(err: any) => {
		try {
			// Message.error(err.response.data.message)
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

export default axios
