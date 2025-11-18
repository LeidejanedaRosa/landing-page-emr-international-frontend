# Navegação com suporte ao aria-current

Este documento descreve como usar o sistema de navegação com suporte completo ao `aria-current` para melhor acessibilidade.

## Recursos implementados

### 1. Interface NavigationItem

```typescript
interface NavigationItem {
  /** @deprecated Use ariaCurrent instead for better accessibility compliance */
  isCurrent?: boolean
  /**
   * Indicates the current item within a set. Follows ARIA standard values.
   * Replaces the deprecated isCurrent prop.
   */
  ariaCurrent?:
    | boolean
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | 'true'
}
```

### 2. AccessibleLink Component

O componente `AccessibleLink` agora suporta `aria-current`:

```tsx
import { AccessibleLink } from './components/ui/Accessibility'

// Uso básico
<AccessibleLink href="#sobre" ariaCurrent="page">
  Sobre
</AccessibleLink>

// Com diferentes valores de aria-current
<AccessibleLink href="#passo1" ariaCurrent="step">
  Passo 1
</AccessibleLink>

<AccessibleLink href="#local" ariaCurrent="location">
  São Paulo
</AccessibleLink>
```

### 3. Header Component

O Header agora aceita uma propriedade `currentSection`:

```tsx
import Header from './components/layout/Header'

// Uso com seção atual
;<Header currentSection='sobre' />
```

### 4. Hook useCurrentSection

Detecta automaticamente a seção atual baseado no scroll:

```tsx
import { useCurrentSection } from './hooks/useCurrentSection'

function App() {
  const currentSection = useCurrentSection([
    'hero',
    'sobre',
    'servicos',
    'contato',
  ])

  return (
    <div>
      <Header currentSection={currentSection} />
      {/* conteúdo */}
    </div>
  )
}
```

## Valores do aria-current

O padrão ARIA define os seguintes valores válidos:

- `false` ou `undefined`: O elemento não é o atual
- `true` ou `"true"`: O item atual em um conjunto (uso genérico)
- `"page"`: A página atual em um conjunto de páginas
- `"step"`: O passo atual em um processo com múltiplas etapas
- `"location"`: A localização atual em um ambiente ou contexto
- `"date"`: A data atual dentro de um calendário
- `"time"`: O horário atual dentro de um seletor de tempo

## Estilos visuais

Links com `aria-current` recebem estilos visuais diferenciados:

- **Primary variant**: `text-primary-700 font-semibold`
- **Secondary variant**: `text-gray-800 font-semibold`
- **Ghost variant**: `text-gray-600 font-semibold`

## Compatibilidade

O sistema mantém compatibilidade com a propriedade deprecated `isCurrent`:

```tsx
// Ainda funciona, mas será convertido internamente para ariaCurrent="page"
<AccessibleLink href='#sobre' isCurrent={true}>
  Sobre
</AccessibleLink>
```

## Exemplo completo

```tsx
import React from 'react'

import Header from './components/layout/Header'
import { AccessibleLink, useCurrentSection } from './index'

function NavigationExample() {
  const currentSection = useCurrentSection(['home', 'about', 'services'])

  return (
    <div>
      <Header currentSection={currentSection} />

      <nav aria-label='Navegação principal'>
        <ul>
          <li>
            <AccessibleLink
              href='#home'
              variant='primary'
              ariaCurrent={currentSection === 'home' ? 'page' : undefined}
            >
              Home
            </AccessibleLink>
          </li>
          <li>
            <AccessibleLink
              href='#about'
              variant='primary'
              ariaCurrent={currentSection === 'about' ? 'page' : undefined}
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

## Benefícios de acessibilidade

1. **Screen readers**: Anunciam claramente qual é a página/seção atual
2. **Navegação por teclado**: Usuários sabem onde estão no site
3. **Padrões ARIA**: Seguem as especificações de acessibilidade web
4. **Indicação visual**: Estilo diferenciado para a página ativa
5. **Semântica**: Melhora a estrutura semântica da navegação

Este sistema garante que a navegação seja acessível para todos os usuários, incluindo aqueles que usam tecnologias assistivas.
