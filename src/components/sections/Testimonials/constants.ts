export const TESTIMONIALS_CONFIG = {
  autoPlayDelay: 5000,
  transitionDuration: 300,
} as const

export const TESTIMONIALS_A11Y = {
  sectionLabel: 'Depoimentos de alunos',
  roleDescription: 'carrossel de depoimentos',
  slideAnnouncement: (authorName: string, current: number, total: number) =>
    `Depoimento de ${authorName} - ${current} de ${total}`,
  previousButton: 'Depoimento anterior',
  nextButton: 'Próximo depoimento',
  goToSlide: (index: number) => `Ir para depoimento ${index}`,
  counter: (current: number, total: number) => `${current} de ${total}`,
  slideLabel: (current: number, total: number) =>
    `Depoimento ${current} de ${total}`,
} as const

export const PROGRESS_KEYFRAMES = `
  @keyframes progress {
    from { width: 0%; }
    to { width: 100%; }
  }
`
