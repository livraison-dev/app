export interface SettingsSidebarColumn {
  id: string
  title: string
  icon: string
  components: string
}

export const settingsSidebarColumns: SettingsSidebarColumn[] = [
  {
    title: 'Appearance',
    icon: 'carbon:paint-brush-alt',
    id: 'appearance',
    components: 'SidebarSettingsContentAppearance',
  },
  {
    title: 'Keyboard shortcuts',
    icon: 'carbon:keyboard',
    id: 'keyboard-shortcuts',
    components: 'SidebarSettingsContentKeyboardShortcuts',
  },
  {
    title: 'About',
    icon: 'carbon:information',
    id: 'about',
    components: 'SidebarSettingsContentAbout',
  },
]
