import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import requireTransform from 'vite-plugin-require-transform'
import path from 'path'

import { defineConfig } from 'vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`
		}
	},
	plugins: [
		Vue({
			script: {
				propsDestructure: true,
				defineModel: true
			}
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
					'~/api': [['default', 'api']]
				}
			],
			dts: './src/types/auto-import.d.ts',
			dirs: ['./src/composables'],
			vueTemplate: true,
			resolvers: [ArcoResolver()]
		}),
		Components({
			dirs: ['src/components'],
			deep: true,
			extensions: ['vue'],
			include: [/.vue$/, /.vue\?vue/],
			exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
			resolvers: [
				ArcoResolver({
					sideEffect: true
				})
			],
			dts: './src/types/components.d.ts'
		}),
		Unocss()
	],
	base: '/webapp',
	server: {
		host: '0.0.0.0'
	}
})
