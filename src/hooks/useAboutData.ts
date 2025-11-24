import { useMemo } from 'react'

import { aboutData } from '../data/aboutData'
import { generateId } from '../utils/accessibility/helpers'

export const useAboutData = () => {
  const sectionId = useMemo(() => generateId('about-section'), [])
  const headingId = useMemo(() => generateId('about-heading'), [])
  const expertiseListId = useMemo(() => generateId('expertise-list'), [])

  const expertiseWithIds = useMemo(
    () =>
      aboutData.expertise.map(item => ({
        ...item,
        uniqueId: generateId(`expertise-${item.id}`),
      })),
    []
  )

  const enrichedData = useMemo(
    () => ({
      ...aboutData,
      ids: {
        section: sectionId,
        heading: headingId,
        expertiseList: expertiseListId,
      },
      expertise: expertiseWithIds,
    }),
    [sectionId, headingId, expertiseListId, expertiseWithIds]
  )

  return {
    data: enrichedData,
    sectionId,
    headingId,
    expertiseListId,
  }
}

export const useImageLoading = () => {
  const handleImageLoad = (imageName: string) => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log(`Imagem carregada: ${imageName}`)
    }
  }

  const handleImageError = (imageName: string, error: Event) => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error(`Erro ao carregar ${imageName}:`, error)
    }
  }

  return {
    handleImageLoad,
    handleImageError,
  }
}
