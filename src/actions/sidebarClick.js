export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const NAV_MOBILE_TITLE = 'NAV_MOBILE_TITLE'

export const toggleSidebar = (visible, style) => ({
  type: TOGGLE_SIDEBAR,
  visible,
  style,
})

export const navMobileTitleRender = name => ({
  type: NAV_MOBILE_TITLE,
  name,
})
