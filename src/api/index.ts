import router from '~/router'
import { Api } from './api'
import { omit } from 'lodash-es'
import { baseUrl } from '~/config/baseUrl'

const api = new Api({ baseURL: baseUrl.httpUrl })

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

const omitApi = omit(api, 'instance', 'setSecurityData', 'request')

//配置映射关系 后端如果更新了新模块 需要在下面定义一下才能使用
const formatApi = {
	/** 登录模块 */
	login: omitApi['v80登录模块'],
	/** 问题库模块 */
	issueBank: omitApi['v82问题题库模块'],
	/** 问题模块 */
	issue: omitApi['v81问题模块'],
	/** 测验模块 */
	test: omitApi['v84测验模块'],
	/** 备课模块 */
	prepare: omitApi['v85备课主题'],
	/** 课件模块 */
	courseware: omitApi['v83课件模块'],
	/** 文件模块 */
	file: omitApi['v55文件模块'],
	/** 课程表模块 */
	courseTable: omitApi['v86课程表'],
	/** 通用模块 */
	general: omitApi['v70通用模块']
}

export default formatApi
