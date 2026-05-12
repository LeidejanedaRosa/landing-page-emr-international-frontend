# Claude Code — Diretrizes do Projeto

Instruções para o agente Claude Code ao trabalhar neste repositório.

---

## Comportamento Central

**Seja um debatedor maduro e desafiador**: Questione ideias, aponte onde estou errada, identifique pontos cegos, mostre oportunidades perdidas. Atue como um coach que prioriza verdade e crescimento acima de conforto. Não forneça validação superficial — impulse melhoria contínua.

**Pesquise sempre informações atuais**: Antes de dar orientações técnicas, decisões de arquitetura ou recomendar bibliotecas, verifique a documentação oficial mais recente. Tecnologia muda rápido — valide que os padrões e APIs são atuais (2024-2025).

---

## Diretrizes de Comunicação

| Contexto                                       | Idioma                                       |
| ---------------------------------------------- | -------------------------------------------- |
| Mensagens para o usuário                       | Português brasileiro (pt-BR)                 |
| Código (variáveis, funções, tipos, interfaces) | Inglês                                       |
| Comentários no código                          | **NUNCA** — código deve ser auto-documentado |
| Mensagens de commit                            | Inglês (Conventional Commits)                |
| Documentação e README                          | Português (padrão deste projeto)             |

---

## Padrões de Qualidade de Código

- **Clean Code**: Funções fazem uma coisa. Máximo ~20 linhas por função, ~300 linhas por componente. Nomes descritivos e auto-documentados.
- **Sem comentários no código**: Se sentir necessidade de comentar, refatore em vez disso.
- **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
- **Sem code smells**: Sem duplicação, sem listas longas de parâmetros, sem feature envy.
- **SEO**: HTML semântico, meta tags, dados estruturados, performance.
- **Acessibilidade**: WCAG 2.1 AA. Todo elemento HTML5 semântico e atributos ARIA corretos.

---

## Stack e Arquitetura

**Tipo**: Landing page SPA (Single Page Application) para EMR International — cursos de APH Tático e Emergência em Áreas Remotas.

**Stack**:

- [Vite 7](https://vitejs.dev/) — build tool
- [React 19](https://react.dev/) — UI
- [TypeScript 5](https://www.typescriptlang.org/) — tipagem
- [Tailwind CSS 3](https://tailwindcss.com/) — estilo (utility-first, sem CSS customizado)
- [Sentry](https://docs.sentry.io/platforms/javascript/guides/react/) — monitoramento de erros e performance
- [web-vitals](https://web.dev/articles/vitals) — Core Web Vitals
- [react-focus-lock](https://github.com/theKashey/react-focus-lock) — focus trap para acessibilidade

**SEO**: JSON-LD injetado via componente `JsonLdScript` em `src/components/seo/` — **sem react-helmet**.

**Estrutura**:

```
src/
├── components/
│   ├── sections/     # Seções da página (cada uma com index.tsx, types.ts, constants.ts, components/, __tests__/)
│   ├── layout/       # Header, Footer, LazySection
│   ├── ui/           # Accessibility.tsx, Loading.tsx, icons/
│   ├── seo/          # JsonLdScript, organizationSchema, schemas/
│   ├── error/        # ErrorBoundary, SectionErrorFallback
│   └── widgets/      # FloatingContact (widget complexo autocontido)
├── data/             # Dados estáticos (courses, certifications, testimonials, etc.)
├── hooks/            # Hooks compartilhados
├── plugins/          # Plugins Vite customizados (security-headers)
├── styles/           # theme.ts (tokens de design)
├── types/            # Tipos globais TypeScript
└── utils/            # accessibility/helpers.ts, webVitals.ts, sentry.tsx, whatsapp.ts
```

**Aliases de path**: `@` → `src/`, `@components`, `@hooks`, `@utils`, `@data`, `@styles`, `@types`, `@assets`.

---

## Seções da Página (ordem de renderização)

| Seção              | Componente            | Lazy? |
| ------------------ | --------------------- | ----- |
| Banner promocional | `PromoBannerCarousel` | Não   |
| Hero principal     | `HeroCarousel`        | Não   |
| Por que importa    | `WhyItMatters`        | Sim   |
| Sobre              | `About`               | Sim   |
| Certificações      | `Certifications`      | Sim   |
| Treinamentos       | `Courses`             | Sim   |
| Depoimentos        | `Testimonials`        | Sim   |
| Reaper Protocol    | `ReaperProtocol`      | Sim   |
| Rodapé             | `Footer`              | Sim   |

Globais: `FloatingContact` (botões flutuantes), `ProductsModal` (disparado por scroll via `useScrollTrigger`).

---

## Sistema de Cores (Tailwind customizado)

| Token       | Cor         | Uso                                    |
| ----------- | ----------- | -------------------------------------- |
| `primary-*` | Preto/cinza | Cor principal da marca (60%)           |
| `secondary` | Branco      | Contraste (30%)                        |
| `cta-*`     | `#CC0000`   | Call-to-action — tema emergência (10%) |
| `success-*` | `#1a7f37`   | Estados de sucesso (WCAG AA)           |
| `error-*`   | `#c42b3a`   | Erros (WCAG AA)                        |
| `warning-*` | `#FFC107`   | Alertas                                |
| `info-*`    | `#0077a3`   | Informações (WCAG AA)                  |

Fonte: `Arial` (`font-sans`) — apenas. Breakpoints extras: `landscape-mobile`, `landscape-tablet`.

---

## Padrões de Componentes

- **Lazy loading**: Seções não-críticas usam `React.lazy()` + `<LazySection>` (encapsula Suspense + ErrorBoundary)
- **Error boundaries**: Cada seção lazy tem `ErrorBoundary` próprio — falha isolada
- **Componentes de acessibilidade**: Usar sempre `AccessibleButton`, `AccessibleLink`, `SkipLink` de `src/components/ui/Accessibility.tsx`
- **Navegação ativa**: Hook `useCurrentSection` + `aria-current="page"` nos links do Header
- **Focus trap**: Usar `react-focus-lock` em modais e menus

---

## HeroCarousel — Detalhes de Integração

- **Hooks**: `useSlideTransition` (estado de animação) + `useCarousel` (navegação, auto-play, touch swipe)
- **Subcomponentes**: `CarouselContainer`, `CarouselNavigation`, `CarouselIndicators`
- **Acessibilidade**: `aria-live` region para anúncios de slide, navegação completa por teclado
- **Estilo**: Tailwind puro — sem arquivos `.css` customizados

---

## Adicionando Novas Seções

1. Criar `src/components/sections/NomeDaSecao/` com: `index.tsx`, `types.ts`, `constants.ts`, `components/`, `__tests__/`
2. Adicionar `React.lazy` import e `<LazySection>` em `App.tsx`
3. Atualizar `Header/config/navigationConfig.ts` com o novo item de navegação
4. O `useCurrentSection` detecta a seção automaticamente via `IntersectionObserver` — apenas garanta que o elemento raiz da seção tenha o `id` correto

---

## Workflow de Desenvolvimento

```bash
npm run dev          # Servidor local :3000
npm run build        # Build de produção
npm run lint         # ESLint (zero warnings tolerados)
npm run format       # Prettier
npm run test:run     # Testes unitários (uma vez)
npm run test:watch   # Testes unitários (modo watch)
npm run test:e2e     # Testes E2E Playwright
npm run test:seo     # Testes SEO + acessibilidade
npm run pre-deploy   # Validações obrigatórias antes do deploy
```

**Git hooks (Husky)**:

- `pre-commit`: `lint-staged` — ESLint + Prettier nos arquivos staged
- `pre-push`: testes unitários + TypeScript check + build

---

## Padrões de SEO e Performance

**Metas de Core Web Vitals**:

- LCP < 2.5s | INP < 200ms | CLS < 0.1 | FCP < 1.8s

**Imagens**: Fornecer em três formatos via `<picture>`: AVIF (primário) → WebP → JPEG/PNG (fallback)

**Dados estruturados (JSON-LD)**: Schemas disponíveis em `src/components/seo/schemas/`: `Organization`, `BreadcrumbList`, `CourseList`, `Person`, `Review`.

---

## Checklist de Acessibilidade

- Todo elemento interativo tem label ou `aria-label`
- Usar `AccessibleButton`/`AccessibleLink` em vez de elementos nativos
- Testar navegação por teclado: Tab, Enter, Espaço, setas, Escape
- Verificar anúncios de leitores de tela com `aria-live`
- Verificar contraste mínimo 4.5:1 com [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Diretrizes de Commits

Seguir [Conventional Commits](https://www.conventionalcommits.org/) em inglês:

| Prefixo     | Quando usar                              |
| ----------- | ---------------------------------------- |
| `feat:`     | Nova funcionalidade                      |
| `fix:`      | Correção de bug                          |
| `refactor:` | Refatoração sem mudança de comportamento |
| `style:`    | Formatação, espaçamento                  |
| `test:`     | Adição ou modificação de testes          |
| `docs:`     | Documentação                             |
| `chore:`    | Manutenção (deps, configs)               |
| `perf:`     | Melhoria de performance                  |

Separar arquivos por responsabilidade em commits coesos. Mensagens curtas, no imperativo.

---

## Fontes de Referência

Incluir links para fontes confiáveis apenas quando:

- Introduzir conceitos arquiteturais ou padrões novos
- Fazer afirmações sobre performance, segurança ou melhores práticas
- Apresentar tecnologias, bibliotecas ou APIs específicas
- A validação externa agregar valor real ao contexto

Hierarquia: documentação oficial > repositório GitHub oficial > blogs técnicos confiáveis > Stack Overflow.
