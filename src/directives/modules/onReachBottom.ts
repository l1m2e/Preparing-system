import type { Directive, DirectiveBinding } from 'vue'

export const onReachBottom: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		el.style.overflowY = 'auto' //设置元素为相对定位
		const reachBottomDistance = 50 // 距离底部多少px触发回调
		let isReachBottom = false // 防止多次触发触底事件
		const scrollHeight = el.scrollHeight //实际高度
		const offsetHeight = Math.ceil(el.getBoundingClientRect().height) //可视高度

		//添加滚动监听事件
		el.onscroll = (event) => {
			const scrollTop = (event.target as HTMLElement).scrollTop
			let currentHeight = scrollTop + offsetHeight + reachBottomDistance

			if (currentHeight < scrollHeight && isReachBottom) {
				isReachBottom = false
			}

			if (isReachBottom) return
			if (currentHeight >= scrollHeight) {
				isReachBottom = true
				console.log('触底')
			}
		}
	}
}
