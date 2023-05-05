import type { Ref } from 'vue'

export const useAutoChangGridLayout = (dom: Ref<HTMLElement>, width: number, total: number, calssName?: string) => {
	const boxWidth = dom.value.offsetWidth
	const row = Math.floor(boxWidth / width)
	const node = calssName ? (dom.value.querySelector(calssName) as HTMLElement) : dom.value

	if (total > row) {
		node.style.justifyContent = 'space-between'
	} else {
		node.style.justifyContent = 'start'
	}
}
