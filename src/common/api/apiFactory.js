import authService from 'src/common/api/authService'

const services = {
  auth: authService
}

export const ApiFactory = {
  get: name => services[name]
}
