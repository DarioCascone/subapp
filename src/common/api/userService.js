import ApiService from 'src/common/api/apiService'

const resource = '/user'

export default {
  get (path) {
    return ApiService.get(resource + path)
  },
  put (path, body) {
    return ApiService.put(resource + path, body)
  }
}
