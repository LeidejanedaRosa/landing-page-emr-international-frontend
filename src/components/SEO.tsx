import React, { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonical?: string
}

const updateMetaTag = (name: string, content: string, property = false) => {
  const attribute = property ? 'property' : 'name'
  let element = document.querySelector(`meta[${attribute}="${name}"]`)

  if (element) {
    element.setAttribute('content', content)
  } else {
    element = document.createElement('meta')
    element.setAttribute(property ? 'property' : 'name', name)
    element.setAttribute('content', content)
    document.head.appendChild(element)
  }
}

const updateCanonicalUrl = (canonical: string) => {
  let canonicalElement = document.querySelector('link[rel="canonical"]')
  if (canonicalElement) {
    canonicalElement.setAttribute('href', canonical)
  } else {
    canonicalElement = document.createElement('link')
    canonicalElement.setAttribute('rel', 'canonical')
    canonicalElement.setAttribute('href', canonical)
    document.head.appendChild(canonicalElement)
  }
}

const SEO: React.FC<SEOProps> = ({
  title = 'EMR Internacional | APH Tático e Emergência em Áreas Remotas',
  description = 'A EMR Internacional oferece cursos de Atendimento Pré-Hospitalar Tático (APH Tático) e Emergência em Áreas Remotas. Treinamentos onde o convencional não alcança.',
  keywords = 'APH Tático, Emergência, Áreas Remotas, Atendimento Pré-Hospitalar, Treinamento Tático, EMR Internacional',
  ogTitle,
  ogDescription,
  ogImage = 'https://www.emrinternacional.com/social-image.jpg',
  ogUrl = 'https://www.emrinternacional.com/',
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonical = 'https://www.emrinternacional.com/',
}) => {
  useEffect(() => {
    document.title = title

    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)

    updateMetaTag('og:title', ogTitle || title, true)
    updateMetaTag('og:description', ogDescription || description, true)
    updateMetaTag('og:image', ogImage, true)
    updateMetaTag('og:url', ogUrl, true)

    updateMetaTag('twitter:title', twitterTitle || title)
    updateMetaTag('twitter:description', twitterDescription || description)
    updateMetaTag('twitter:image', twitterImage || ogImage)

    updateCanonicalUrl(canonical)
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonical,
  ])

  return null
}

export default SEO
