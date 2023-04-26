import { setReactive } from '~/utils'

/** 使用文件分页 */
export const useFilePagination = () => {
	/** 面包屑数组 */
	const breadcrumbList = reactive([{ title: '所有问题', fid: 0 }])
	/** 面包屑最后一个id */
	const breadcrumbLastId = computed(() => breadcrumbList.slice().pop()?.fid || 0)
	/** 分页配置 */
	const pagination = reactive({
		current: 1,
		pages: 1,
		size: 40
	})
	/** 文件列表 */
	const fileList = reactive<Array<any>>([])

	/** 获取文件列表 */
	const getFileList = async () => {
		console.log('发起请求进入判断', pagination.current, pagination.pages)
		/** 如果当前页大于总页数,则直接返回不请求 */
		if (pagination.current > pagination.pages) return

		const { pages, ...parms } = pagination

		const res = await api.queryQuestionSim({ ...parms, fid: breadcrumbLastId.value })

		if (res.status === 200) {
			res.data.records!.forEach((item: any) => fileList.push(item))
			pagination.pages = res.data.pages!
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

	/** 监听分页 如果分页发生了变化则请求 但是不包括分页被重置为1的时候 */
	watch(
		() => pagination.current,
		() => {
			if (pagination.current === 1) return
			getFileList()
		}
	)

	/** 重置状态 */
	const resetFlieState = () => {
		setReactive(pagination, { current: 1, pages: 1, size: 40 })
		fileList.length = 0
		breadcrumbList.length = 1
	}

	/** 给fileList重新赋值 */
	const setFileList = (arr: Array<any>) => {
		fileList.length = 0
		fileList.push(...arr)
	}

	onUnmounted(() => {
		resetFlieState()
	})
	return {
		pagination,
		fileList,
		breadcrumbList,
		breadcrumbLastId,
		clickBreadcrumb,
		resetFlieState,
		getFileList,
		setFileList
	}
}
