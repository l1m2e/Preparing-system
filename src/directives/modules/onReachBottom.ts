import type { Directive, DirectiveBinding } from 'vue'

export const onReachBottom: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		el.style.overflowY = 'auto' //设置元素为相对定位
		let throttle = false // 防止多次触发触底事件

		//添加滚动监听事件
		el.onscroll = (event) => {
			const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLElement
			const isReachBottom = Math.floor(scrollTop + clientHeight) === Math.floor(scrollHeight)

			if (!isReachBottom) throttle = false

			if (isReachBottom) {
				if (throttle) return

				binding.value()
				throttle = true
			}
		}
	}
}
