import React from 'react'

import {
  Activity,
  AlertTriangle,
  Ambulance,
  Clock,
  Crosshair,
  MapPin,
  Plane,
  Scissors,
  Skull,
  Trees,
  TrendingDown,
  Users,
  Wrench,
} from 'lucide-react'

const GRID_CLASSES = {
  HIGHLIGHT: 'col-span-1 md:col-span-3 lg:col-span-6 lg:row-span-2',
  WIDE: 'col-span-1 md:col-span-3 lg:col-span-6 lg:row-span-1',
  MEDIUM: 'col-span-1 md:col-span-3 lg:col-span-3 lg:row-span-1',
  REGULAR: 'col-span-1 md:col-span-3 lg:col-span-auto lg:row-span-1',
} as const

export const whyItMattersData: TabData[] = [
  {
    id: 'tactical',
    label: 'Área Tática',
    icon: <Crosshair className='w-6 h-6' aria-hidden='true' />,
    statistics: [
      {
        id: 'death-time',
        icon: (
          <Clock
            className='w-10 h-10 opacity-30 text-white'
            aria-hidden='true'
          />
        ),
        value: '3–5 minutos',
        label:
          'Tempo para óbito por sangramento arterial crítico sem intervenção.',
        highlight: true,
        subtext: 'O dado mais importante de todos.',
        className: GRID_CLASSES.HIGHLIGHT,
      },
      {
        id: 'preventable',
        icon: (
          <AlertTriangle
            className='w-10 h-10 text-red-500'
            aria-hidden='true'
          />
        ),
        value: '35–45%',
        label:
          'Mortes traumáticas potencialmente evitáveis atribuídas à hemorragia externa grave.',
        subtext: 'Dados civis + militares.',
        className: GRID_CLASSES.WIDE,
      },
      {
        id: 'before-help',
        icon: <Users className='w-10 h-10 text-red-500' aria-hidden='true' />,
        value: '60%',
        label:
          'Dos óbitos por violência urbana ocorrem antes da chegada do socorro.',
        subtext: 'Geralmente por sangramento não controlado.',
        className: GRID_CLASSES.WIDE,
      },
      {
        id: 'response-time',
        icon: (
          <Ambulance className='w-10 h-10 text-red-500' aria-hidden='true' />
        ),
        value: '7–15 min',
        label: 'Tempo médio de resposta em grandes centros urbanos.',
        subtext: 'Favelas e áreas difíceis: +20–30 min.',
        className: GRID_CLASSES.REGULAR,
      },
      {
        id: 'gunshot',
        icon: (
          <Crosshair className='w-10 h-10 text-red-500' aria-hidden='true' />
        ),
        value: '20–25%',
        label:
          'Feridos por arma de fogo em extremidades com hemorragia compressível.',
        subtext: 'Tipo exato evitável com torniquete.',
        className: GRID_CLASSES.REGULAR,
      },
      {
        id: 'civilian-first',
        icon: (
          <Activity className='w-10 h-10 text-red-500' aria-hidden='true' />
        ),
        value: '80%',
        label:
          'Dos incidentes táticos têm vítimas civis como primeiros respondentes.',
        subtext: 'Não equipes especializadas.',
        className: GRID_CLASSES.REGULAR,
      },
      {
        id: 'tourniquet',
        icon: <Wrench className='w-10 h-10 text-red-500' aria-hidden='true' />,
        value: '90%',
        label:
          'Sucesso no controle de hemorragias quando torniquetes são aplicados corretamente.',
        subtext: '',
        className: GRID_CLASSES.REGULAR,
      },
    ],
  },
  {
    id: 'remote',
    label: 'Área Remota',
    icon: <Trees className='w-6 h-6' aria-hidden='true' />,
    statistics: [
      {
        id: 'remote-response',
        icon: (
          <Clock
            className='w-10 h-10 opacity-30 text-white'
            aria-hidden='true'
          />
        ),
        value: '30–45 min',
        label: 'Tempo comum de resposta em áreas rurais.',
        highlight: true,
        subtext: 'Pode ultrapassar 1–2 horas em regiões isoladas.',
        className: GRID_CLASSES.HIGHLIGHT,
      },
      {
        id: 'sharp-objects',
        icon: (
          <Scissors className='w-10 h-10 text-red-500' aria-hidden='true' />
        ),
        value: '40%',
        label: 'Lesões com objetos cortantes em campo envolvem membros.',
        subtext: 'Facão, machado, ferramentas agrícolas.',
        className: GRID_CLASSES.WIDE,
      },
      {
        id: 'survival-rate',
        icon: (
          <TrendingDown className='w-10 h-10 text-red-500' aria-hidden='true' />
        ),
        value: '30–70%',
        label:
          'Redução na mortalidade quando há alguém treinado no primeiro atendimento.',
        subtext: '',
        className: GRID_CLASSES.REGULAR,
      },
      {
        id: 'air-rescue',
        icon: <Plane className='w-10 h-10 text-red-500' aria-hidden='true' />,
        value: '+60 min',
        label:
          'Média de tempo para ativação/chegada de resgate aéreo no Brasil.',
        subtext: '',
        className: GRID_CLASSES.MEDIUM,
      },

      {
        id: 'top-killer',
        icon: <Skull className='w-10 h-10 text-red-500' aria-hidden='true' />,
        value: '#1 Causa',
        label:
          'Hemorragia é a maior causa de morte evitável no ambiente remoto.',
        subtext: 'Antes do atendimento definitivo.',
        className: GRID_CLASSES.REGULAR,
      },
      {
        id: 'wilderness-trauma',
        icon: <Trees className='w-10 h-10 text-red-500' aria-hidden='true' />,
        value: '50%',
        label:
          'Resgates em áreas selvagens envolvem trauma, quedas ou lacerações.',
        subtext: 'Risco real de hemorragia.',
        className: GRID_CLASSES.REGULAR,
      },

      {
        id: 'extremities',
        icon: (
          <Activity className='w-10 h-10 text-red-500' aria-hidden='true' />
        ),
        value: '70%',
        label: 'Hemorragias graves em áreas remotas são em extremidades.',
        subtext: 'Onde torniquete e pressão direta salvam.',
        className: GRID_CLASSES.REGULAR,
      },
      {
        id: 'isolation',
        icon: <MapPin className='w-10 h-10 text-red-500' aria-hidden='true' />,
        value: '85%',
        label:
          'Das vítimas dependem exclusivamente de companheiros para sobreviver.',
        subtext: 'Até a chegada do resgate.',
        className: GRID_CLASSES.REGULAR,
      },
    ],
  },
]

export interface StatisticData {
  id: string
  icon: React.ReactNode
  value: string
  label: string
  highlight?: boolean
  subtext?: string
  className?: string
}
export interface TabData {
  id: string
  label: string
  icon: React.ReactNode
  statistics: StatisticData[]
}
