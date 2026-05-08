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

const DEFAULTS = {
  title: 'EMR International | APH Tático e Áreas Remotas',
  description:
    'Formação em Emergência Tática e APH Tático (TECC). Cursos de Wilderness Medicine e emergências em áreas remotas com certificação internacional.',
  keywords:
    'APH Tático, operador de emergência tática, TECC, Emergência, Áreas Remotas, Atendimento Pré-Hospitalar, Treinamento Tático, EMR International, socorrista tático, medicina tática, TCCC, medicina de combate',
  image: 'https://www.emrinternational.com/social-image.jpg',
  url: 'https://www.emrinternational.com/',
} as const

const resolveBaseProps = (props: SEOProps) => ({
  title: props.title ?? DEFAULTS.title,
  description: props.description ?? DEFAULTS.description,
  keywords: props.keywords ?? DEFAULTS.keywords,
  ogImage: props.ogImage ?? DEFAULTS.image,
  ogUrl: props.ogUrl ?? DEFAULTS.url,
  canonical: props.canonical ?? DEFAULTS.url,
})

const resolveSocialProps = (
  props: SEOProps,
  base: ReturnType<typeof resolveBaseProps>
) => ({
  ogTitle: props.ogTitle ?? base.title,
  ogDescription: props.ogDescription ?? base.description,
  twitterTitle: props.twitterTitle ?? base.title,
  twitterDescription: props.twitterDescription ?? base.description,
  twitterImage: props.twitterImage ?? base.ogImage,
})

const SEO = (props: SEOProps) => {
  const base = resolveBaseProps(props)
  const social = resolveSocialProps(props, base)

  return (
    <>
      <title>{base.title}</title>

      <meta name='description' content={base.description} />
      <meta name='keywords' content={base.keywords} />
      <meta name='robots' content='index, follow' />

      <meta property='og:type' content='website' />
      <meta property='og:locale' content='pt_BR' />
      <meta property='og:site_name' content='EMR International' />
      <meta property='og:title' content={social.ogTitle} />
      <meta property='og:description' content={social.ogDescription} />
      <meta property='og:image' content={base.ogImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:url' content={base.ogUrl} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={social.twitterTitle} />
      <meta name='twitter:description' content={social.twitterDescription} />
      <meta name='twitter:image' content={social.twitterImage} />

      <link rel='canonical' href={base.canonical} />
    </>
  )
}

export default SEO
