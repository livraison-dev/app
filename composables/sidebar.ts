export interface SettingsSidebarColumn {
  id: string
  title: string
  icon: string
}

export const settingsSidebarColumns: SettingsSidebarColumn[] = [
  { title: 'Appearance', icon: 'carbon:paint-brush-alt', id: 'appearance' },
  { title: 'Keyboard shortcuts', icon: 'carbon:keyboard', id: 'keyboard-shortcuts' },
  { title: 'About', icon: 'carbon:information', id: 'about' },
]
