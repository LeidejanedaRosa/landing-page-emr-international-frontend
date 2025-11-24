import React from 'react'

export interface ExpertiseItem {
  id: string
  text: React.ReactNode
  ariaLabel?: string
}

export interface AboutData {
  overline: string
  title: string
  subtitle: string
  description: string
  expertise: ExpertiseItem[]
  instructor: {
    name: string
    credentials: string
    image: {
      src: string
      alt: string
    }
    backgroundImage: {
      src: string
      alt: string
    }
  }
}

export const aboutData: AboutData = {
  overline: 'Quem está por trás da',
  title: 'EMR INTERNACIONAL',
  subtitle: 'Juan Regenerati',
  description:
    'Formado em Saúde e Segurança do Trabalho e Paramédico, é instrutor certificado em emergências médicas com vasta experiência e especialização em:',
  expertise: [
    {
      id: 'resgate-tatico',
      ariaLabel:
        'Especialização em Resgate Tático e atendimento pré-hospitalar',
      text: (
        <>
          <strong>Resgate Tático</strong> em zonas de conflito e atendimento
          pré-hospitalar em <strong>ambientes remotos e de alto risco</strong>.
        </>
      ),
    },
    {
      id: 'capacitacao-forcas',
      ariaLabel: 'Capacitação de forças operacionais militares e de segurança',
      text: (
        <>
          <strong>Capacitação de forças operacionais</strong> — incluindo{' '}
          <strong>Corpo de Bombeiros</strong>,{' '}
          <strong>Exército Brasileiro</strong> e <strong>Força Nacional</strong>{' '}
          — com foco em protocolos de emergência real.
        </>
      ),
    },
    {
      id: 'certificacoes-internacionais',
      ariaLabel:
        'Certificações internacionais reconhecidas por organizações americanas',
      text: (
        <>
          <strong>Certificações internacionais</strong> reconhecidas por{' '}
          <strong>HSI</strong>, <strong>American College of Surgeons</strong> e{' '}
          <strong>American Red Cross</strong>.
        </>
      ),
    },
  ],
  instructor: {
    name: 'Juan Regenerati',
    credentials: 'Paramédico e Instrutor Certificado em Emergências Médicas',
    image: {
      src: '/src/assets/Juan.png',
      alt: 'Juan Regenerati, instrutor principal da EMR Internacional, paramédico especializado em emergências médicas e resgate tático',
    },
    backgroundImage: {
      src: '/src/assets/fundo_about.png',
      alt: 'Cenário de treinamento de emergência médica',
    },
  },
}
