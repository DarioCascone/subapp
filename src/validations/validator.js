const isFiscalCode = (param) => {
  if (param) {
    const pattern = new RegExp('^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})|([0-9]{11})$')
    return pattern.test(param)
  }
  return false
}

const isPartitaIVA = (param) => {
  if (param) {
    const pattern = new RegExp('^[0-9]{11}$')
    return pattern.test(param)
  }
  return false
}

exports.isFiscalCode = isFiscalCode
exports.isPartitaIVA = isPartitaIVA
