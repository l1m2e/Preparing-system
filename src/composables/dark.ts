export const isDark = useDark({ selector: 'body', attribute: 'arco-theme', valueDark: 'dark', valueLight: 'arco-theme' })
export const toggleDark = useToggle(isDark)
