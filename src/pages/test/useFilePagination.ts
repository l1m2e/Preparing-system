import { setReactive } from '~/utils'
import type { QuestionVo } from '~/api/api'

/** 使用文件分页 */
export const useFilePagination = () => {
	const breadcrumbList = reactive([{ title: '全部', fid: 0 }]) //面包屑数组
	const breadcrumbLastId = computed(() => breadcrumbList.slice().pop()?.fid || 0) //面包屑最后一个id
	//分页配置
	const pagination = reactive({
		current: 1,
		pages: 1,
		size: 20
	})

	const paginationReset = () => setReactive(pagination, { current: 1, pages: 1, size: 40 }) // 分页重置

	const fileList = reactive<Array<QuestionVo>>([]) // 文件列表

	// 获取文件列表
	const getFileList = async () => {
		// 如果当前页大于总页数,则直接返回不请求
		if (pagination.current > pagination.pages) return

		const { pages, ...parms } = pagination

		const res = await api.issueBank.queryQuestionBankSim({ ...parms, fid: breadcrumbLastId.value })

		if (res.status === 200) {
			res.data.records.forEach((item) => fileList.push(item))
			pagination.pages = res.data.pages || 1
		}
	}

	/**
	 * 点击面包屑
	 * @param id 点击的面包屑的id
	 */
	const clickBreadcrumb = (id: number) => {
		const index = breadcrumbList.findIndex((item) => item.fid === id)
		if (index !== -1) breadcrumbList.splice(index + 1)
		fileList.length = 0
		pagination.pages = pagination.current = 1
		getFileList()
	}

	// 监听分页 如果分页发生了变化则请求 但是不包括分页被重置为1的时候
	watch(
		() => pagination.current,
		() => {
			if (pagination.current === 1) return
			getFileList()
		}
	)

	// 重置状态
	const resetFlieState = () => {
		paginationReset()
		fileList.length = 0
		breadcrumbList.length = 1
	}

	// 给fileList重新赋值
	const setFileList = (arr: Array<any>) => {
		fileList.length = 0
		fileList.push(...arr)
	}

	onUnmounted(() => {
		resetFlieState()
	})
	return {
		/** 分页配置 */
		pagination,
		/** 文件列表 */
		fileList,
		/** 面包屑数组 */
		breadcrumbList,
		/** 面包屑最后一个id */
		breadcrumbLastId,
		/** 点击面包屑 */
		clickBreadcrumb,
		/** 重置状态 */
		resetFlieState,
		/** 获取文件列表 */
		getFileList,
		/** 设置文件列表 */
		setFileList,
		/** 分页重置 */
		paginationReset
	}
}
