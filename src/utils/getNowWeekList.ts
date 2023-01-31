import dayjs from 'dayjs'

interface IWeekData {
	week: string
	date: string
}
/**
 * 传入一个日期 返回当前一周的日期
 * @param date 当前日期
 * @returns 周数组
 */
export function getWeekList(date: string) {
	const arr: IWeekData[] = [
		{
			week: '一',
			date: ''
		},
		{
			week: '二',
			date: ''
		},
		{
			week: '三',
			date: ''
		},
		{
			week: '四',
			date: ''
		},
		{
			week: '五',
			date: ''
		},
		{
			week: '六',
			date: ''
		},
		{
			week: '日',
			date: ''
		}
	]
	arr.forEach((item, index) => {
		// 本地化
		if (index === 6) {
			let temp = +dayjs(date).startOf('week').add(index, 'day')
			item.date = dayjs(temp + 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
			return arr
		}
		item.date = dayjs(date)
			.startOf('week')
			.add(index + 1, 'day')
			.format('YYYY-MM-DD')
	})
	return arr
}
