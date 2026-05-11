export const COMPANY_LEGAL_INFO = {
  cnpj: '31.347.059/0001-84',
  legalName: 'EMR International',
  address: {
    street: 'Avenida Irmãos Picarelli',
    number: '245',
    complement: 'Andar 2, Sala 24',
    neighborhood: 'Centro',
    city: 'Socorro',
    state: 'SP',
    zipCode: '13960-069',
    country: 'Brasil',
  },
  contact: {
    email: 'info@emr.international',
    phone: '',
    whatsapp: '5519971575640',
  },
} as const

/**
 * Formats CNPJ for display
 * @param cnpj - CNPJ string with or without formatting
 * @returns Formatted CNPJ string
 */
export const formatCNPJ = (cnpj: string): string => {
  const digits = cnpj.replace(/\D/g, '')
  if (digits.length !== 14) return cnpj

  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  )
}
