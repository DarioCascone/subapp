export default class user {
  constructor () {
    this.username = ''
    this.password = ''
    this.country = undefined
    this.region = undefined
    this.province = undefined
    this.city = undefined
    this.companyName = '' // Ragione sociale
    // this.legalForm = ''
    this.SDICode = ''
    this.vatNumber = ''
    this.fiscalCode = ''
    this.registeredOfficeAddress = ''
    this.postalCode = ''
    this.webSite = ''
    this.pec = ''
    this.telephoneNumber = ''
    this.rdos = []
    this.imports = []
    this.regionsOfInterest = []
    this.soaFile = {}
    this.isoFile = {}
    this.fgasFile = {}
    this.antimafiaFile = {}
    this.lendingFile = {}
    this.certificateFile = {}
    this.durcRegolarityFile = {}
    this.certificateDate = ''
    this.durcRegolarityDate = ''
    this.annual = false
    this.biennial = false
    this.subscriptionDate = null
    this.blocked = false
    this.companyCategory = ''
    this.loadedRdos = []
  }
}
