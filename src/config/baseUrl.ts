export const model = import.meta.env.MODE === 'development' ? true : false

export const baseUrl = reactive({
	//线上环境
	// httpUrl: model ? 'http://192.168.0.239:8086' : location.origin,
	// websocketUrl: model ? 'http://192.168.0.239:8999' : `${location.hostname}:8999`
	//线下环境
	httpUrl: model ? 'http://192.168.88.239:8086' : location.origin,
	websocketUrl: model ? 'http://192.168.88.239:9000' : `${location.hostname}:9000`
})
