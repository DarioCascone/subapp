/* eslint-disable no-useless-escape */
const isFiscalCode = (param) => {
  if (param) {
    const pattern = new RegExp('^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})|([0-9]{11})$')
    return pattern.test(param)
  }
  return false
}

const isVatNumber = (param) => {
  if (param) {
    const pattern = new RegExp('^[0-9]{11}$')
    return pattern.test(param)
  }
  return false
}

const isPostalCode = (param) => {
  if (param) {
    const pattern = new RegExp('\d{5}')
    return pattern.test(param)
  }
  return false
}

const isWebSite = (param) => {
  if (param) {
    const pattern = new RegExp('(https?:\\/\\/)?(www\\.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)|(https?:\\/\\/)?(www\\.)?(?!ww)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)')
    return pattern.test(param)
  }
  return false
}

const isTelephoneNumber = (param) => {
  if (param) {
    const pattern = new RegExp('^(([+]|00)39)?((3[1-6][0-9]))(\\d{7})$')
    return pattern.test(param)
  }
  return false
}

// Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character( ! , * , @ , ? , etc )
const isPassword = (param) => {
  if (param) {
    const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
    return pattern.test(param)
  }
  return false
}

exports.isFiscalCode = isFiscalCode
exports.isVatNumber = isVatNumber
exports.isPostalCode = isPostalCode
exports.isWebSite = isWebSite
exports.isTelephoneNumber = isTelephoneNumber
exports.isPassword = isPassword
