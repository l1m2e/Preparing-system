// 导入自定义指令
import { App } from 'vue'
import { onReachBottom } from './modules'
//自定义指令合集
const directivesList = { onReachBottom }

const directives = {
	install: function (app: App<Element>) {
		Object.keys(directivesList).forEach((key) => {
			// 注册自定义指令
			app.directive(key, directivesList[key])
		})
	}
}

export default directives
