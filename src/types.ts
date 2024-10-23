export interface Country {
  name: string
  countryCode: string
}

export interface Holiday {
  date: string
  localName: string
  name: string
  countryCode: string
  fixed: boolean
  global: boolean
  counties?: string[]
  launchYear?: number | null
  type?: string[]
}

export interface CountryDetails {
  commonName: string
  officialName: string
  countryCode: string
  region: string
  borders: BorderCountry[] | null
}

export interface BorderCountry {
  commonName: string
  officialName: string
  countryCode: string
  region: string
  borders: null
}
