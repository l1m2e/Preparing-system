import { reactive } from 'vue'
export const useStore = () => {
	const listStore = reactive({
		list: new Array<any>()
	})

	let index = 0
	const getList = async () => {
		index = index + 1
		let temp: Array<any> = []
		for (let i = 0; i < index; i++) {
			temp.push(`test${index}`)
		}
		//模拟异步
		setTimeout(() => {
			listStore.list = temp
			console.log('%c%s', 'color: #a3ff7b', '异步请求回来的list', listStore.list)
		}, 1000)
	}

	return { getList, listStore }
}
