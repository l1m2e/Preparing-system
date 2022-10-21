import { defineStore } from 'pinia'

export const useUserStore = defineStore(
	'user',
	() => {
		const userInfo: any = ref({})
		return { userInfo }
	},
	{
		persist: true
	}
)
