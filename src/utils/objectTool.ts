/**
 * 将传进来的数组中的key 从对象里面筛选出来 组成新的对象
 * @param obj 被筛选的对象
 * @param arr 需要筛选出来的key的数组
 * @returns 筛选后返回的对象
 */
export const getKeysObjec = <T, K extends keyof T>(obj: T, arr: K[]): { [P in K]: T[P] } => {
	const res: any = {}
	arr.forEach((item: K) => {
		res[item] = obj[item]
	})
	return res
}

// function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
// 	return o[name]
// }
// export type Res<T, K extends keyof T> = { [P in K]: T[P] }
// export type fn2 = <T extends Object, K extends keyof T>() => Res<T, K>
// type pickFromArray<T extends Record<string, any>, K extends Array<string>> = Pick<T, K[number]>
// type pickFromArray<T extends Record<string, any>, K extends Array<string>> = {
// 	[k in keyof Pick<T, K[number]>]: any
// }
// // type res = <T,K>() =>Pick(T,'name'|'t')

/**
 * 拷贝对象 如果两个对象的key相等将被拷贝对象的key的值赋予原始对象
 * @param reactiveData 原始对象
 * @param copyData 被拷贝对象
 */
export const setReactive = (reactiveData: any, copyData: any) => {
	Object.keys(reactiveData).forEach((key) => {
		if (Object.hasOwnProperty.call(copyData, key)) {
			reactiveData[key] = copyData[key]
		}
	})
}

const resData = {} //接口返回的数据
const data = reactive({
	//本地数据
	xxx: 1
})
setReactive(data, resData)

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
