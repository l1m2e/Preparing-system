import type { Directive, DirectiveBinding } from 'vue'

export const onReachBottom: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		// el.style.overflowY = 'auto' //设置元素y轴滚动
		// const newDiv = document.createElement('div') // 创建div
		// newDiv.style.cssText = 'width: 100%; height: 10px;' // 给div设置样式
		// el.appendChild(newDiv) // 添加到内容区域
		// useIntersectionObserver(newDiv, ([{ isIntersecting }]) => {
		// 	const { clientHeight, scrollHeight } = el as HTMLElement
		// 	if (clientHeight === scrollHeight) return
		// 	if (isIntersecting) binding.value()
		// })
		let throttle = false // 防止多次触发触底事件
		//添加滚动监听事件
		el.onscroll = (event) => {
			const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLElement
			const isReachBottom = Math.ceil(scrollTop + clientHeight) === Math.ceil(scrollHeight)
			console.log(scrollTop + clientHeight, scrollHeight)
			if (!isReachBottom) throttle = false
			if (isReachBottom) {
				if (throttle) return
				if (clientHeight === scrollHeight) return
				binding.value()
				throttle = true
			}
		}
	}
}

// let throttle = false // 防止多次触发触底事件
//添加滚动监听事件
// el.onscroll = (event) => {
// 	const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLElement
// 	const isReachBottom = Math.ceil(scrollTop + clientHeight) === Math.ceil(scrollHeight)
// 	console.log(scrollTop + clientHeight, scrollHeight)
// 	if (!isReachBottom) throttle = false

// 	if (isReachBottom) {
// 		if (throttle) return
// 		if (clientHeight === scrollHeight) return
// 		binding.value()
// 		throttle = true
// 	}
// }
