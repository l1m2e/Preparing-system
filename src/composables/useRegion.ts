/**
 * 此函数用于生成一个拖拽选中区域 需要给需要被拖拽选中的元素设置一个自定义属性名称
 * @param el 拖拽区域的最顶级Dom
 * @param customProperties 自定义属性名称
 * @param callback 回调函数会返回被选中的元素的id
 * @param tag 自定义属性的标签名称 默认 div
 */

export const useRegion = (el: HTMLElement, customProperties: string, callback: (checkedIdList: Array<number>) => void, tag = 'div') => {
	el.style.position = 'relative' //设置元素为相对定位
	const mask = el.appendChild(initSelectMask()) //添加选框蒙板

	let timestamp = 0 //记录时间戳

	//鼠标按下
	el.onmousedown = (event: MouseEvent) => {
		timestamp = Date.now()
		const elRect = el.getBoundingClientRect()
		mask.style.opacity = '1' // 显示框选元素

		mask.style.left = event.clientX - elRect.left + 'px'
		mask.style.top = event.clientY - elRect.top + 'px'
		const startPoint = {
			// 鼠标点击起始位置
			x: event.clientX,
			y: event.clientY
		}

		// 获取所有有可能需要被框选的元素矩形
		interface IelementRectID {
			rect: DOMRect
			id: number | null
		}

		const itemsDom = el.querySelectorAll(`${tag}[${customProperties}]`)
		const elementRectID: Array<IelementRectID> = [] //元素矩形和id的合集
		itemsDom.forEach((item) => {
			const id = item.getAttribute(customProperties) //获取id
			item.addEventListener('mousedown', (event) => event.stopPropagation()) // 阻止点击事件冒泡
			if (id) {
				elementRectID.push({ rect: item.getBoundingClientRect(), id: parseInt(id) })
			}
		})

		//鼠标移动
		el.onmousemove = (event) => {
			//设置矩形框高
			mask.style.width = Math.abs(startPoint.x - event.clientX) + 'px'
			mask.style.height = Math.abs(startPoint.y - event.clientY) + 'px'
			//越界判断
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
			//矩形碰撞计算 回调函数返回碰撞id 数组
			const res = elementRectID.map((item) => (collide(item.rect, mask.getBoundingClientRect()) ? item.id : null))
			callback(res.filter((item) => item !== null) as number[])
		}
	}

	//鼠标松开
	el.onmouseup = () => {
		//如果用户在200毫秒内松开鼠标 视为点击事件 直接清空数组
		if (Date.now() - timestamp <= 200) {
			callback([])
		}
		maskHidden(mask) // 隐藏框选元素
		el.onmousemove = null //移除监听鼠标移动监听事件
	}

	onUnmounted(() => {
		//移除鼠标监听 防止内存泄漏
		el.onmousemove = null
		el.onmousedown = null
		el.onmouseup = null
	})
}

//矩形碰撞计算
const collide = (rect1: DOMRect, rect2: DOMRect): boolean => {
	const maxX = Math.max(rect1.x + rect1.width, rect2.x + rect2.width)
	const maxY = Math.max(rect1.y + rect1.height, rect2.y + rect2.height)
	const minX = Math.min(rect1.x, rect2.x)
	const minY = Math.min(rect1.y, rect2.y)
	const res = maxX - minX <= rect1.width + rect2.width && maxY - minY <= rect1.height + rect2.height ? true : false
	return res
}

//隐藏元素
const maskHidden = (mask: HTMLDivElement) => {
	mask.style.width = '0px'
	mask.style.height = '0px'
	mask.style.left = '0px'
	mask.style.top = '0px'
	mask.style.opacity = '0'
}

//初始化框框和样式
const initSelectMask = () => {
	let mask = document.createElement('div')
	mask.style.cssText =
		' pointer-events:none;width: 0px; height: 0px;	 background: #4080ff20;border: 1px solid #4080ff; opacity: 0;position: absolute; opacity: 0;'
	return mask
}
