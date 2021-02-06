import ApiService from 'src/common/api/apiService'

const resource = '/option'

export default {
  get (path) {
    return ApiService.get(resource + path)
  }
}
