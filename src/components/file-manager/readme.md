## **props**

| 属性     | 类型            | 描述         |
| -------- | --------------- | ------------ |
| fileList | `Array<File>`   | 文件列表     |
| v-model  | `Array<number>` | 被选中的列表 |
|          |                 |              |



## emits

| 事件            | 事件参数                             | 描述                                                         |
| --------------- | ------------------------------------ | ------------------------------------------------------------ |
| resetFolderName | `{ id: number'; name: string }`      | 重命名文件夹按钮点击事件                                     |
| move            | `id: number | idList: Array<number>` | 移动文件 ( 返回一个id为移动一个文件 返回id数组时群体移动文件 ) |
| delete          | `id:number | idList: Array<number>`  | 删除文件（ 返回一个id为删除一个文件 返回 id数组为群体删除文件 ） |
| open            | `File`                               | 打开文件夹或者文件                                           |

