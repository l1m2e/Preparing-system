**props**

| 属性     | 类型        |
| -------- | ----------- |
| fileList | Array<File> |

```
interface File {
	fileName: string
	id: number
	fid: number
	createdTimestamp: number
	// true 是文件 false 是文件夹
	type: boolean
}
```

