import ApiService from 'src/common/api/apiService'

const resource = '/geo'

export default {
  get (path) {
    return ApiService.get(resource + path)
  }
}
