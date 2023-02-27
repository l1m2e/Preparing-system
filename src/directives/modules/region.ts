import type { Directive, DirectiveBinding } from 'vue'

export const region: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		el.style.position = 'relative' //设置元素为相对定位
		const mask = el.appendChild(initSelectMask()) //添加选框蒙板子
		el.onmousedown = (event) => mousedown(event, el, mask)
		el.onmouseup = (event) => onmouseup(event, el, mask)
		console.log(binding.value)
	}
}

const startPoint = {
	x: 0,
	y: 0
}
// 鼠标按下
const mousedown = (event: MouseEvent, el: HTMLElement, mask: HTMLDivElement) => {
	el.onmousemove = (event) => mousemove(event, el, mask)
	mask.style.opacity = '1' // 显示框选元素
	startPoint.x = event.clientX
	startPoint.y = event.clientY
	const elRect = el.getBoundingClientRect()
	mask.style.left = event.clientX - elRect.left + 'px'
	mask.style.top = event.clientY - elRect.top + 'px'
}

//鼠标移动
const mousemove = (event: MouseEvent, el: HTMLElement, mask: HTMLDivElement) => {
	const elRect = el.getBoundingClientRect()
	mask.style.width = Math.abs(startPoint.x - event.clientX) + 'px'
	mask.style.height = Math.abs(startPoint.y - event.clientY) + 'px'
	if (startPoint.x - event.clientX >= 0) {
		mask.style.left = event.clientX - elRect.left + 'px'
	} else {
		mask.style.left = startPoint.x - elRect.left + 'px'
	}
	if (startPoint.y - event.clientY >= 0) {
		mask.style.top = event.clientY - elRect.top + 'px'
	} else {
		mask.style.top = startPoint.y - elRect.top + 'px'
	}
}

//鼠标松起
const onmouseup = (event: MouseEvent, el: HTMLElement, mask: HTMLDivElement) => {
	maskHidden(mask) // 隐藏框选元素
	el.onmousemove = null
}

const maskHidden = (mask: HTMLDivElement) => {
	mask.style.width = '0px'
	mask.style.height = '0px'
	mask.style.left = '0px'
	mask.style.top = '0px'
	mask.style.opacity = '0'
}

const initSelectMask = () => {
	let mask = document.createElement('div')
	mask.style.cssText =
		' pointer-events:none;width: 0px; height: 0px;	border-radius: 2px; background: #4080ff20;border: 2px solid #4080ff; opacity: 0;position: absolute; opacity: 0;'
	return mask
}
