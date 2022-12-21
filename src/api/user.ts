import { axios, io } from '~/service'
import { baseUrl } from '~/config/baseUrl'
//获取登录二维码
export const getLoginQRcode = (scene: string) => axios.get('/teacherWeb/user/getAppletErWeiCode', { params: { scene } })
//监听登录授权
export const onLoginIo = (code: string) => io(`${baseUrl.websocketUrl}/teacherWeb`, { query: { scene: code }, transports: ['websocket'] })
export const getUserInfo = () => axios.get('/teacherWeb/user/userInfo')
