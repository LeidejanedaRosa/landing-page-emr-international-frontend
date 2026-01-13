interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: number
}

export const generateSitemap = (urls: SitemapUrl[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
  const urlsetOpen =
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  const urlsetClose = '</urlset>'

  const urlsXml = urls
    .map(url => {
      let urlXml = `  <url>\n    <loc>${url.loc}</loc>`

      if (url.lastmod) {
        urlXml += `\n    <lastmod>${url.lastmod}</lastmod>`
      }

      if (url.changefreq) {
        urlXml += `\n    <changefreq>${url.changefreq}</changefreq>`
      }

      if (url.priority !== undefined) {
        urlXml += `\n    <priority>${url.priority}</priority>`
      }

      urlXml += '\n  </url>'
      return urlXml
    })
    .join('\n\n')

  return `${xmlHeader}\n${urlsetOpen}\n\n${urlsXml}\n\n${urlsetClose}\n`
}

export const sitemapUrls: SitemapUrl[] = [
  {
    loc: 'https://www.emrinternacional.com/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    loc: 'https://www.emrinternacional.com/curso/aph-tatico',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://www.emrinternacional.com/curso/emergencia-areas-remotas',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://www.emrinternacional.com/contact',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.6,
  },
]
