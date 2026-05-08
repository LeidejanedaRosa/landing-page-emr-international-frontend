/**
 * Company registration and legal information
 *
 * ⚠️ TODO: Update with actual company data before production deployment
 *
 * References:
 * - CNPJ: Cadastro Nacional da Pessoa Jurídica (Brazilian tax ID)
 * - CREA: Conselho Regional de Engenharia e Agronomia (Professional registration)
 *
 * @see https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cnpj
 * @see https://www.confea.org.br/
 *//**
 * Company legal registration data
 * Must be updated with actual values before production deployment
 */
export const COMPANY_LEGAL_INFO = {
  /**
   * CNPJ - Brazilian National Registry of Legal Entities
   * Format: XX.XXX.XXX/XXXX-XX
   * TODO: Replace with actual CNPJ from company documentation
   */
  cnpj: '00.000.000/0000-00',

  /**
   * CREA - Regional Council of Engineering and Agronomy registration number
   * TODO: Replace with actual CREA registration from professional credentials
   * Note: Only required if company provides engineering services requiring CREA registration
   */
  creaRegistration: '000000',

  /**
   * Company legal name (Razão Social)
   * TODO: Verify if this matches official company registration documents
   */
  legalName: 'EMR International',

  /**
   * Full company address
   * TODO: Add complete address for legal compliance
   */
  address: {
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Brasil',
  },

  /**
   * Contact information for legal/administrative purposes
   * TODO: Add official company contact details
   */
  contact: {
    email: '',
    phone: '',
    whatsapp: '',
  },
} as const

/**
 * Validates if company legal info has been updated from placeholder values
 * @returns true if data appears to be placeholder values
 */
export const hasPlaceholderData = (): boolean => {
  return (
    COMPANY_LEGAL_INFO.cnpj === '00.000.000/0000-00' ||
    COMPANY_LEGAL_INFO.creaRegistration === '000000'
  )
}

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
