export const checkedIdList = ref<any[]>([]) //被选中的id

//文件列表
export const fileTable = reactive({
	list: new Array<any>(),
	current: 1,
	size: 60
})

//文件列表带是否被选中状态
export const fileListSelectedStateState = computed(() =>
	fileTable.list.map((item) => {
		return checkedIdList.value.includes(item.id) ? { ...item, ...{ checked: true } } : { ...item, ...{ checked: false } }
	})
)

//请求文件列表
export const getFileList = async () => {
	const res = await api.queryQuestionBankList({ current: fileTable.current, size: fileTable.size })
	if (res.status === 200) {
		fileTable.list = res.data.records
	}
}
