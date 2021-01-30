import draftService from 'src/common/api/authService'

const services = {
  draft: draftService
}

export const ApiFactory = {
  get: name => services[name]
}
