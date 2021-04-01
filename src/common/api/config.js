export const API_BASE_DOMAIN = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
export const API_BASE_URL = `${API_BASE_DOMAIN}/rest/api/subapp`

export default {
  API_BASE_URL
}
