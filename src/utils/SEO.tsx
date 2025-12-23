import React from 'react'

import { Helmet } from 'react-helmet-async'

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

const DEFAULT_TITLE =
  'EMR Internacional | APH Tático e Emergência em Áreas Remotas'
const DEFAULT_DESCRIPTION =
  'Formação de Operadores de Emergência Tática e APH Tático (TECC). Cursos de Wilderness Medicine e emergências em áreas remotas. Treinamentos onde o convencional não alcança.'
const DEFAULT_KEYWORDS =
  'APH Tático, operador de emergência tática, TECC, Emergência, Áreas Remotas, Atendimento Pré-Hospitalar, Treinamento Tático, EMR Internacional, socorrista tático, medicina tática, TCCC, medicina de combate'
const DEFAULT_IMAGE = 'https://www.emrinternacional.com/social-image.jpg'
const DEFAULT_URL = 'https://www.emrinternacional.com/'

const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_IMAGE,
  ogUrl = DEFAULT_URL,
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonical = DEFAULT_URL,
  // eslint-disable-next-line complexity
}) => (
  <Helmet>
    <title>{title}</title>

    <meta name='description' content={description} />
    <meta name='keywords' content={keywords} />

    <meta property='og:type' content='website' />
    <meta property='og:locale' content='pt_BR' />
    <meta property='og:title' content={ogTitle || title} />
    <meta property='og:description' content={ogDescription || description} />
    <meta property='og:image' content={ogImage} />
    <meta property='og:url' content={ogUrl} />

    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:title' content={twitterTitle || title} />
    <meta
      name='twitter:description'
      content={twitterDescription || description}
    />
    <meta name='twitter:image' content={twitterImage || ogImage} />

    <link rel='canonical' href={canonical} />
  </Helmet>
)

export default SEO
