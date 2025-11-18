# Sistema de Acessibilidade e Layout Responsivo

## 📖 Visão Geral

Este projeto implementa um sistema robusto de acessibilidade e layout responsivo seguindo as melhores práticas de desenvolvimento web inclusivo e design Mobile-First.

## 🏗️ Estrutura de Diretórios

```
src/
├── components/
│   ├── ui/                     # Componentes de interface reutilizáveis
│   │   └── Accessibility.tsx   # Componentes acessíveis (SkipLink, AccessibleButton, etc.)
│   ├── layout/                 # Componentes de layout
│   │   ├── ResponsiveLayout.tsx # Layouts responsivos (Container, Grid, Section, etc.)
│   │   ├── Header.tsx          # Cabeçalho (movido)
│   │   └── Footer.tsx          # Rodapé (movido)
│   └── sections/               # Seções específicas da página
│       ├── Hero.tsx            # Seção hero (movido)
│       ├── About.tsx           # Seção sobre (movido)
│       ├── Services.tsx        # Seção serviços (movido)
│       └── Contact.tsx         # Seção contato (movido)
├── hooks/
│   └── useAccessibility.ts     # Hooks para funcionalidades de acessibilidade
├── styles/
│   └── theme.ts               # Configurações de tema (cores, tipografia, espaçamentos)
├── types/
│   └── accessibility.ts       # Tipos TypeScript para acessibilidade
└── utils/
    ├── accessibility/
    │   └── helpers.ts         # Utilitários de acessibilidade
    └── SEO.tsx               # Componente SEO (movido)
```

## 🎨 Sistema de Tema

### Tipografia

- **Fonte Principal**: Arial (sistema de fallback: sans-serif)
- **Tamanhos**: Escala responsiva de `xs` (0.75rem) até `6xl` (3.75rem)
- **Pesos**: 300 (light) até 900 (black)

### Cores

- **Primária**: Preto (#000000) - 60% do design
- **Secundária**: Branco (#FFFFFF) - 30% do design
- **CTA**: Vermelho (#CC0000) - 10% do design
- **Estados**: Success, Warning, Error, Info

### Breakpoints (Mobile-First)

- `xs`: 320px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## ♿ Recursos de Acessibilidade

### Componentes Acessíveis

#### `SkipLink`

```tsx
<SkipLink href='#main-content'>Pular para o conteúdo principal</SkipLink>
```

#### `AccessibleButton`

```tsx
<AccessibleButton
  variant='primary'
  size='md'
  aria-label='Enviar formulário'
  loading={isLoading}
  loadingText='Enviando...'
>
  Enviar
</AccessibleButton>
```

#### `AccessibleLink`

```tsx
<AccessibleLink
  href='https://example.com'
  external
  aria-label='Visitar site externo'
>
  Link Externo
</AccessibleLink>
```

### Hooks de Acessibilidade

#### `useUniqueId`

```tsx
const id = useUniqueId('input')
// Gera: "input-a1b2c3d4e"
```

#### `useFocus`

```tsx
const { elementRef, focus, blur, isFocused } = useFocus()

;<button ref={elementRef} onClick={focus}>
  Focar elemento
</button>
```

#### `useFocusTrap`

```tsx
const trapRef = useFocusTrap(isModalOpen)

;<div ref={trapRef}>{/* Modal content - foco será capturado aqui */}</div>
```

#### `useKeyboardNavigation`

```tsx
const { handleKeyDown } = useKeyboardNavigation({
  onEnter: () => console.log('Enter pressed'),
  onEscape: () => closeModal(),
  onSpace: () => toggleSelection(),
})
```

#### `useScreenReaderAnnouncement`

```tsx
const { announce } = useScreenReaderAnnouncement()

const handleSave = () => {
  // Salvar dados
  announce('Dados salvos com sucesso', 'polite')
}
```

### Utilitários de Acessibilidade

#### Navegação por Teclado

```tsx
import { isKeyPressed, KEYBOARD_KEYS } from '../types/accessibility'

const handleKeyDown = (event: KeyboardEvent) => {
  if (isKeyPressed(event, KEYBOARD_KEYS.ENTER)) {
    // Ação no Enter
  }
}
```

#### Geração de IDs e Labels

```tsx
import { generateAriaLabel, generateId } from '../utils/accessibility/helpers'

const buttonId = generateId('submit-btn')
const label = generateAriaLabel('Enviar', 'formulário', 'página de contato')
// Result: "Enviar formulário - página de contato"
```

#### Gerenciamento de Foco

```tsx
import { getFocusableElements, trapFocus } from '../utils/accessibility/helpers'

const cleanup = trapFocus(modalElement)
// Use cleanup() para remover o trap
```

## 📱 Layout Responsivo

### Componentes de Layout

#### `Container`

```tsx
<Container className='py-8'>
  <h1>Conteúdo centralizado com padding responsivo</h1>
</Container>
```

#### `ResponsiveGrid`

```tsx
<ResponsiveGrid cols={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap='gap-4 sm:gap-6'>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ResponsiveGrid>
```

#### `Section`

```tsx
<Section id='about' spacing='lg' background='light'>
  <Container>
    <h2>Sobre Nós</h2>
  </Container>
</Section>
```

#### `Card`

```tsx
<Card padding='lg' shadow={true} border={true}>
  <h3>Título do Card</h3>
  <p>Conteúdo do card...</p>
</Card>
```

#### `Stack` (Layout Vertical)

```tsx
<Stack spacing='md' align='center'>
  <h2>Título</h2>
  <p>Descrição</p>
  <Button>Ação</Button>
</Stack>
```

#### `Flex` (Layout Flexível)

```tsx
<Flex direction='row' justify='between' align='center' gap='md'>
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

### Layout Completo da Aplicação

```tsx
<AppLayout
  header={
    <ResponsiveHeader
      logo={<Logo />}
      navigation={<Navigation />}
      actions={<HeaderActions />}
    />
  }
  footer={
    <ResponsiveFooter>
      <FooterContent />
    </ResponsiveFooter>
  }
>
  <YourPageContent />
</AppLayout>
```

## 🎯 Classes CSS Utilitárias

### Acessibilidade

- `.sr-only` - Oculta visualmente, mas mantém para screen readers
- `.focus:not-sr-only` - Mostra quando focado
- `.skip-link` - Estilo para skip links

### Botões

- `.btn-primary` - Botão principal
- `.btn-secondary` - Botão secundário
- `.btn-ghost` - Botão transparente

### Espaçamentos

- `.spacing-section-sm` - Espaçamento pequeno para seções
- `.spacing-section-md` - Espaçamento médio para seções
- `.spacing-section-lg` - Espaçamento grande para seções
- `.spacing-section-xl` - Espaçamento extra grande para seções

### Container

- `.container-responsive` - Container responsivo centralizado

## 🧪 Preferências do Usuário

O sistema automaticamente detecta e respeita:

- **`prefers-reduced-motion`**: Reduz ou remove animações
- **`prefers-contrast`**: Ajusta contraste quando solicitado
- **Tamanho de fonte do sistema**: Respeita configurações do usuário

## 🔧 Configuração

### CSS Global

O arquivo `src/index.css` inclui:

- Reset de foco acessível
- Suporte para movimento reduzido
- Estilos base para elementos interativos
- Animações responsivas às preferências do usuário

### Tailwind Config

A configuração inclui:

- Fonte Arial como padrão
- Cores personalizadas do projeto
- Animações otimizadas para acessibilidade

## 🏁 Exemplo de Uso Completo

```tsx
import {
  AppLayout,
  Card,
  Container,
  Section,
  Stack,
} from './components/layout/ResponsiveLayout'
import { AccessibleButton, SkipLink } from './components/ui/Accessibility'
import { useFocus, useScreenReaderAnnouncement } from './hooks/useAccessibility'

export const HomePage = () => {
  const { announce } = useScreenReaderAnnouncement()
  const { elementRef, focus } = useFocus()

  const handleContact = () => {
    announce('Seção de contato em foco', 'polite')
    focus()
  }

  return (
    <AppLayout>
      <SkipLink href='#main-content'>Pular para o conteúdo principal</SkipLink>

      <Section id='hero' spacing='xl'>
        <Container>
          <Stack spacing='lg' align='center'>
            <h1 className='text-4xl md:text-6xl font-bold text-center'>
              EMR Internacional
            </h1>
            <p className='text-lg md:text-xl text-center max-w-2xl'>
              Sua descrição aqui
            </p>
            <AccessibleButton
              variant='primary'
              size='lg'
              onClick={handleContact}
              aria-label='Ir para seção de contato'
            >
              Entre em Contato
            </AccessibleButton>
          </Stack>
        </Container>
      </Section>

      <Section ref={elementRef} id='contact' spacing='lg' background='light'>
        <Container>
          <Card padding='lg'>
            <h2 className='text-2xl font-bold mb-6'>Fale Conosco</h2>
            {/* Formulário de contato */}
          </Card>
        </Container>
      </Section>
    </AppLayout>
  )
}
```

## ✅ Checklist de Acessibilidade

- ✅ Skip links implementados
- ✅ Navegação por teclado funcional
- ✅ Labels acessíveis em todos elementos interativos
- ✅ Contraste adequado (WCAG AA)
- ✅ Suporte para screen readers
- ✅ Foco visível e bem definido
- ✅ Preferências de movimento reduzido respeitadas
- ✅ Estrutura semântica correta (headings, landmarks)
- ✅ Texto alternativo para imagens
- ✅ Estados de elementos claramente comunicados

## 🚀 Próximos Passos

1. Testar com ferramentas de acessibilidade (axe, NVDA, JAWS)
2. Implementar testes automatizados de acessibilidade
3. Adicionar mais componentes de UI acessíveis conforme necessário
4. Documentar padrões específicos do projeto
