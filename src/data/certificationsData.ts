import logo1Avif from '../assets/certifications/logo-certificacao_1.avif'
import logo1Jpg from '../assets/certifications/logo-certificacao_1.jpg'
import logo1Webp from '../assets/certifications/logo-certificacao_1.webp'
import logo2Avif from '../assets/certifications/logo-certificacao_2.avif'
import logo2Jpg from '../assets/certifications/logo-certificacao_2.jpg'
import logo2Webp from '../assets/certifications/logo-certificacao_2.webp'
import logo3Avif from '../assets/certifications/logo-certificacao_3.avif'
import logo3Jpg from '../assets/certifications/logo-certificacao_3.jpg'
import logo3Webp from '../assets/certifications/logo-certificacao_3.webp'
import logo4Avif from '../assets/certifications/logo-certificacao_4.avif'
import logo4Jpg from '../assets/certifications/logo-certificacao_4.jpg'
import logo4Webp from '../assets/certifications/logo-certificacao_4.webp'
import logo5Avif from '../assets/certifications/logo-certificacao_5.avif'
import logo5Jpg from '../assets/certifications/logo-certificacao_5.jpg'
import logo5Webp from '../assets/certifications/logo-certificacao_5.webp'

export interface CertificationLogo {
  avif: string
  webp: string
  jpg: string
}

export interface Certification {
  id: string
  name: string
  organization: string
  description: string
  year: string
  logo: CertificationLogo
}

export const certifications: Certification[] = [
  {
    id: 'hsi',
    name: 'Health & Safety Institute',
    organization: 'Health & Safety Institute',
    description:
      'Instrutor credenciado pelo Health & Safety Institute (HSI), uma das maiores referências mundiais em educação em saúde, segurança e resposta a emergências. O HSI reúne marcas de excelência como 24-7 EMS, Medic First Aid, ASHI, EMS Safety Services e o inovador AVIRT (Active Violence Immediate Response Training) programa focado em resposta imediata a incidentes de violência ativa, combinando técnicas de controle de hemorragias e tomada de decisão sob estresse. A HSI forma profissionais capazes de agir com eficácia, confiança e padronização em qualquer cenário do ambiente industrial às operações táticas.',
    year: '2025',
    logo: { avif: logo1Avif, webp: logo1Webp, jpg: logo1Jpg },
  },
  {
    id: 'naui',
    name: 'National Association of Underwater Instructors',
    organization: 'National Association of Underwater Instructors',
    description:
      'Instrutor vinculado à National Association of Underwater Instructors (NAUI), uma das mais tradicionais e respeitadas organizações de mergulho autônomo do mundo. A NAUI é reconhecida por seus padrões rigorosos de segurança e excelência educacional na formação de mergulhadores, instrutores e especialistas em resgate subaquático. Os programas da NAUI enfatizam autonomia, consciência situacional e gestão de emergências aquáticas, sendo amplamente adotados em treinamentos civis, militares e de operações de busca e salvamento.',
    year: '2025',
    logo: { avif: logo2Avif, webp: logo2Webp, jpg: logo2Jpg },
  },
  {
    id: 'acs',
    name: 'American College of Surgeons',
    organization: 'American College of Surgeons',
    description:
      'Instrutor certificado pelo programa Stop the Bleed, uma iniciativa global do American College of Surgeons (ACS) em parceria com o Committee on Trauma (CoT). O curso capacita profissionais e civis a reconhecer e controlar hemorragias graves, utilizando técnicas baseadas em evidências e protocolos internacionais de APH Tático. O programa é reconhecido internacionalmente como padrão ouro em controle de sangramento, sendo parte essencial da resposta imediata a traumas em ambientes civis e de alta ameaça.',
    year: '2025',
    logo: { avif: logo3Avif, webp: logo3Webp, jpg: logo3Jpg },
  },
  {
    id: 'ctecc',
    name: 'Committee for Tactical Emergency Casualty Care',
    organization: 'Committee for Tactical Emergency Casualty Care',
    description:
      'Instrutor com formação alinhada aos protocolos do Committee for Tactical Emergency Casualty Care (C-TECC), organização responsável por estabelecer diretrizes de APH Tático para o contexto civil e operacional. O C-TECC estabelece as melhores práticas para o atendimento a múltiplas vítimas em cenários de alta ameaça, integrando princípios de segurança, operações médicas táticas e coordenação interagências. Esses protocolos são amplamente adotados por equipes de resposta tática, forças de segurança e serviços de emergência médica em todo o mundo.',
    year: '2025',
    logo: { avif: logo4Avif, webp: logo4Webp, jpg: logo4Jpg },
  },
  {
    id: 'arc',
    name: 'American Red Cross',
    organization: 'American Red Cross',
    description:
      'Instrutor afiliado à American Red Cross, instituição humanitária de alcance global e referência em formação de socorristas, resposta a desastres e educação em emergências médicas. A Cruz Vermelha Americana é pioneira na criação de protocolos e treinamentos de primeiros socorros, RCP/AED, suporte básico de vida e resposta comunitária a emergências, mantendo padrões internacionais de ensino e ética humanitária em todas as suas certificações.',
    year: '2025',
    logo: { avif: logo5Avif, webp: logo5Webp, jpg: logo5Jpg },
  },
]
