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
		size: 20
	})
	/** 文件列表 */
	const fileList = reactive<Array<any>>([])

	/** 获取文件列表 */
	const getFileList = async () => {
		console.log('请求成功', pagination.current, pagination.pages)
		/** 如果当前页大于总页数,则直接返回不请求 */
		if (pagination.current > pagination.pages) return

		const { pages, ...parms } = pagination

		const res = await api.queryQuestionBankList({ ...parms, fid: breadcrumbLastId.value })

		if (res.status === 200) {
			res.data.records.forEach((item: any) => fileList.push(item))
			pagination.pages = res.data.pages
		}
	}

	/** 点击面包屑 */
	const clickBreadcrumb = (id: number) => {
		const index = breadcrumbList.findIndex((item) => item.fid === id)
		if (index !== -1) {
			breadcrumbList.splice(index + 1, breadcrumbList.length - index - 1)
		}
		console.log('点击成功')
		fileList.length = 0
		pagination.pages = 1
		pagination.current = 1
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
		setReactive(pagination, { current: 1, pages: 1, size: 20 })
		breadcrumbList.length = 1
	}

	return {
		pagination,
		fileList,
		breadcrumbList,
		breadcrumbLastId,
		clickBreadcrumb,
		resetFlieState,
		getFileList
	}
}
