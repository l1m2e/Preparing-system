//使用store 共享状态
export const useFileStore = () => {
	const fileStore = reactive({
		fileList: [] as Array<any>, //接口请求回来的原始数据
		checkedIdList: [] as Array<any> //被选中的id
	})

	//geeters
	const fileListUi = computed(() =>
		fileStore.fileList.map((item: any) => (fileStore.checkedIdList.includes(item.id) ? { ...item, ...{ checked: true } } : { ...item, ...{ checked: false } }))
	)

	//请求文件列表
	const getFileList = async () => {
		const res = await api.queryQuestionBankList({})
		if (res.status === 200) {
			fileStore.fileList = res.data.records
		}
	}

	return { fileStore, getFileList, fileListUi }
}
