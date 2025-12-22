export interface HeroProps {
  onCtaClick?: () => void
  imageSrc?: string
  className?: string
}

export interface HeroVisualProps {
  imageSrc: string
  alt?: string
  className?: string
}

export interface HeroCTAProps {
  onClick?: () => void
  text?: string
  ariaLabel?: string
}

export interface TrustBadgeProps {
  label?: string
  ariaLabel?: string
}

export interface SocialProofProps {
  studentsText?: string
  methodologyText?: string
}
