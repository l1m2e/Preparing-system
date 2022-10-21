import axios from '~/service/http'

//获取登录二维码
export const getLoginQRcode = (scene: string) => axios.get('/teacherWeb/getAppletErWeiCode', { params: { scene } })
