import type { Directive, DirectiveBinding } from 'vue'

let element: HTMLElement | null = null
export const region: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		el.style.position = 'relative' //设置元素为相对定位
		element = el
		el.addEventListener('mousedown', mouseDown)
	}
}

const maskPositioning = reactive({
	startX: 0,
	startY: 0,
	endX: 0,
	endY: 0
})

const mouseDown = (event: MouseEvent) => {
	maskPositioning.startX = event.clientX
	maskPositioning.startY = event.clientY
	document.body.addEventListener('mousemove', mouseMove)
	document.body.addEventListener('mouseup', mouseUp)
	element?.appendChild(createMask())
}

const mouseMove = (event: MouseEvent) => {
	maskPositioning.endX = event.clientX
	maskPositioning.endY = event.clientY
	const mask = element?.querySelector('.regionMask')
	// mask?.style.left = maskPositioning.startX + 'px'
}

const mouseUp = (event: MouseEvent) => {
	document.body.removeEventListener('mousemove', mouseMove)
	document.body.removeEventListener('mouseup', mouseUp)
	console.log(event)
	const mask = element?.querySelector('.regionMask')
	mask?.remove()
}

const createMask = () => {
	let mask = document.createElement('div')
	mask.className = 'regionMask'
	return mask
}
