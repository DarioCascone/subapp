import authService from 'src/common/api/authService'
import geoService from 'src/common/api/geoService'
import optionService from 'src/common/api/optionService'
import userService from 'src/common/api/userService'
import emailService from 'src/common/api/emailService'

const services = {
  auth: authService,
  geo: geoService,
  option: optionService,
  user: userService,
  email: emailService
}

export const ApiFactory = {
  get: name => services[name]
}
