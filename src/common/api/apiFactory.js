import authService from 'src/common/api/authService'
import geoService from 'src/common/api/geoService'

const services = {
  auth: authService,
  geo: geoService
}

export const ApiFactory = {
  get: name => services[name]
}
