const legalFormOptions = [
  'SS – Società semplice',
  'SNC - Società in Nome Collettivo',
  'SAS - Società in Accomandita Semplice',
  'SRL - Società a Responsabilità Limitata',
  'SPA - Società Per Azioni',
  'SAPA - Società in Accomandita Per Azioni',
  'Società cooperative'
]

const imports = [
  'fino a 50000€',
  'da 50000€ a 150000€',
  'da 150000 a 258000€',
  'da 258000 a 500000€',
  'oltre 500000€'
]

const compCatOptions = [
  {
    label: 'Mirco impresa',
    value: 'xs'
  },
  {
    label: 'Piccola impresa',
    value: 'sm'
  },
  {
    label: 'Media impresa',
    value: 'md'
  },
  {
    label: 'Grande impresa',
    value: 'lg'
  }
]

exports.legalFormOptions = legalFormOptions
exports.imports = imports
exports.compCatOptions = compCatOptions
