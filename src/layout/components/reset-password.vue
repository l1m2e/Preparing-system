<script lang="ts" setup>
import { useUserInfo } from '~/composables'
const show = ref(false)
const form = reactive({
	/** 工号 */
	jobNum: useUserInfo.value.schoolUser.cardId,
	/** 原密码 */
	oldPassword: '',
	/** 新密码 */
	password: ''
})

const open = () => {
	show.value = true
}

defineExpose({ open })
</script>

<template>
	<a-modal v-model:visible="show">
		<a-form :model="form">
			<a-form-item field="name" label="原来的密码">
				<a-input v-model="form.oldPassword" placeholder="请输入原密码" type="password" />
			</a-form-item>
			<a-form-item field="name" label="新密码">
				<a-input v-model="form.password" placeholder="请输入新密码" type="password" />
			</a-form-item>
		</a-form>
	</a-modal>
</template>
