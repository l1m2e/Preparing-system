const devUrl =
	// 开发模式 api 调试列表
	'http://192.168.88.123:8080' // 本地调试
// 'http://120.76.223.28:8087/api' // 线上调试
export const baseUrl = import.meta.env.MODE === 'production' ? `/api` : devUrl
