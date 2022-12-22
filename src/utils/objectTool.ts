/**
 * 将传进来的数组中的key从对象里面筛选出来
 * @param obj 要筛选的对象
 * @param arr 要筛选的 kye 的数组
 * @returns 筛选后返回的对象
 */
export const getKeysObjec = (obj: any, arr: Array<string>) => {
	const res = {}
	arr.forEach((item) => {
		res[item] = obj[item]
	})
	return res
}

/**
 * 拷贝对象 如果两个对象的key相等将被拷贝对象的key的值赋予原始对象
 * @param reactiveData 原始对象
 * @param setData 被拷贝对象
 */
export const setReactive = (reactiveData: any, setData: any) => {
	Object.keys(reactiveData).forEach((key) => {
		if (Object.prototype.hasOwnProperty.call(setData, key)) {
			reactiveData[key] = setData[key]
		}
	})
}

/**
 * 批量给对象添加属性
 * @param reactiveData 原始对象
 * @param addData 被添加的对象
 * @param include 选择添加的key的数组
 */
export const addReactive = (reactiveData: any, addData: any, include?: Array<string>) => {
	Object.keys(addData).forEach((key) => {
		if (include && include.includes(key)) {
			reactiveData[key] = addData[key]
		} else if (!include) {
			reactiveData[key] = addData[key]
		}
	})
}
