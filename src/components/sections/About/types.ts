export interface Credential {
  id: string
  label: string
}

export interface Metric {
  id: string
  value: string
  label: string
  ariaLabel: string
  highlight?: boolean
}

export interface CredentialsListProps {
  headingId: string
  title: string
  description?: string
  items: Credential[]
  icon: 'check' | 'star'
  ariaLabel: string
}

export interface MetricCardProps {
  value: string
  label: string
  ariaLabel: string
  highlight?: boolean
}

export interface InstructorInfo {
  name: string
  subtitle: string
  title: string
  description: string
  highlight: string
}
