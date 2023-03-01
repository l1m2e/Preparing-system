import { axios, io } from '~/service'
import { baseUrl } from '~/config/baseUrl'
import { Ilogin, RegisterSchoolUserParams } from './types/user'
//获取登录二维码
export const getLoginQRcode = (scene: string) => axios.get('/teacherWeb/user/getAppletErWeiCode', { params: { scene } })
//监听登录授权
export const onLoginIo = (code: string) => io(`${baseUrl.websocketUrl}/teacherWeb`, { query: { scene: code }, transports: ['websocket'] })
//获取用户信息
export const getUserInfo = () => axios.get('/teacherWeb/user/userInfo')
//账号密码登录
export const loggin = (data: Ilogin) => axios.post('/teacherWeb/user/login', data)
//注册
export const register = (data: RegisterSchoolUserParams) => axios.post('/teacherWeb/user/register', data)
//获取ws路径
export const getWSUrl = () => axios.get(`/common/address`)
