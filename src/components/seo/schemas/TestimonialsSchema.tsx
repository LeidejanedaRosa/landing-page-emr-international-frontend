import type {
  FullTestimonial,
  Testimonial,
  TextOnlyTestimonial,
} from '../../sections/Testimonials/types'
import { JsonLdScript } from '../JsonLdScript'

const COMPANY_URL = 'https://www.emrinternacional.com'

interface TestimonialsSchemaProps {
  testimonials: Testimonial[]
}

type TestimonialWithRating =
  | FullTestimonial
  | (TextOnlyTestimonial & { rating: number })

function hasRatingAndText(t: Testimonial): t is TestimonialWithRating {
  return (
    (t.variant === 'full' || t.variant === 'text-only') &&
    'rating' in t &&
    typeof t.rating === 'number' &&
    'testimonialText' in t
  )
}

export function TestimonialsSchema({ testimonials }: TestimonialsSchemaProps) {
  const testimonialsWithRating = testimonials.filter(hasRatingAndText)

  if (testimonialsWithRating.length === 0) {
    return null
  }

  const totalRating = testimonialsWithRating.reduce(
    (sum, t) => sum + t.rating,
    0
  )
  const averageRating = totalRating / testimonialsWithRating.length

  const reviews = testimonialsWithRating.map(testimonial => ({
    '@type': 'Review' as const,
    reviewRating: {
      '@type': 'Rating' as const,
      ratingValue: testimonial.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person' as const,
      name: testimonial.authorName,
      jobTitle: testimonial.authorRole,
    },
    reviewBody: testimonial.testimonialText,
    itemReviewed: {
      '@type': 'Organization' as const,
      '@id': `${COMPANY_URL}/#organization`,
    },
  }))

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization' as const,
    '@id': `${COMPANY_URL}/#organization`,
    name: 'EMR Internacional',
    aggregateRating: {
      '@type': 'AggregateRating' as const,
      ratingValue: averageRating.toFixed(1),
      bestRating: 5,
      worstRating: 1,
      ratingCount: testimonialsWithRating.length,
      reviewCount: testimonialsWithRating.length,
    },
    review: reviews,
  }

  return <JsonLdScript data={aggregateRatingSchema} />
}
