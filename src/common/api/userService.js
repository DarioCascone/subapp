import ApiService from 'src/common/api/apiService'

const resource = '/user'

export default {
  get (path) {
    return ApiService.get(resource + path)
  },
  post (path, body) {
    return ApiService.post(resource + path, body)
  }
}
