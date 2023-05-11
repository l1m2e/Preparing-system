export interface Props {
	title: string
	modelValue: boolean
}
export interface Emit {
	(e: 'update:modelValue', visible: boolean)
	(e: 'ok', name: string)
}
