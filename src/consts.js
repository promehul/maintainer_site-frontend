import { getCookie } from 'formula_one'

export const PATHNAME = '/maintainer_site/'

export const MEDIUM_URL = 'https://medium.com/'

export const GITHUB_URL = 'https://github.com/'

export const BLOG_SECTION_LINE_1 =
  'Ken the ins and outs of life and moil at IMG.'
export const BLOG_SECTION_LINE_2 =
  'Find answers to all your whats, whys and hows.'

export const CREATORS = [
  {
    name: 'Aman Sharma',
    role: 'Full-stack developer',
    url: `${GITHUB_URL}algomaster99`,
  },
  {
    name: 'Harshit Khetan',
    role: 'Full-stack developer',
    url: `${GITHUB_URL}promehul`,
  },
]

export const IMAGE_STYLE = {
  maxHeight: '100%',
  maxWidth: '100%',
}

export const backgroundImageStyle = image => {
  return {
    width: '100%',
    height: '200px',
    backgroundImage: `url('${image}')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
}

export const headers = {
  'X-CSRFToken': getCookie('csrftoken'),
}
