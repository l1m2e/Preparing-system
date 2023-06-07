## 项目特性

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite 3](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [ESBuild](https://github.com/evanw/esbuild) - 就是快！
- 📦 [组件自动化加载](./src/components)
- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎
- 😃 [各种图标集为你所用](https://github.com/antfu/unocss/tree/main/packages/preset-icons)
- 🔥 使用 [新的 `<script setup>` 语法](https://github.com/vuejs/rfcs/pull/227)
- 🦾 TypeScript, 当然
- 🎉 自动引入组件 和 内置 hooks 自动生成请求接口 -解放双手



### 项目开发与部署

安装依赖

```
pnpm i
```

开发依赖

```
pnpm dev
```

打包

```
pnpm build
```



### 项目根据 openapi 自动生成接口 和请求类类型

如果后端更新了 swagger 文档 请运行 `pnpm api` 获取最新的请求接口和类型

如果后端添加了新的模块 请在 `./src/api/index` 中的 `formatApi` 对象 添加新的模块的映射

```ts
const formatApi = {
	/** 文件模块 */
	login: omitApi['v80登录模块'],
	/** 问题库模块 */
	issueBank: omitApi['v82问题题库模块']
	// ...其他模块  你可以通过 omitApi 获取到有那些模块
}
```

主要是后端 `swagger tags name` 是中文的 如果你并不介意 你可以直接将 api 导出 使用 例如 `api['v80登录模块'].xxx`

我的文件夹
进入页面获取全部科目-增删改查修 移动 分享 如果需要用共享的库 需要先保存到本地库
共享文件夹
有一个共享科目-进入页面获取全部科目-名称