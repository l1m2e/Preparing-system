import type { Ref } from 'vue'
/**
 * 自动改变gird布局模式 保持 元素格式少的 时候 左对齐 贴边
 * @param dom 父盒子 ref
 * @param width  grid 每个元素的 宽度
 * @param total  一共有多少个盒子
 * @param calssName 从父盒子的子盒子中寻找第一个类名符合的元素 改变布局样式
 */
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
