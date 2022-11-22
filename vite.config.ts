import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import requireTransform from 'vite-plugin-require-transform'

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`
		}
	},
	plugins: [
		Vue({
			reactivityTransform: true
		}),
		requireTransform({ fileRegex: /.ts$|.tsx$|.vue$/ }),
		AutoImport({
			imports: [
				'vue',
				'vue/macros',
				'vue-router',
				'@vueuse/core',
				{
					'@arco-design/web-vue': ['Message'],
					'~/api': [['*', 'api']]
				}
			],
			dts: true,
			dirs: ['./src/composables'],
			vueTemplate: true,
			resolvers: [ArcoResolver()]
		}),
		Components({
			dts: true,
			resolvers: [
				ArcoResolver({
					sideEffect: true
				})
			]
		}),
		Unocss()
	],
	base: './'
})
