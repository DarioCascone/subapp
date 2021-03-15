import ApiService from 'src/common/api/apiService'

const resource = '/user'

export default {
  get (path) {
    return ApiService.get(resource + path)
  },
  post (path, body) {
    return ApiService.post(resource + path, body)
  },
  put (path, body) {
    return ApiService.put(resource + path, body)
  },
  delete (path, body) {
    return ApiService.delete(resource + path, body)
  }
}
