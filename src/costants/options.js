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
  'fino a 50.000€',
  'da 50.000€ a 150.000€',
  'da 150.000 a 258.000€',
  'da 258.000 a 500.000€',
  'oltre 500.000€'
]

const compCatOptions = [
  {
    label: 'Micro impresa',
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
