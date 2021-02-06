export default {
  isFiscalCode: (param) => {
    if (param) {
      const pattern = new RegExp('^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})|([0-9]{11})$')
      return pattern.test(param)
    }
    return false
  },

  isSDICode: (param) => {
    if (param) {
      const pattern = new RegExp('^[a-zA-Z0-9]{7,}$')
      return pattern.test(param)
    }
    return false
  },

  isVatNumber: (param) => {
    if (param) {
      const pattern = new RegExp('^[0-9]{11}$')
      return pattern.test(param)
    }
    return false
  },

  isPostalCode: (param) => {
    if (param) {
      const pattern = new RegExp('(?<!\\d)\\d{5}(?!\\d)')
      return pattern.test(param)
    }
    return false
  },

  isWebSite: (param) => {
    if (param) {
      const pattern = new RegExp('(https?:\\/\\/)?(www\\.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)|(https?:\\/\\/)?(www\\.)?(?!ww)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)')
      return pattern.test(param)
    }
    return false
  },

  isTelephoneNumber: (param) => {
    if (param) {
      const pattern = new RegExp('^(([+]|00)39)?((3[1-9][0-9]))(\\d{7})$')
      return pattern.test(param)
    }
    return false
  },

  // Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character( ! , * , @ , ? , etc )
  isPassword: (param) => {
    if (param) {
      const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
      return pattern.test(param)
    }
    return false
  },

  isValid: (input, val, validator) => {
    if (validator.$error) {
      if (validator[input].required === false) {
        return 'Campo obbligatorio!'
      }
      switch (input) {
        case 'username':
          if (!validator[input].email) {
            return 'Username: ' + val + ' non valida!'
          }
          break
        case 'password':
          if (!validator[input].isPassword) {
            return 'Password non valida!'
          }
          break
        case 'SDICode':
          if (!validator[input].isSDICode) {
            return 'Codice: ' + val + ' non valido!'
          }
          break
        case 'vatNumber':
          if (!validator[input].isVatNumber) {
            return 'P.iva: ' + val + ' non valida!'
          }
          break
        case 'fiscalCode':
          if (!validator[input].isFiscalCode) {
            return 'Codice: ' + val + ' non valido!'
          }
          break
        case 'postalCode':
          if (!validator[input].isPostalCode) {
            return 'CAP: ' + val + ' non valido!'
          }
          break
        case 'webSite':
          if (val && !validator[input].isWebSite) {
            return 'Sito: ' + val + ' non valido!'
          }
          break
        case 'pec':
          if (!validator[input].email) {
            return 'PEC: ' + val + ' non valida!'
          }
          break
        case 'telephoneNumber':
          if (!validator[input].isTelephoneNumber) {
            return 'Numero: ' + val + ' non valido!'
          }
          break
      }
    }
    return true
  }

}
