<script lang="ts" setup>
import createIssueDrawer from './createIssue.vue'

const createIssueDrawerRef = ref()
const openCreateIssueDrawer = () => {
	console.log('helo')
	createIssueDrawerRef.value.open()
}
//表格
const selectedKeys = ref(['Jane Doe', 'Alisa Ross'])
const rowSelection = reactive({
	type: 'checkbox',
	showCheckedAll: true,
	onlyCurrent: false
})
const pagination = { pageSize: 8 }
const columns = [
	{
		title: '问题名称',
		dataIndex: 'name'
	},
	{
		title: '创建者',
		dataIndex: 'salary'
	},
	{
		title: '创建时间',
		dataIndex: 'address'
	},
	{
		title: '操作',
		dataIndex: 'email'
	}
]

const data = reactive([
	{
		key: '1',
		name: 'Jane Doe',
		salary: 23000,
		address: '32 Park Road, London',
		email: 'jane.doe@example.com'
	},
	{
		key: '2',
		name: 'Alisa Ross',
		salary: 25000,
		address: '35 Park Road, London',
		email: 'alisa.ross@example.com'
	},
	{
		key: '3',
		name: 'Kevin Sandra',
		salary: 22000,
		address: '31 Park Road, London',
		email: 'kevin.sandra@example.com',
		disabled: true
	},
	{
		key: '4',
		name: 'Ed Hellen',
		salary: 17000,
		address: '42 Park Road, London',
		email: 'ed.hellen@example.com'
	},
	{
		key: '5',
		name: 'William Smith',
		salary: 27000,
		address: '62 Park Road, London',
		email: 'william.smith@example.com'
	},
	{
		key: '6',
		name: 'Jane Doe 2',
		salary: 15000,
		address: '32 Park Road, London',
		email: 'jane.doe@example.com'
	},
	{
		key: '7',
		name: 'Alisa Ross 2',
		salary: 28000,
		address: '35 Park Road, London',
		email: 'alisa.ross@example.com'
	},
	{
		key: '8',
		name: 'Kevin Sandra 2',
		salary: 26000,
		address: '31 Park Road, London',
		email: 'kevin.sandra@example.com'
	},
	{
		key: '9',
		name: 'Ed Hellen 2',
		salary: 18000,
		address: '42 Park Road, London',
		email: 'ed.hellen@example.com'
	},
	{
		key: '10',
		name: 'William Smith 2',
		salary: 12000,
		address: '62 Park Road, London',
		email: 'william.smith@example.com'
	}
])
</script>

<template>
	<div class="p-10px">
		<header class="">
			<a-dropdown trigger="hover">
				<a-button shape="round" size="large" type="primary">
					<template #icon>
						<icon-plus />
					</template>
					新建问题
				</a-button>
				<template #content>
					<a-doption @click="openCreateIssueDrawer">单选题</a-doption>
					<a-doption>多选题</a-doption>
					<a-doption>填空题</a-doption>
					<a-doption>简答题</a-doption>
				</template>
			</a-dropdown>
			<a-button shape="round" size="large" class="ml-10px">
				<template #icon>
					<icon-import />
				</template>
				从题库导入
			</a-button>
		</header>
		<main>
			<a-table
				class="mt-20px"
				row-key="name"
				:bordered="false"
				:columns="columns"
				:data="data"
				:row-selection="rowSelection"
				v-model:selectedKeys="selectedKeys"
				:pagination="pagination" />
		</main>
	</div>
	<createIssueDrawer ref="createIssueDrawerRef"></createIssueDrawer>
</template>

<style scoped></style>
