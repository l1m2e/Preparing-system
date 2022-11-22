export const model = import.meta.env.MODE === 'development' ? true : false

export const baseUrl = reactive({
	httpUrl: model ? 'http://192.168.88.123:8081' : location.origin,
	websocketUrl: 'http://192.168.88.123:8998'
})
