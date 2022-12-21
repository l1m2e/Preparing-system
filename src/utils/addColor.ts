const colors = ['cyan', 'blue', 'arcoblue', 'purple', 'pinkpurple', 'red', 'orangered', 'orange', 'gold', 'lime', 'green', , 'magenta', 'gray']
const colorItemList: Array<any> = []
export const addColors = (list: Array<any>, key: string) => {
	let index = 0
	list.forEach((item) => {
		const flag = colorItemList.find((i) => i.type === item[key])
		if (flag) {
			item.color = flag.color
		} else {
			index = index + 1
			if (index > colors.length - 1 || colorItemList.length === 0) index = 0
			colorItemList.push({ type: item[key], color: colors[index] })
			item.color = colors[index]
		}
	})
}
