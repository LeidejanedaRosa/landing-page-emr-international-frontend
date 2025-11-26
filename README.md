# Landing Page EMR Internacional - Frontend

Uma landing page moderna e responsiva desenvolvida com Vite, React, TypeScript e Tailwind CSS, com foco em acessibilidade e performance.

## 🚀 Tecnologias Utilizadas

- **Vite** - Build tool rápida e moderna
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **PWA** - Progressive Web App com Service Worker
- **Acessibilidade WCAG 2.1 AA** - Componentes totalmente acessíveis

## 📦 Instalação e Configuração

### Desenvolvimento Local

1. Clone o repositório:

```bash
git clone <repository-url>
cd landing-page-emr-internacional-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse `http://localhost:3000` no seu navegador.

### ⚠️ Configuração de Dados da Empresa (OBRIGATÓRIO para Produção)

Antes de fazer deploy para produção, **atualize os dados legais da empresa** em `src/data/companyInfo.ts`:

```typescript
export const COMPANY_LEGAL_INFO = {
  cnpj: '00.000.000/0000-00', // ⚠️ Atualizar com CNPJ real
  creaRegistration: '000000', // ⚠️ Atualizar com registro CREA real
  legalName: 'EMR Internacional',
  address: {
    /* ... */
  }, // ⚠️ Adicionar endereço completo
  contact: {
    /* ... */
  }, // ⚠️ Adicionar contatos oficiais
}
```

**Validação automática**: Execute `npm run pre-deploy` antes de fazer deploy. O script detectará dados placeholder e bloqueará o deploy se necessário.

**Referências**:

- [Consulta CNPJ - Receita Federal](https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cnpj)
- [CONFEA - Registro Profissional](https://www.confea.org.br/)

### Configuração do Ambiente Python (Opcional)

Requerido apenas se você usar scripts auxiliares de otimização de imagens ou análise de SVG.

```bash
# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

## 🛠️ Scripts Disponíveis

### Desenvolvimento

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção localmente

### Qualidade de Código

- `npm run lint` - Executa o linter ESLint
- `npm run lint:fix` - Correção automática ESLint
- `npm run format` - Formatação Prettier
- `npm run format:check` - Verificação Prettier

### Testes

- `npm run test` - Executa testes unitários
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:e2e` - Executa testes end-to-end com Playwright

### Deploy e Produção

- `npm run pre-deploy` - **⚠️ OBRIGATÓRIO antes do deploy**: Valida dados da empresa e configurações de produção

### Scripts Auxiliares

- `./scripts/convert-images.sh` - Converte imagens para formatos otimizados (AVIF/WebP)
- `./scripts/svg-analysis.sh` - Analisa e otimiza arquivos SVG
- `./scripts/verify-fixes.sh` - Verifica se todas as correções foram aplicadas

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── layout/
│   │   └── Header/
│   │       ├── DesktopMenu.tsx
│   │       ├── MobileMenu.tsx
│   │       ├── MobileMenuButton.tsx
│   │       └── index.tsx
│   ├── ui/
│   │   └── Accessibility.tsx
│   ├── sections/
│   │   ├── Hero/
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   └── Contact.tsx
│   └── ...
├── hooks/
│   ├── useCurrentSection.ts
│   ├── useAccessibility.ts
│   ├── form/
│   │   └── useContactForm.ts
│   └── useAboutData.ts
├── data/
│   └── companyInfo.ts
├── styles/
│   └── theme.ts
├── App.tsx
├── main.tsx
└── ...
```

## 🎯 Hooks Disponíveis

### Hooks de Acessibilidade

#### `useCurrentSection(sections: string[])`

Detecta automaticamente qual seção está visível no viewport baseado no scroll.

```typescript
import { useCurrentSection } from './hooks/useCurrentSection'

function App() {
  const currentSection = useCurrentSection(['hero', 'sobre', 'servicos', 'contato'])

  return <Header currentSection={currentSection} />
}
```

#### `useFocus()`

Gerencia estado e controle de foco de elementos.

```typescript
import { useFocus } from './hooks/useAccessibility'

function Component() {
  const { elementRef, focus, blur, isFocused, onFocus, onBlur } = useFocus()

  return (
    <button ref={elementRef} onFocus={onFocus} onBlur={onBlur}>
      {isFocused ? 'Focado' : 'Não focado'}
    </button>
  )
}
```

#### `useFocusTrap(isActive: boolean)`

Implementa armadilha de foco para modais e overlays.

```typescript
import { useFocusTrap } from './hooks/useAccessibility'

function Modal({ isOpen }) {
  const { containerRef } = useFocusTrap(isOpen)

  return (
    <div ref={containerRef} role="dialog">
      {/* conteúdo do modal */}
    </div>
  )
}
```

#### `useUniqueId(prefix?: string)`

Gera IDs únicos para elementos, essencial para acessibilidade.

```typescript
import { useUniqueId } from './hooks/useAccessibility'

function FormField() {
  const id = useUniqueId('form-field')

  return (
    <>
      <label htmlFor={id}>Nome</label>
      <input id={id} type="text" />
    </>
  )
}
```

### Hooks de Formulário

#### `useContactForm()`

Gerencia estado completo do formulário de contato com validação.

```typescript
import { useContactForm } from './hooks/form/useContactForm'

function ContactForm() {
  const {
    formData,
    isLoading,
    isSuccess,
    error,
    updateField,
    handleSubmit,
    reset
  } = useContactForm()

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
      />
      {/* mais campos... */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Enviando...' : 'Enviar'}
      </button>
      {error && <p role="alert">{error}</p>}
      {isSuccess && <p role="status">Mensagem enviada com sucesso!</p>}
    </form>
  )
}
```

### Hooks de Dados

#### `useAboutData()`

Carrega e gerencia dados da seção "Sobre".

```typescript
import { useAboutData } from './hooks/useAboutData'

function AboutSection() {
  const { data, isLoading, error } = useAboutData()

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return <div>{data.description}</div>
}
```

## 🎨 Sistema de Navegação Acessível

### Uso do aria-current

O sistema de navegação implementa o padrão ARIA `aria-current` para melhor acessibilidade:

```typescript
import { AccessibleLink } from './components/ui/Accessibility'

// Link da página atual
<AccessibleLink href="#sobre" ariaCurrent="page">
  Sobre
</AccessibleLink>

// Passo atual em um processo
<AccessibleLink href="#passo1" ariaCurrent="step">
  Passo 1
</AccessibleLink>

// Localização atual
<AccessibleLink href="#sao-paulo" ariaCurrent="location">
  São Paulo
</AccessibleLink>
```

### Valores do aria-current

- `"page"` - Página atual em um conjunto de páginas
- `"step"` - Passo atual em um processo
- `"location"` - Localização atual
- `"date"` - Data atual em um calendário
- `"time"` - Horário atual em um seletor de tempo
- `true` - Item atual (uso genérico)

### Exemplo Completo de Navegação

```typescript
import { useCurrentSection } from './hooks/useCurrentSection'
import { AccessibleLink } from './components/ui/Accessibility'
import Header from './components/layout/Header'

function App() {
  const currentSection = useCurrentSection(['home', 'sobre', 'servicos'])

  return (
    <div>
      <Header currentSection={currentSection} />

      <nav aria-label="Navegação principal">
        <ul>
          <li>
            <AccessibleLink
              href="#home"
              ariaCurrent={currentSection === 'home' ? 'page' : undefined}
            >
              Home
            </AccessibleLink>
          </li>
          <li>
            <AccessibleLink
              href="#sobre"
              ariaCurrent={currentSection === 'sobre' ? 'page' : undefined}
            >
              Sobre
            </AccessibleLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
```

## ♿ Componentes de Acessibilidade

### AccessibleButton

```typescript
import { AccessibleButton } from './components/ui/Accessibility'

<AccessibleButton
  onClick={handleClick}
  variant="primary"
  size="lg"
  aria-label="Abrir menu principal"
>
  Menu
</AccessibleButton>
```

### AccessibleLink

```typescript
import { AccessibleLink } from './components/ui/Accessibility'

<AccessibleLink
  href="#contato"
  variant="primary"
  ariaCurrent="page"
>
  Contato
</AccessibleLink>
```

### SkipLink (Link para pular navegação)

```typescript
import { SkipLink } from './components/ui/Accessibility'

// Automaticamente incluído no layout
<SkipLink href="#main-content">
  Pular para o conteúdo principal
</SkipLink>
```

## 🛡️ Qualidade e Padrões

### Clean Code & SOLID

- Funções máx. 20 linhas
- Componentes máx. 300 linhas
- Nomes descritivos e auto-documentados
- Princípio da responsabilidade única
- Sem código duplicado ou smell codes

### Acessibilidade WCAG 2.1 AA

- HTML semântico (`<main>`, `<section>`, `<article>`, `<nav>`)
- ARIA labels e live regions
- Navegação completa por teclado
- Contraste mínimo 4.5:1
- Suporte a leitores de tela

### Performance

- Lazy loading de componentes
- Otimização de imagens (AVIF/WebP)
- Code splitting
- Service Worker para cache
- Core Web Vitals otimizados

## 🚀 Deploy e Produção

### Build de Produção

```bash
npm run build
```

### Verificação Pré-Deploy

```bash
npm run lint && npm run format:check && npm run test
```

### Arquivos Gerados

```
dist/
├── assets/          # CSS/JS otimizados
├── images/          # Imagens convertidas (AVIF/WebP)
├── index.html       # HTML com inlined critical CSS
└── sw.js           # Service Worker para PWA
```

## 📚 Documentação Adicional

Para informações detalhadas sobre padrões de código, acessibilidade e arquitetura, consulte:

- **`.github/copilot-instructions.md`** - Instruções completas do projeto e padrões de desenvolvimento

## 📄 Licença

Este projeto é privado e pertence à EMR Internacional.

# 📝 Upgrade Notes

## Breaking Changes

### Header Component Export

- The `Header` component is now exported as a default export.
- **Migration:**
  - Before:
    ```typescript
    import { Header } from './components/layout/Header'
    ```
  - After:
    ```typescript
    import Header from './components/layout/Header'
    ```
- If you are upgrading from a previous version, update all imports accordingly to avoid runtime errors.
