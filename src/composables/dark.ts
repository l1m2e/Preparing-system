export const isDark = useDark({
	onChanged(dark: boolean) {
		if (dark) {
			document.documentElement.classList.toggle('dark', true)
			document.body.setAttribute('arco-theme', 'dark')
		} else {
			document.documentElement.classList.toggle('dark', false)
			document.body.setAttribute('arco-theme', 'arco-theme')
		}
	}
})

export const toggleDark = useToggle(isDark)
