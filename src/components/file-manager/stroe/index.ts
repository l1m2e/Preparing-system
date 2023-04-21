import { setReactive } from '~/utils'

export const checkedIdList = ref<any[]>([]) //被选中的id

//文件列表
export const fileTable = reactive({
	list: new Array<any>(),
	current: 1,
	size: 100,
	pages: 1
})

//文件列表带是否被选中状态
export const fileListSelectedStateState = computed(() =>
	fileTable.list.map((item) => {
		return checkedIdList.value.includes(item.id) ? { ...item, checked: true } : { ...item, checked: false }
	})
)

//请求文件列表
export const getFileList = async (fid = 0) => {
	const res = await api.queryQuestionBankList({ current: fileTable.current, size: fileTable.size, fid })
	if (res.status === 200) {
		if (fileTable.current <= res.data.pages) {
			res.data.records.forEach((item: any) => {
				fileTable.list.push(item)
			})
			fileTable.current = fileTable.current + 1
			fileTable.pages = res.data.pages
		}
		return true
	}
	return false
}

//面包屑数组
export const breadcrumbList = reactive([{ title: '首页', fid: 0 }])

//文件或者文件夹被点击
export const onFileClick = async (element: any) => {
	if (element.type === 0) {
		fileTableReset()
		const res = await getFileList(element.id)
		if (res) {
			breadcrumbList.push({ title: element.keyword, fid: element.id })
		}
	}
}
//删除某数组后面的所有元素
export const onClickBreadcrumb = (id: number) => {
	const index = breadcrumbList.findIndex((item) => item.fid === id)
	if (index !== -1) {
		breadcrumbList.splice(index + 1, breadcrumbList.length - index - 1)
		fileTableReset()
		updateFileList()
	}
}

//单个删除
export const singleDelete = async (element: { type: number; id: number }) => {
	if (element.type === 0) {
		const res = await api.batchDeleteFolders([element.id])
		if (res.status === 200) {
			fileTable.list = fileTable.list.filter((item) => item.id !== element.id)
			Message.success('删除成功')
		} else {
			Message.error('删除失败')
		}
	} else {
		const res = await api.batchDeleteFlie([element.id])
		if (res.status === 200) {
			fileTable.list = fileTable.list.filter((item) => item.id !== element.id)
			Message.success('删除成功')
		} else {
			Message.error('删除失败')
		}
	}
}

//用户会批量选中文件夹和文件 批量删除文件和批量删除文件夹是两个接口 对选中的项进行分类 再分别批量删除
export const batchDelete = async () => {
	// 根据被选中的id进行分类
	const fileInfoList = fileTable.list.filter((item) => checkedIdList.value.includes(item.id)) // 文件带文件信息方便根据信息进行分类
	const folderIdList = fileInfoList.filter((item) => item.type === 0).map((item) => item.id) // 被选中的文件夹id数组
	const fileIdList = fileInfoList.filter((item) => item.type !== 0).map((item) => item.id) // 被选中的文件id数组

	// 批量删除文件
	if (fileIdList.length) {
		const deleteFlieRes = await api.batchDeleteFlie(fileIdList)
		if (deleteFlieRes.status === 200) {
			const temp = fileTable.list.filter((item) => !fileIdList.includes(item.id))
			fileTable.list = temp
			Message.success(`成功删除${fileIdList.length}个文件`)
		}
	}

	// 批量删除文件夹
	if (folderIdList.length) {
		const deleteFolderRes = await api.batchDeleteFolders(folderIdList)
		if (deleteFolderRes.status === 200) {
			const temp = fileTable.list.filter((item) => !folderIdList.includes(item.id))
			fileTable.list = temp
			Message.success(`成功删除${folderIdList.length}个文件夹`)
		}
	}

	//清空选中的数组
	checkedIdList.value.length = 0
}

//文件夹重命名
export const folderRename = (id: number) => {}

//刷新
export const updateFileList = () => {
	fileTableReset()
	getFileList(breadcrumbList.slice(-1)[0].fid)
}

//清除所有状态
export const fileTableReset = () => {
	fileTable.list.length = 0
	checkedIdList.value.length = 0
	setReactive(fileTable, { current: 1, size: 40, pages: 1 })
}
