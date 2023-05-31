import dayjs from 'dayjs'
import type { MaybeRef } from 'vue'
import { toValue } from 'vue'
import { File } from '~/components/file-manager/interface'

/** 使用文件分页 */
export const useFilePagination = (isMe: MaybeRef<boolean>) => {
	//
	const breadcrumbList = reactive([{ title: '全部', fid: -1001 }]) // 文件夹目录写死的层级 不参与请求 层级 -1001 全部 -1002 课程
	const breadcrumbLastId = computed(() => breadcrumbList.slice().pop()?.fid || 0)
	const isHome = computed(() => (toValue(isMe) ? breadcrumbList.length === 1 : breadcrumbList.length <= 2))
	const courseName = computed(() => breadcrumbList[1]?.title ?? '')
	const teacherId = computed(() => (toValue(isMe) ? '' : breadcrumbList[2]?.fid ?? ''))

	//点击面包屑
	const clickBreadcrumb = (id: number) => {
		const index = breadcrumbList.findIndex((item) => item.fid === id)
		if (index !== -1) breadcrumbList.splice(index + 1)
		resetFlieState()
		request()
	}

	//请求模块
	const fileList = reactive<Array<File>>([])

	//获取老师列表
	const useTeacherFolder = async () => {
		const res = await api.courseware.getJobNameByCourseName({ courseName: courseName.value })
		if (res.status === 200) {
			const formatData = res.data.records
				.filter((item) => item.jobNum !== useUserInfo.value.schoolUser.studentId) //过滤掉自己共享的文件夹
				.map((item) => ({
					fileName: item.teachName!,
					id: item.jobNum as any,
					fid: -1002,
					createdTimestamp: dayjs().valueOf(),
					type: 0
				}))
			setFileList(formatData)
		}
	}

	//获取课程列表
	const getCourseFolder = async () => {
		const query = toValue(isMe) ? api.courseTable.getCourseNameBySemester : api.courseware.getShareCourseName
		const res = await query()
		if (res.status === 200) {
			const formatData = res.data.map((item) => ({ fileName: item, id: 0, fid: 0, createdTimestamp: dayjs().valueOf(), type: 0 }))
			setFileList(formatData)
		}
	}

	// 获取文件列表
	const total = ref(Infinity)

	const getFileList = async () => {
		console.log('请求文件列表', currentPage.value, currentPageSize.value, isLastPage.value)
		const res = await api.issueBank.queryQuestionBankSim({
			current: currentPage.value,
			size: currentPageSize.value,
			fid: toValue(isMe) ? breadcrumbLastId.value : breadcrumbList.length === 3 ? 0 : breadcrumbLastId.value,
			courseName: courseName.value,
			jobNum: teacherId.value as any
		})

		if (res.status === 200) {
			total.value = res.data.total
			const formatData = res.data.records.map(({ title, id, fid, createdTimestamp, type, share }) => ({
				fileName: title,
				id,
				fid: fid!,
				createdTimestamp,
				type,
				shareType: share
			}))
			fileList.push(...formatData)
		}
	}

	//根据状态发起请求
	const request = () => {
		if (isHome.value) {
			if (toValue(isMe)) {
				getCourseFolder()
			} else {
				breadcrumbList.length === 1 ? getCourseFolder() : useTeacherFolder()
			}
			return
		}
		getFileList()
	}

	//分页配置
	const { currentPage, currentPageSize, isLastPage, next } = useOffsetPagination({
		total,
		pageSize: 50,
		onPageChange: getFileList
	})

	const setFileList = (arr: File[]) => {
		fileList.length = 0
		fileList.push(...arr)
	}

	const resetFlieState = () => {
		currentPage.value = 1
		fileList.length = 0
		total.value = Infinity
	}

	const refreshFileList = () => {
		resetFlieState()
		request()
	}

	const resetFileList = () => {
		resetFlieState()
		request()
		breadcrumbList.length = 1
	}

	return {
		/** 是否为首页 */
		isHome,
		/** 文件列表 */
		fileList,
		/** 面包屑数组 */
		breadcrumbList,
		/** 面包屑最后一个id */
		breadcrumbLastId,
		/** 课程名 */
		courseName,
		/** 点击面包屑 */
		clickBreadcrumb,
		/** 重置状态 */
		resetFlieState,
		/** 获取文件列表 */
		getFileList,
		/** 设置文件列表 */
		setFileList,
		/** 刷新文件列表 */
		refreshFileList,
		/** 根据状态发起请求 */
		request,
		/** 重置所有状态 */
		resetFileList,
		/** 下一页 */
		next
	}
}
