export const model = import.meta.env.MODE === 'development' ? true : false

export const baseUrl = reactive({
	httpUrl: model ? 'http://192.168.88.123:8081' : location.origin,
	websocketUrl: model ? 'http://192.168.88.123:8999' : `${location.hostname}:8999`
})

console.log(baseUrl.websocketUrl)
