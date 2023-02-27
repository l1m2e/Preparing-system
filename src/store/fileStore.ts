export const checkedIdList = ref<any[]>([]) //被选中的id

//文件列表
export const fileTable = reactive({
	list: new Array<any>(),
	current: 1,
	size: 40,
	pages: 1
})

//文件列表带是否被选中状态
export const fileListSelectedStateState = computed(() =>
	fileTable.list.map((item) => {
		return checkedIdList.value.includes(item.id) ? { ...item, checked: true } : { ...item, checked: false }
	})
)

//请求文件列表
export const getFileList = async (first?: 'first') => {
	const res = await api.queryQuestionBankList({ current: fileTable.current, size: fileTable.size })
	if (res.status === 200) {
		if (fileTable.current > res.data.pages && !first) return
		res.data.records.forEach((item: any) => {
			fileTable.list.push(item)
		})
		fileTable.current = fileTable.current + 1
		console.log(fileTable.pages, res.data.pages)
		fileTable.pages = res.data.pages
	}
}
