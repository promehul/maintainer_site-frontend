import config from '../config.json'

// Front-end routes

export function urlAppBase() {
  return config.baseUrl
}

export function urlAppBlog() {
  return `${urlAppBase()}/blog`
}

export function urlAppProjects() {
  return `${urlAppBase()}/projects`
}

export function urlAppTeam() {
  return `${urlAppBase()}/team`
}

export function urlAppAlumni() {
  return `${urlAppBase()}/alumni`
}

export function urlAppAddMemberDetails() {
  return `${urlAppBase()}/add_member_details`
}

export function urlAppAddProjectDetails() {
  return `${urlAppBase()}/add_project_details`
}

export function urlFileManager() {
  return '/file-manager'
}

// Back-end routes

export function urlApiBase() {
  return '/api/maintainer_site/'
}

export function urlApiSocial() {
  return `${urlApiBase()}social/`
}
export function urlApiLocation() {
  return `${urlApiBase()}location/`
}
export function urlApiContact() {
  return `${urlApiBase()}contact/`
}
export function urlApiMaintainerGroup() {
  return `${urlApiBase()}maintainer_group/`
}
export function urlApiLoggedMaintainer() {
  return `${urlApiBase()}logged_maintainer/`
}
export function urlApiBlog() {
  return `${urlApiBase()}blog/`
}

export function urlApiProjects() {
  return `${urlApiBase()}projects/`
}
export function urlApiProjectsDetails(slug) {
  return `${urlApiProjects()}${slug}/`
}

export function urlApiTeam() {
  return `${urlApiBase()}active_maintainer_info/`
}
export function urlApiTeamDetails(slug) {
  return `${urlApiTeam()}${slug}/`
}

export function urlApiAlumni() {
  return `${urlApiBase()}inactive_maintainer_info/`
}
export function urlApiAlumniDetails(slug) {
  return `${urlApiAlumni()}${slug}/`
}

export function urlApiMaintainerProject(id) {
  return `${urlApiBase()}maintainer_project/${id}/`
}

export function urlApiSocialLink() {
  return `${urlApiBase()}social_link/`
}

export function urlApiPersonalToMedia() {
  return `${urlApiBase()}personal_to_media/`
}

export function urlApiNetworkToMedia() {
  return `${urlApiBase()}network_to_media/`
}

export function urlApiHit() {
  return `${urlApiBase()}hit/`
}

// Static files route

export function urlStaticBase() {
  return `/static/maintainer_site/`
}
