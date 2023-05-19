export interface Props {
	title: string
	modelValue: boolean
	placeholder?: string
}
export interface Emit {
	(e: 'update:modelValue', visible: boolean)
	(e: 'ok', name: string)
}
