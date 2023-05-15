import type { Directive, DirectiveBinding } from 'vue'

export const onReachBottom: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { cb, className } = binding.value
		el.style.overflowY = 'auto' //设置元素y轴滚动
		const newDiv = document.createElement('div') // 创建div
		newDiv.style.cssText = 'width: 100%; height: 1px;' // 给div设置样式

		if (className) {
			el.querySelector(`.${className}`)?.appendChild(newDiv) // 添加到指定区域
		} else {
			el.appendChild(newDiv) // 添加到子元素
		}

		useIntersectionObserver(newDiv, ([{ isIntersecting }]) => {
			const { clientHeight, scrollHeight } = el as HTMLElement
			if (clientHeight === scrollHeight) return

			try {
				if (isIntersecting) cb()
			} catch (error) {
				console.log('onReachBottom 指令参数传递错误 没有传递回调函数')
			}
		})
	}
}
