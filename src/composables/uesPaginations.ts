import type { AxiosResponse } from 'axios'

//分页配置
interface PaginationConfig {
	// 当前页
	current: 1
	// 每页多少条
	size: 40
	// 一共有多少页
	pages: 1
}

type Request = (...args: any[]) => Promise<AxiosResponse<any, any>>

export const usePagination = <T extends Request>(request: T, params: Parameters<T>[0], paginationConfig?: PaginationConfig) => {
	request({ ...params, ...paginationConfig })
}

usePagination(api.courseware.queryCourseware, {})
