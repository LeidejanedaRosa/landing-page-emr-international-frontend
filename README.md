# EMR International — Frontend

Landing page institucional da **EMR International**, empresa especializada em treinamentos de **Atendimento Pré-Hospitalar Tático (APH Tático)** e **Emergências em Áreas Remotas**. O site apresenta cursos, certificações, depoimentos de alunos e informações sobre o instrutor, com foco em conversão, acessibilidade e performance.

> **Tipo de aplicação**: Landing page de página única (SPA) com carregamento lazy de seções, PWA e otimizações de SEO/performance para marketing digital de cursos táticos.

---

## Índice

- [Visão Geral](#visão-geral)
- [Stack de Tecnologias](#stack-de-tecnologias)
- [Bibliotecas de Teste](#bibliotecas-de-teste)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Arquitetura e Decisões Técnicas](#arquitetura-e-decisões-técnicas)
- [Acessibilidade](#acessibilidade)
- [SEO e Dados Estruturados](#seo-e-dados-estruturados)
- [Performance e PWA](#performance-e-pwa)
- [Monitoramento de Erros (Sentry)](#monitoramento-de-erros-sentry)
- [Qualidade de Código](#qualidade-de-código)
- [Deploy e Produção](#deploy-e-produção)

---

## Visão Geral

O site é uma **landing page de alta performance** construída como SPA (Single Page Application). As seções são carregadas sob demanda (lazy loading) conforme o usuário rola a página, o que garante tempo de carregamento inicial mínimo.

### Seções da página (ordem de renderização)

| Seção              | Componente            | Descrição                                         |
| ------------------ | --------------------- | ------------------------------------------------- |
| Banner promocional | `PromoBannerCarousel` | Carrossel de banners rotativos no topo            |
| Hero               | `HeroCarousel`        | Apresentação principal com slides e CTAs          |
| Por que importa    | `WhyItMatters`        | Estatísticas e dados que justificam o treinamento |
| Sobre              | `About`               | Perfil, credenciais e métricas do instrutor       |
| Certificações      | `Certifications`      | Logos de certificações com modal de detalhes      |
| Treinamentos       | `Courses`             | Cards de cursos com filtro por nível              |
| Depoimentos        | `Testimonials`        | Carrossel de avaliações de alunos                 |
| Reaper Protocol    | `ReaperProtocol`      | Apresentação do protocolo proprietário            |
| Rodapé             | `Footer`              | Links, contato e redes sociais                    |

Adicionalmente, há dois elementos globais:

- **`FloatingContact`** — botões flutuantes de WhatsApp e agendamento de ligação
- **`ProductsModal`** — modal de produtos disparado automaticamente ao usuário chegar na seção Reaper Protocol (com controle via `localStorage` para não exibir repetidamente)

---

## Stack de Tecnologias

### Core

| Tecnologia                                        | Versão | Por que foi escolhida                                                                                                                                 |
| ------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Vite](https://vitejs.dev/)**                   | 7.x    | Build tool moderna com HMR instantâneo, code splitting automático e build de produção otimizado com Rollup                                            |
| **[React](https://react.dev/)**                   | 19.x   | Biblioteca de UI com suporte nativo a `React.lazy` + `Suspense` para lazy loading de seções e `ErrorBoundary` para resiliência                        |
| **[TypeScript](https://www.typescriptlang.org/)** | 5.x    | Tipagem estática que previne bugs em tempo de desenvolvimento, melhora o DX com autocomplete e serve como documentação viva do código                 |
| **[Tailwind CSS](https://tailwindcss.com/)**      | 3.x    | Framework utility-first que elimina CSS morto na build, garante consistência visual com o sistema de design customizado e permite prototipagem rápida |

### Dependências de Produção

| Biblioteca                                                                             | Finalidade                                                                                                                           |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **[@sentry/react](https://docs.sentry.io/platforms/javascript/guides/react/)**         | Monitoramento de erros e performance em produção. Captura exceções não tratadas, rastreia Core Web Vitals e gera alertas automáticos |
| **[lucide-react](https://lucide.dev/)**                                                | Biblioteca de ícones SVG tree-shakeable — apenas os ícones importados entram na bundle                                               |
| **[react-focus-lock](https://github.com/theKashey/react-focus-lock)**                  | Armadilha de foco (focus trap) para modais e menus mobile — requisito de acessibilidade WCAG 2.1                                     |
| **[web-vitals](https://web.dev/articles/vitals)**                                      | Medição dos Core Web Vitals (LCP, FID/INP, CLS) diretamente no browser do usuário real                                               |
| **[workbox-window](https://developer.chrome.com/docs/workbox/modules/workbox-window)** | Gerenciamento do ciclo de vida do Service Worker para a funcionalidade PWA                                                           |

### Ferramentas de Build e Dev

| Ferramenta                                                                                        | Finalidade                                                                               |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **[vite-plugin-pwa](https://vite-pwa-org.netlify.app/)**                                          | Gera Service Worker com Workbox e manifesto PWA automaticamente                          |
| **[@sentry/vite-plugin](https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/vite/)** | Upload de source maps para o Sentry em produção (erros com stack trace legível)          |
| **[rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)**                   | Análise visual do bundle (`npm run build:analyze`) para identificar dependências pesadas |
| **[sharp](https://sharp.pixelplumbing.com/)**                                                     | Conversão de imagens para AVIF/WebP via scripts                                          |
| **[Storybook](https://storybook.js.org/)**                                                        | Ambiente isolado para desenvolvimento e documentação de componentes                      |

---

## Bibliotecas de Teste

O projeto tem **duas camadas de teste** independentes e complementares:

### Camada 1 — Testes Unitários e de Integração (Vitest)

Executados com `npm run test`. Rodam em ambiente jsdom (DOM simulado), sem browser real.

| Biblioteca                                                                                  | O que faz                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Vitest](https://vitest.dev/)**                                                           | Test runner compatível com a API do Jest, integrado ao Vite. Usa o mesmo pipeline de transformação do Vite, então TypeScript e aliases de path funcionam sem configuração extra. Suporta cobertura de código com `@vitest/coverage-v8` |
| **[@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)** | Renderiza componentes React em ambiente jsdom e expõe queries semânticas (`getByRole`, `getByLabelText`, `getByText`). A filosofia é testar o comportamento do usuário, não detalhes de implementação                                  |
| **[@testing-library/jest-dom](https://github.com/testing-library/jest-dom)**                | Matchers customizados para o DOM: `toBeInTheDocument()`, `toHaveAttribute()`, `toBeVisible()`, etc. Torna os `expect` mais legíveis e os erros mais descritivos                                                                        |
| **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro/)**       | Simula interações reais do usuário (clique, digitação, Tab, etc.) de forma mais fiel que o `fireEvent` nativo. Essencial para testar fluxos de acessibilidade por teclado                                                              |
| **[jsdom](https://github.com/jsdom/jsdom)**                                                 | Implementação do DOM em Node.js. Ambiente de execução dos testes unitários                                                                                                                                                             |
| **[@vitest/ui](https://vitest.dev/guide/ui)**                                               | Interface visual no browser para explorar e rodar testes interativamente (`npm run test:ui`)                                                                                                                                           |
| **[@vitest/coverage-v8](https://vitest.dev/guide/coverage)**                                | Relatório de cobertura de código. Threshold mínimo configurado: **80% em branches, funções, linhas e statements**                                                                                                                      |

**Configuração de setup** (`src/test/setup.ts`): Mock de `matchMedia`, `IntersectionObserver` e `ResizeObserver` que não existem no jsdom.

### Camada 2 — Testes End-to-End (Playwright)

Executados com `npm run test:e2e`. Rodam em browsers reais (Chromium, WebKit, Firefox).

| Biblioteca                                                                                             | O que faz                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[@playwright/test](https://playwright.dev/)**                                                        | Framework E2E que controla browsers reais. Testa fluxos completos como o usuário real experimenta, incluindo carregamento de assets, animações e Service Worker |
| **[@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)** | Integração do motor de acessibilidade Axe com Playwright. Roda análise automática de violações WCAG durante os testes E2E                                       |
| **[axe-core](https://github.com/dequelabs/axe-core)**                                                  | Motor de regras de acessibilidade usado tanto nos testes E2E quanto em verificações unitárias. Base da conformidade WCAG 2.1 AA                                 |
| **[@lhci/cli](https://github.com/GoogleChrome/lighthouse-ci)**                                         | Lighthouse CI — audita performance, acessibilidade, SEO e PWA em ambiente de CI/CD                                                                              |
| **[dotenv-cli](https://github.com/entropitor/dotenv-cli)**                                             | Injeta variáveis de ambiente de arquivos `.env` específicos nos scripts npm (usado para rodar testes contra produção)                                           |
| **[wait-on](https://github.com/jeffbski/wait-on)**                                                     | Aguarda o servidor de dev estar disponível antes de iniciar os testes E2E                                                                                       |

**Suites de teste E2E disponíveis:**

```
tests/
├── homepage.spec.ts         # Fluxo principal da landing page
├── performance.spec.ts      # Métricas de performance
└── seo/
    ├── accessibility.spec.ts        # Conformidade WCAG com axe-core
    ├── metadata.spec.ts             # Meta tags, Open Graph, title
    ├── semantic-html.spec.ts        # Estrutura HTML semântica
    └── performance-keywords.spec.ts # Palavras-chave e conteúdo SEO
```

---

## Estrutura de Pastas

A estrutura segue o padrão **Feature-based com co-localização de testes**, combinado com separação de responsabilidades por categoria técnica.

```
landing-page-emr-international-frontend/
├── public/                        # Assets estáticos servidos diretamente
├── scripts/                       # Shell scripts auxiliares
│   ├── pre-deploy-validation.sh   # Validações obrigatórias antes do deploy
│   └── validate-seo.sh            # Validação de meta tags SEO
├── docs/                          # Documentação técnica adicional
│   ├── CICD-SENTRY-CONFIGURACAO.md
│   ├── TESTES-SEO.md
│   └── WEB-VITALS-SENTRY-GUIA-RAPIDO.md
├── tests/                         # Testes E2E com Playwright
│   ├── homepage.spec.ts
│   ├── performance.spec.ts
│   └── seo/
├── src/
│   ├── assets/                    # Imagens e fontes organizadas por seção
│   │   ├── about/
│   │   ├── certifications/
│   │   ├── courses/
│   │   ├── hero/
│   │   └── testimonials/
│   ├── components/
│   │   ├── error/                 # Error boundaries
│   │   ├── layout/                # Componentes estruturais da página
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── LazySection.tsx
│   │   ├── sections/              # Seções da landing page
│   │   │   ├── About/
│   │   │   ├── Certifications/
│   │   │   ├── Courses/
│   │   │   ├── Hero/
│   │   │   ├── HeroCarousel/
│   │   │   ├── HeroEnrollmentOpen/
│   │   │   ├── ProductsModal/
│   │   │   ├── PromoBannerCarousel/
│   │   │   ├── ReaperProtocol/
│   │   │   ├── Testimonials/
│   │   │   └── WhyItMatters/
│   │   ├── seo/                   # Dados estruturados JSON-LD
│   │   │   └── schemas/
│   │   ├── ui/                    # Componentes UI reutilizáveis
│   │   │   ├── icons/
│   │   │   └── Accessibility.tsx
│   │   └── widgets/               # Widgets complexos independentes
│   │       └── FloatingContact/
│   ├── data/                      # Dados estáticos da aplicação
│   ├── hooks/                     # Custom React hooks
│   ├── plugins/                   # Plugins Vite customizados
│   ├── styles/                    # Tokens de design (theme.ts)
│   ├── test/                      # Setup e utilitários de teste
│   ├── types/                     # Tipos TypeScript globais
│   └── utils/                     # Funções utilitárias
├── .github/
│   └── copilot-instructions.md    # Instruções para agentes de IA
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── tailwind.config.js
└── package.json
```

### Por que esta estrutura?

**Feature-based com co-localização** é a melhor escolha para este projeto porque:

1. **`components/sections/`** — cada seção tem sua própria pasta com `index.tsx`, `types.ts`, `constants.ts`, subcomponentes em `components/` e testes em `__tests__/`. Tudo relacionado a uma feature fica junto, facilitando manutenção e exclusão sem deixar arquivos órfãos.

2. **`components/layout/`** separado de `components/sections/` — a distinção entre estrutura da página (Header, Footer, LazySection) e conteúdo (seções) é importante para encontrar componentes rapidamente.

3. **`components/ui/`** para componentes genuinamente reutilizáveis — os componentes de acessibilidade (`AccessibleButton`, `AccessibleLink`, `SkipLink`) são usados em toda a aplicação, justificando um diretório dedicado separado das sections.

4. **`components/widgets/`** para widgets complexos e autocontidos — `FloatingContact` tem seus próprios hooks, validação de formulário e subcomponentes, mas não é uma "seção" da página. Esta camada evita poluir `ui/` com componentes complexos.

5. **`data/`** centralizado — todos os dados estáticos (cursos, certificações, depoimentos, produtos, informações da empresa) ficam em um único lugar. Facilita a futura integração com uma API ou CMS sem alterar os componentes.

6. **`hooks/`** globais vs hooks locais — hooks compartilhados entre múltiplos componentes ficam em `src/hooks/`. Hooks específicos de uma feature ficam junto com ela (ex: `Header/hooks/useMobileMenu.ts`, `HeroCarousel/hooks/useSlideTransition.ts`).

7. **`tests/`** na raiz para E2E, `__tests__/` co-localizado para unitários — os testes E2E testam o site como um todo (ficam fora de `src/`), enquanto os testes unitários ficam co-localizados com o código que testam.

### Aliases de path configurados

| Alias         | Aponta para       |
| ------------- | ----------------- |
| `@`           | `src/`            |
| `@components` | `src/components/` |
| `@hooks`      | `src/hooks/`      |
| `@utils`      | `src/utils/`      |
| `@data`       | `src/data/`       |
| `@styles`     | `src/styles/`     |
| `@types`      | `src/types/`      |
| `@assets`     | `src/assets/`     |

---

## Instalação e Configuração

### Pré-requisitos

- Node.js >= 18
- npm >= 9

### Desenvolvimento local

```bash
# Clone o repositório
git clone <repository-url>
cd landing-page-emr-international-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`.

### Configuração obrigatória antes do primeiro deploy

Verifique os dados da empresa em [src/data/companyInfo.ts](src/data/companyInfo.ts). O arquivo já contém os dados reais da EMR International, mas qualquer alteração de endereço, CNPJ ou contato deve ser feita aqui.

---

## Variáveis de Ambiente

Copie `.env.example` para `.env.local` e preencha conforme necessário.

| Variável              | Obrigatória | Descrição                                                        |
| --------------------- | ----------- | ---------------------------------------------------------------- |
| `PLAYWRIGHT_BASE_URL` | Não         | URL base para testes E2E. Padrão: `http://localhost:3000`        |
| `VITE_SENTRY_DSN`     | Produção    | DSN do projeto no Sentry para monitoramento de erros             |
| `SENTRY_AUTH_TOKEN`   | CI/CD       | Token de autenticação para upload de source maps                 |
| `SENTRY_ORG`          | CI/CD       | Slug da organização no Sentry                                    |
| `SENTRY_PROJECT`      | CI/CD       | Nome do projeto no Sentry                                        |
| `VITE_APP_VERSION`    | CI/CD       | Versão da release (obrigatória em builds de produção com Sentry) |

Consulte [docs/CICD-SENTRY-CONFIGURACAO.md](docs/CICD-SENTRY-CONFIGURACAO.md) para o guia completo de configuração do Sentry em CI/CD.

---

## Scripts Disponíveis

### Desenvolvimento

| Comando                 | Descrição                                               |
| ----------------------- | ------------------------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento com HMR em `localhost:3000` |
| `npm run build`         | Build de produção com TypeScript + Vite                 |
| `npm run build:analyze` | Build + abre visualizador de bundle no browser          |
| `npm run preview`       | Serve a build de produção localmente                    |

### Qualidade de Código

| Comando                | Descrição                                            |
| ---------------------- | ---------------------------------------------------- |
| `npm run lint`         | ESLint — falha em qualquer warning (zero tolerância) |
| `npm run lint:fix`     | ESLint com correção automática                       |
| `npm run format`       | Prettier — formata todos os arquivos                 |
| `npm run format:check` | Prettier — verifica formatação sem alterar arquivos  |

### Testes Unitários (Vitest)

| Comando                 | Descrição                                        |
| ----------------------- | ------------------------------------------------ |
| `npm run test`          | Executa todos os testes unitários em modo watch  |
| `npm run test:run`      | Executa uma vez e sai (para CI)                  |
| `npm run test:watch`    | Modo watch explícito                             |
| `npm run test:coverage` | Executa com relatório de cobertura (mínimo 80%)  |
| `npm run test:ui`       | Interface visual no browser para explorar testes |

### Testes E2E (Playwright)

| Comando                     | Descrição                                             |
| --------------------------- | ----------------------------------------------------- |
| `npm run test:e2e`          | Testes E2E contra o servidor local                    |
| `npm run test:e2e:ui`       | Testes E2E com interface visual do Playwright         |
| `npm run test:e2e:headed`   | Testes com browser visível (útil para debug)          |
| `npm run test:e2e:prod`     | Testes contra URL de produção (via `.env.production`) |
| `npm run test:e2e:perf`     | Suite de testes de performance                        |
| `npm run test:seo`          | Todos os testes SEO com relatório HTML                |
| `npm run test:seo:metadata` | Apenas testes de meta tags                            |
| `npm run test:seo:semantic` | Apenas testes de HTML semântico                       |
| `npm run test:seo:a11y`     | Apenas testes de acessibilidade                       |
| `npm run test:all`          | Unitários + E2E (ambiente local)                      |
| `npm run test:all:prod`     | Unitários + E2E (ambiente produção)                   |

### Deploy

| Comando              | Descrição                                                                            |
| -------------------- | ------------------------------------------------------------------------------------ |
| `npm run pre-deploy` | **Obrigatório antes do deploy**: valida dados da empresa e configurações de produção |

### Scripts Shell Auxiliares

| Script                               | Descrição                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------- |
| `./scripts/pre-deploy-validation.sh` | Valida dados placeholder, variáveis de ambiente e configurações de produção |
| `./scripts/validate-seo.sh`          | Valida presença de meta tags SEO obrigatórias                               |

---

## Arquitetura e Decisões Técnicas

### Lazy Loading de Seções

Todas as seções abaixo do Hero são carregadas com `React.lazy` + `Suspense` via o componente `LazySection`. Isso garante que apenas o Hero e o PromoBanner sejam carregados no bundle inicial, reduzindo drasticamente o LCP.

```tsx
// Seções carregadas apenas quando necessário
const About = React.lazy(() => import('./components/sections/About/index'))
const Courses = React.lazy(() => import('./components/sections/Courses'))

// LazySection encapsula o Suspense + ErrorBoundary por seção
<LazySection sectionName="Sobre" component={About} />
```

### Error Boundaries por Seção

Cada seção lazy tem seu próprio `ErrorBoundary`. Se uma seção falhar (erro de JS, network, etc.), apenas ela exibe o fallback de erro — o restante da página continua funcionando.

### Code Splitting Manual

O Vite/Rollup divide a bundle em chunks nomeados:

- `vendor-react` — React + ReactDOM (cache longo, raramente muda)
- `vendor-sentry` — SDK do Sentry (separado para não impactar o bundle principal)
- Cada seção lazy vira seu próprio chunk automático

### Sistema de Design (Tailwind customizado)

O tema do Tailwind (`tailwind.config.js`) define a paleta da marca:

| Token       | Cor                | Uso                                           |
| ----------- | ------------------ | --------------------------------------------- |
| `primary-*` | Preto/cinza        | Cor principal da marca (60% da UI)            |
| `secondary` | Branco             | Contraste e fundos (30%)                      |
| `cta-*`     | Vermelho `#CC0000` | Call-to-action — tema emergência/perigo (10%) |
| `success-*` | Verde `#1a7f37`    | Estados de sucesso (contraste WCAG AA)        |
| `error-*`   | Vermelho `#c42b3a` | Erros (contraste WCAG AA)                     |
| `warning-*` | Amarelo `#FFC107`  | Alertas                                       |
| `info-*`    | Azul `#0077a3`     | Informações (contraste WCAG AA)               |

Breakpoints customizados adicionais: `landscape-mobile` e `landscape-tablet` para dispositivos em modo paisagem.

### Padrão de Componentes de Seção

Cada seção segue a mesma estrutura interna:

```
SectionName/
├── index.tsx          # Componente raiz da seção
├── types.ts           # Interfaces e tipos TypeScript
├── constants.ts       # Dados estáticos e configurações
├── components/        # Sub-componentes da seção
│   ├── ComponentA.tsx
│   ├── ComponentB.tsx
│   └── index.ts       # Re-exportação centralizada
├── hooks/             # Hooks específicos da seção (quando necessário)
└── __tests__/         # Testes unitários co-localizados
```

---

## Acessibilidade

O projeto segue a **WCAG 2.1 Nível AA** como padrão mínimo.

### Componentes de Acessibilidade (`src/components/ui/Accessibility.tsx`)

| Componente         | Finalidade                                                         |
| ------------------ | ------------------------------------------------------------------ |
| `AccessibleButton` | Botão com suporte a `aria-label`, variantes visuais e foco visível |
| `AccessibleLink`   | Link com suporte a `aria-current` para indicar página/seção ativa  |
| `SkipLink`         | Link "pular para conteúdo" para usuários de teclado/leitor de tela |
| `MainContent`      | Wrapper `<main>` com `id="main-content"` e `role="main"`           |

### Hooks de Acessibilidade

| Hook                         | Arquivo                                                  | O que faz                                                            |
| ---------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| `useFocusTrap`               | `src/hooks/useAccessibility.ts`                          | Mantém foco dentro de modais e menus abertos                         |
| `useUniqueId`                | `src/hooks/useAccessibility.ts`                          | Gera IDs únicos para associar labels a inputs                        |
| `useCurrentSection`          | `src/hooks/useCurrentSection.ts`                         | Detecta seção visível via `IntersectionObserver` para `aria-current` |
| `useAccessibilityNavigation` | `src/hooks/useAccessibilityNavigation.ts`                | Navegação por teclado com setas em listas/carrosséis                 |
| `useIndicatorKeyboard`       | `src/hooks/useIndicatorKeyboard.ts`                      | Controle de indicadores de carrossel por teclado                     |
| `useModalAccessibility`      | `widgets/FloatingContact/hooks/useModalAccessibility.ts` | Gerencia foco, `aria-hidden` e tecla Escape em modais                |

### Garantias de acessibilidade

- Navegação completa por teclado (Tab, Shift+Tab, Enter, Espaço, setas, Escape)
- Suporte a leitores de tela (NVDA, VoiceOver)
- Contraste mínimo 4.5:1 em todos os textos
- HTML semântico (`<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`)
- ARIA labels em todos os elementos interativos
- `aria-live` regions para conteúdo dinâmico (carrosséis, modais)
- Focus visible em todos os elementos focáveis
- Validação automática com axe-core nos testes E2E

---

## SEO e Dados Estruturados

### Meta tags

Gerenciadas diretamente no `index.html` com Open Graph e Twitter Cards configurados.

### JSON-LD (Dados Estruturados)

Componentes em `src/components/seo/schemas/` injetam schema.org via `<script type="application/ld+json">`:

| Schema           | Componente               | Finalidade                                      |
| ---------------- | ------------------------ | ----------------------------------------------- |
| `Organization`   | `organizationSchema.ts`  | Dados da empresa para Knowledge Panel do Google |
| `BreadcrumbList` | `BreadcrumbSchema.tsx`   | Navegação estruturada                           |
| `CourseList`     | `CourseListSchema.tsx`   | Cursos indexáveis pelo Google                   |
| `Person`         | `InstructorSchema.tsx`   | Perfil do instrutor                             |
| `Review`         | `TestimonialsSchema.tsx` | Avaliações de alunos                            |

### Validação SEO

```bash
# Testes de SEO completos
npm run test:seo

# Validação de meta tags via script shell
./scripts/validate-seo.sh
```

---

## Performance e PWA

### PWA (Progressive Web App)

Configurado com `vite-plugin-pwa` + Workbox (apenas em produção):

- Service Worker com estratégia `CacheFirst` para imagens e fontes
- Cache de 30 dias para imagens, 365 dias para fontes Google
- Instalável como app nativo no Android/iOS
- Funcionalidade offline para assets cacheados

### Otimizações de Imagens

Imagens fornecidas em três formatos com `<picture>` para máxima compatibilidade:

- **AVIF** — melhor compressão, browsers modernos
- **WebP** — compatibilidade ampla
- **JPEG/PNG** — fallback universal

Scripts de conversão: `./scripts/convert-images.sh`

### Segurança (Headers HTTP)

Plugin customizado `src/plugins/security-headers.ts` injeta headers de segurança em produção:

| Header                    | Valor                                         |
| ------------------------- | --------------------------------------------- |
| `Content-Security-Policy` | `default-src 'self'` com allowlist explícita  |
| `X-Frame-Options`         | `DENY` — previne clickjacking                 |
| `X-Content-Type-Options`  | `nosniff`                                     |
| `Referrer-Policy`         | `strict-origin-when-cross-origin`             |
| `Permissions-Policy`      | Desabilita câmera, microfone e geolocalização |

---

## Monitoramento de Erros (Sentry)

Integração com Sentry para monitoramento em produção:

- Captura automática de erros JavaScript não tratados
- Rastreamento de Core Web Vitals (LCP, INP, CLS) via `web-vitals`
- Source maps enviados durante o build (arquivos `.map` removidos do `dist/` após upload)
- Release tracking automático com commits associados

Consulte [docs/WEB-VITALS-SENTRY-GUIA-RAPIDO.md](docs/WEB-VITALS-SENTRY-GUIA-RAPIDO.md) para configuração detalhada.

---

## Qualidade de Código

### ESLint

Configuração rigorosa com zero warnings tolerados (`--max-warnings 0`). Plugins ativos:

| Plugin                                | Foco                                               |
| ------------------------------------- | -------------------------------------------------- |
| `@typescript-eslint`                  | Regras TypeScript                                  |
| `eslint-plugin-react` + `react-hooks` | Padrões React e regras de hooks                    |
| `eslint-plugin-jsx-a11y`              | Acessibilidade em JSX                              |
| `eslint-plugin-import`                | Organização e resolução de imports                 |
| `eslint-plugin-sonarjs`               | Detecção de code smells (duplicação, complexidade) |
| `eslint-plugin-unicorn`               | Boas práticas modernas de JavaScript               |
| `eslint-plugin-security`              | Vulnerabilidades de segurança                      |
| `eslint-plugin-no-loops`              | Prefere métodos funcionais a loops imperativos     |
| `eslint-plugin-unused-imports`        | Remove imports não utilizados                      |

### Prettier

Formatação automática com `@trivago/prettier-plugin-sort-imports` para ordenação consistente de imports.

### Git Hooks (Husky + lint-staged)

Executados automaticamente no `git commit`:

- **`.ts`/`.tsx`**: ESLint --fix + Prettier
- **`.js`/`.jsx`/`.json`/`.css`/`.md`**: Prettier

### Padrões de código

- Funções com responsabilidade única (máximo ~20 linhas)
- Componentes focados (máximo ~300 linhas)
- Nomes descritivos e auto-documentados (sem comentários no código)
- Código sem duplicação (DRY)
- Princípios SOLID

---

## Deploy e Produção

### Build de produção

```bash
# Validação pré-deploy
npm run pre-deploy

# Build
npm run build

# Artefatos gerados em dist/
# ├── assets/     CSS e JS otimizados com hash de cache
# ├── images/     Imagens com hash de cache
# ├── index.html
# ├── sw.js       Service Worker
# └── manifest.webmanifest
```

### Checklist pré-deploy

```bash
npm run pre-deploy       # Validações automáticas
npm run lint             # Zero warnings
npm run format:check     # Formatação consistente
npm run test:run         # Todos os testes unitários passando
npm run test:e2e         # Todos os testes E2E passando
```

### Análise de bundle

```bash
ANALYZE=true npm run build
# Abre dist/stats.html com visualização do bundle
```

---

## Documentação Adicional

| Documento                                                                      | Conteúdo                                                                                |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| [Claude.md](Claude.md)                                                         | Diretrizes completas do projeto para o agente Claude Code — stack, padrões, arquitetura |
| [docs/WEB-VITALS-SENTRY-GUIA-RAPIDO.md](docs/WEB-VITALS-SENTRY-GUIA-RAPIDO.md) | Configuração de Web Vitals + Sentry para monitoramento de performance                   |
| [docs/CICD-SENTRY-CONFIGURACAO.md](docs/CICD-SENTRY-CONFIGURACAO.md)           | Configuração completa de CI/CD e Sentry                                                 |
| [docs/TESTES-SEO.md](docs/TESTES-SEO.md)                                       | Guia de testes SEO e acessibilidade                                                     |
| [tests/seo/README.md](tests/seo/README.md)                                     | Documentação detalhada das suites de teste SEO/acessibilidade                           |

---

## Licença

Este projeto é privado e pertence à **EMR International**. Todos os direitos reservados.
