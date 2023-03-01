import { getUuid } from '~/utils'
import { baseUrl } from '~/config/baseUrl'
export const useToken = useStorage('token', '')
export const useUserInfo = useStorage('userInfo', {
	userId: 0,
	avatarUrl: '',
	schoolUser: {
		schoolName: '', // 学校名称
		studentName: '', //老师名称
		studentId: '', //老师id
		cardId: '', //工号
		className: '', // 班级名称
		type: '', // 身份
		gender: '' //性别
	}
})

// 扫码登陆
export const useLoginQrCode = ref()
export const useGetLoginQrCode = async () => {
	useLoginQrCode.value = ''
	const UUIDCode = getUuid().replace(/-/g, '')
	const res = await api.getLoginQRcode(UUIDCode)
	if (res.status === 200) {
		useLoginQrCode.value = res.data.message
		reconnection(UUIDCode)
	}
}

export let useloginIo: any

// 重连ws
const reconnection = async (uuid: string) => {
	await getWSUrl()
	useloginIo = api.onLoginIo(uuid)
	//监听登录事件
	useloginIo.on('onAccredit', onLogin)
	console.log('链接')
}

const onLogin = (res: any) => {
	if (res.type === 'success') {
		useToken.value = res.message
		useGetUserInfo() // 获取token成功则获取用户信息
		useloginIo.disconnect() // 登录成功断开 ws
		console.log('断开')
	}
}

export const getWSUrl = async () => {
	const res = await api.getWSUrl()
	if (res.status === 200) {
		baseUrl.websocketUrl = res.data.websocketUrl
	} else {
		Message.error('获取ws链接失败')
	}
}

export const useGetUserInfo = async () => {
	const res = await api.getUserInfo()
	useUserInfo.value = res.data
}
