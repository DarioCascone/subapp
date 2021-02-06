import authService from 'src/common/api/authService'
import geoService from 'src/common/api/geoService'
import optionService from 'src/common/api/optionService'

const services = {
  auth: authService,
  geo: geoService,
  option: optionService
}

export const ApiFactory = {
  get: name => services[name]
}
