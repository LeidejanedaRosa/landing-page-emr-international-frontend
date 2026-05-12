export interface HeroImages {
  avif?: string
  webp?: string
  jpg: string
}

export interface HeroProps {
  onCtaClick?: () => void
  images?: HeroImages
  className?: string
}

export interface HeroVisualProps {
  images: HeroImages
  alt?: string
  className?: string
}

export interface HeroCTAProps {
  onClick?: () => void
  text?: string
}

export interface TrustBadgeProps {
  label?: string
  ariaLabel?: string
}

export interface SocialProofProps {
  studentsText?: string
  methodologyText?: string
}
