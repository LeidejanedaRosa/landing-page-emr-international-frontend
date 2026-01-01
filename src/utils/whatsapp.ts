export const WHATSAPP_CONFIG = {
  phoneNumber: '5519971575640',
  baseUrl: 'https://wa.me',
} as const

export const getWhatsAppUrl = (
  phoneNumber: string = WHATSAPP_CONFIG.phoneNumber
) => `${WHATSAPP_CONFIG.baseUrl}/${phoneNumber}`

export const buildWhatsAppMessageUrl = (
  message: string,
  phoneNumber: string = WHATSAPP_CONFIG.phoneNumber
): string => {
  const encodedMessage = encodeURIComponent(message)
  return `${getWhatsAppUrl(phoneNumber)}?text=${encodedMessage}`
}

export const buildCourseWhatsAppUrl = (courseTitle: string): string => {
  const message = `Olá! Tenho interesse no curso ${courseTitle}. Gostaria de mais informações.`
  return buildWhatsAppMessageUrl(message)
}
