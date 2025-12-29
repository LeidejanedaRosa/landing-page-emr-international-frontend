import { memo } from 'react'

import type {
  FullTestimonial,
  ImageOnlyTestimonial,
  TestimonialCardProps,
  TextOnlyTestimonial,
} from '../types'
import { CourseTypeTag } from './CourseTypeTag'
import { StarRating } from './StarRating'
import { TestimonialImage } from './TestimonialImage'

interface TestimonialAuthorProps {
  authorName?: string
  authorRole?: string
  companyName?: string
}

const TestimonialAuthor = memo<TestimonialAuthorProps>(
  ({ authorName, authorRole, companyName }) => (
    <footer className='mt-auto'>
      <cite className='not-italic'>
        {authorName && (
          <p className='text-white font-semibold text-lg'>{authorName}</p>
        )}
        {authorRole && <p className='text-primary-300 text-sm'>{authorRole}</p>}
      </cite>
      {companyName && (
        <p className='text-cta-400 text-sm font-medium mt-2'>{companyName}</p>
      )}
    </footer>
  )
)

TestimonialAuthor.displayName = 'TestimonialAuthor'

const CARD_HEIGHT = 'h-[400px] md:h-[450px] lg:h-[400px]'

const ImageOnlyVariant = memo<{ testimonial: ImageOnlyTestimonial }>(
  ({ testimonial }) => {
    const { courseType, images, companyName } = testimonial

    return (
      <article className={`animate-fade-in w-full ${CARD_HEIGHT}`}>
        <figure className='relative h-full overflow-hidden'>
          <TestimonialImage images={images} />
          <div className='absolute top-3 left-3 md:top-4 md:left-4'>
            <CourseTypeTag courseType={courseType} />
          </div>
          {companyName && (
            <figcaption className='absolute bottom-3 left-3 md:bottom-4 md:left-4'>
              <p className='text-white text-lg md:text-2xl font-bold drop-shadow-lg'>
                {companyName}
              </p>
            </figcaption>
          )}
        </figure>
      </article>
    )
  }
)

ImageOnlyVariant.displayName = 'ImageOnlyVariant'

const TextOnlyVariant = memo<{ testimonial: TextOnlyTestimonial }>(
  ({ testimonial }) => {
    const { courseType, testimonialText, rating, authorName, authorRole } =
      testimonial

    return (
      <article className={`animate-fade-in w-full ${CARD_HEIGHT}`}>
        <div className='relative h-full overflow-hidden p-4 sm:p-6 md:p-12 flex flex-col justify-center max-w-2xl mx-auto'>
          <div className='mb-3 md:mb-4'>
            <CourseTypeTag courseType={courseType} />
          </div>

          {rating !== undefined && <StarRating rating={rating} />}

          {testimonialText && (
            <blockquote className='text-base md:text-xl font-medium text-white my-3 md:my-4 leading-relaxed text-balance'>
              <p>&ldquo;{testimonialText}&rdquo;</p>
            </blockquote>
          )}

          {(authorName || authorRole) && (
            <TestimonialAuthor
              authorName={authorName}
              authorRole={authorRole}
            />
          )}
        </div>
      </article>
    )
  }
)

TextOnlyVariant.displayName = 'TextOnlyVariant'

const FullVariant = memo<{ testimonial: FullTestimonial }>(
  ({ testimonial }) => {
    const {
      courseType,
      images,
      companyName,
      testimonialText,
      rating,
      authorName,
      authorRole,
    } = testimonial

    return (
      <article
        className={`grid ${images ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-0 animate-fade-in w-full ${CARD_HEIGHT}`}
      >
        {images && (
          <figure className='relative h-full overflow-hidden'>
            <TestimonialImage images={images} />
            <div className='absolute top-3 left-3 md:top-4 md:left-4'>
              <CourseTypeTag courseType={courseType} />
            </div>
          </figure>
        )}

        <div className='p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-primary-900/40 min-w-0 overflow-hidden'>
          {!images && (
            <div className='mb-4'>
              <CourseTypeTag courseType={courseType} />
            </div>
          )}

          {rating !== undefined && <StarRating rating={rating} />}

          {testimonialText && (
            <blockquote className='text-base md:text-xl lg:text-2xl font-medium text-white my-3 md:my-4 leading-relaxed'>
              <p>&ldquo;{testimonialText}&rdquo;</p>
            </blockquote>
          )}

          <TestimonialAuthor
            authorName={authorName}
            authorRole={authorRole}
            companyName={companyName}
          />
        </div>
      </article>
    )
  }
)

FullVariant.displayName = 'FullVariant'

export const TestimonialCard = memo<TestimonialCardProps>(({ testimonial }) => {
  switch (testimonial.variant) {
    case 'image-only':
      return <ImageOnlyVariant testimonial={testimonial} />
    case 'text-only':
      return <TextOnlyVariant testimonial={testimonial} />
    case 'full':
      return <FullVariant testimonial={testimonial} />
  }
})

TestimonialCard.displayName = 'TestimonialCard'
