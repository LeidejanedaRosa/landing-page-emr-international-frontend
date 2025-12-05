import logo1 from '../assets/logo-certificacao_1.jpg'
import logo2 from '../assets/logo-certificacao_2.jpg'
import logo3 from '../assets/logo-certificacao_3.jpg'
import logo4 from '../assets/logo-certificacao_4.jpg'
import logo5 from '../assets/logo-certificacao_5.jpg'

export interface Certification {
  id: string
  name: string
  organization: string
  description: string
  year: string
  logo: string
}

export const certifications: Certification[] = [
  {
    id: 'hsi',
    name: 'HSI – Health & Safety Institute',
    organization: 'Health & Safety Institute',
    description:
      'Instrutor credenciado pelo Health & Safety Institute (HSI), uma das maiores referências mundiais em educação em saúde, segurança e resposta a emergências. O HSI reúne marcas de excelência como 24-7 EMS, Medic First Aid, ASHI, EMS Safety Services e o inovador AVIRT (Active Violence Immediate Response Training) programa focado em resposta imediata a incidentes de violência ativa, combinando técnicas de controle de hemorragias e tomada de decisão sob estresse. A HSI forma profissionais capazes de agir com eficácia, confiança e padronização em qualquer cenário do ambiente industrial às operações táticas.',
    year: '2025',
    logo: logo1,
  },
  {
    id: 'acs',
    name: 'ACS - American College of Surgeons',
    organization: 'American College of Surgeons',
    description:
      'Instrutor certificado pelo programa Stop the Bleed, uma iniciativa global do American College of Surgeons (ACS) em parceria com o Committee on Trauma (CoT). O curso capacita profissionais e civis a reconhecer e controlar hemorragias graves, utilizando técnicas baseadas em evidências do Tactical Combat Casualty Care (TCCC). O programa é reconhecido internacionalmente como padrão ouro em controle de sangramento, sendo parte essencial da resposta imediata a traumas em ambientes civis, militares e de alta ameaça.',
    year: '2025',
    logo: logo2,
  },
  {
    id: 'arc',
    name: 'ARC - American Red Cross',
    organization: 'American Red Cross',
    description:
      'Instrutor afiliado à American Red Cross, instituição humanitária de alcance global e referência em formação de socorristas, resposta a desastres e educação em emergências médicas. A Cruz Vermelha Americana é pioneira na criação de protocolos e treinamentos de primeiros socorros, RCP/AED, suporte básico de vida e resposta comunitária a emergências, mantendo padrões internacionais de ensino e ética humanitária em todas as suas certificações.',
    year: '2025',
    logo: logo3,
  },
  {
    id: 'ctecc',
    name: 'Committee for Tactical Emergency Casualty Care',
    organization: 'Committee for Tactical Emergency Casualty Care',
    description:
      'Instrutor com formação alinhada aos protocolos do Committee for Tactical Emergency Casualty Care (C-TECC), organização responsável por adaptar as diretrizes do Tactical Combat Casualty Care (TCCC) para o contexto civil e tático. O C-TECC estabelece as melhores práticas para o atendimento a múltiplas vítimas em cenários de alta ameaça, integrando princípios de segurança, medicina operacional e coordenação interagências. Esses protocolos são amplamente adotados por equipes de resposta tática, forças de segurança, e serviços de emergência médica em todo o mundo.',
    year: '2025',
    logo: logo4,
  },
  {
    id: 'naui',
    name: 'NAUI – National Association of Underwater Instructors',
    organization: 'National Association of Underwater Instructors',
    description:
      'Instrutor vinculado à National Association of Underwater Instructors (NAUI), uma das mais tradicionais e respeitadas organizações de mergulho autônomo do mundo. A NAUI é reconhecida por seus padrões rigorosos de segurança e excelência educacional na formação de mergulhadores, instrutores e especialistas em resgate subaquático. Os programas da NAUI enfatizam autonomia, consciência situacional e gestão de emergências aquáticas, sendo amplamente adotados em treinamentos civis, militares e de operações de busca e salvamento.',
    year: '2025',
    logo: logo5,
  },
]
