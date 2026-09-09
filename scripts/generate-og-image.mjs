// @ts-check
/**
 * Generates the social share image (Open Graph / Twitter card) referenced by
 * `index.html` as `%SITE_URL%/social-image.jpg`.
 *
 * Output: public/social-image.jpg — 1200x630 (the 1.91:1 ratio LinkedIn,
 * Facebook and WhatsApp expect for `summary_large_image`).
 *
 * Reproducible on purpose: rerun `npm run og:image` whenever the brand assets
 * or the tagline change, then commit the regenerated file.
 *
 * Text is rendered with Liberation Sans (metric-compatible with Arial, present
 * on Linux/CI) for portability — not the decorative brand display font.
 */
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUTPUT = path.join(ROOT, 'public', 'social-image.jpg')

const WIDTH = 1200
const HEIGHT = 630

const BRAND_RED = '#CC0000'

const asset = (...segments) => path.join(ROOT, 'src', 'assets', ...segments)

const FONT_STACK = "'Liberation Sans', 'DejaVu Sans', Arial, sans-serif"

const HEADLINE_LINES = ['APH Tático & Emergências', 'em Áreas Remotas']
const SUBHEADLINE = 'Certificação internacional · TECC · Wilderness Medicine'

const escapeXml = value =>
  value.replace(
    /[<>&'"]/g,
    char =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&apos;',
        '"': '&quot;',
      })[char]
  )

/** Dark gradient + text block composited over the photo for legibility. */
const overlaySvg = () => {
  const [line1, line2] = HEADLINE_LINES
  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.45" />
      <stop offset="40%" stop-color="#000000" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.92" />
    </linearGradient>
    <linearGradient id="sideScrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.7" />
      <stop offset="55%" stop-color="#000000" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#scrim)" />
  <rect y="300" width="${WIDTH}" height="330" fill="url(#sideScrim)" />
  <rect x="80" y="352" width="72" height="8" fill="${BRAND_RED}" />
  <text x="80" y="432" font-family="${FONT_STACK}" font-size="56" font-weight="bold" fill="#FFFFFF">
    ${escapeXml(line1)}
  </text>
  <text x="80" y="498" font-family="${FONT_STACK}" font-size="56" font-weight="bold" fill="#FFFFFF">
    ${escapeXml(line2)}
  </text>
  <text x="80" y="552" font-family="${FONT_STACK}" font-size="27" fill="#E5E7EB">
    ${escapeXml(SUBHEADLINE)}
  </text>
</svg>`
}

async function main() {
  const background = await sharp(asset('hero', 'bg_hero_section.jpg'))
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'top' })
    .modulate({ brightness: 0.75, saturation: 0.85 })
    .toBuffer()

  const logo = await sharp(asset('logo_emr_international.svg'), {
    density: 300,
  })
    .resize({ width: 320 })
    .png()
    .toBuffer()

  await sharp(background)
    .composite([
      { input: Buffer.from(overlaySvg()), top: 0, left: 0 },
      { input: logo, top: 64, left: 72 },
    ])
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(OUTPUT)

  const { width, height } = await sharp(OUTPUT).metadata()
  const { size } = await stat(OUTPUT)
  console.log(
    `✓ ${path.relative(ROOT, OUTPUT)} — ${width}x${height}, ${Math.round(size / 1024)} KB`
  )
}

main().catch(error => {
  console.error('✗ Failed to generate social image:', error)
  process.exitCode = 1
})
