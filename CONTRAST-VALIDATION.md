# Verificação de Contraste WCAG - Status e Implementação Futura

## Problema Corrigido

A função `validateAccessibility` em `src/utils/accessibility/helpers.ts` continha uma verificação de contraste incorreta:

```typescript
// ❌ INCORRETO - Comparação de strings CSS
const hasLowContrast = style.color === style.backgroundColor
```

Esta verificação estava incorreta porque:

- Compara strings CSS diretamente (`"rgb(0, 0, 0)"` vs `"black"`)
- Não considera diferentes formatos de cor (hex, rgb, hsl, named colors)
- Ignora cores transparentes e herdadas
- Não calcula a razão de contraste real

## Solução Temporária

A verificação incorreta foi removida e substituída por:

- Comentário TODO detalhado explicando como implementar corretamente
- Funções placeholder para futura implementação
- Casos de teste estruturados para validação

## Implementação Futura Recomendada

### 1. Instalar Biblioteca de Contraste

```bash
npm install wcag-color
# ou
npm install color-contrast-checker
```

### 2. Estrutura da Implementação

```typescript
import { calculateContrastRatio as wcagContrast } from 'wcag-color'

export const calculateContrastRatio = (
  textColor: string,
  backgroundColor: string
): number => {
  try {
    // Converter cores para formato padrão
    const text = parseColor(textColor)
    const background = parseColor(backgroundColor)

    // Calcular razão de contraste WCAG
    return wcagContrast(text, background)
  } catch (error) {
    console.warn('Erro ao calcular contraste:', error)
    return 1 // Contraste mínimo em caso de erro
  }
}

export const getEffectiveBackgroundColor = (element: HTMLElement): string => {
  let currentElement: HTMLElement | null = element

  while (currentElement) {
    const style = getComputedStyle(currentElement)
    const bgColor = style.backgroundColor

    // Se não é transparente, usar esta cor
    if (
      bgColor &&
      bgColor !== 'transparent' &&
      bgColor !== 'rgba(0, 0, 0, 0)'
    ) {
      return bgColor
    }

    // Subir na árvore DOM
    currentElement = currentElement.parentElement
  }

  // Fallback para branco se não encontrar fundo
  return '#ffffff'
}
```

### 3. Thresholds WCAG

| Nível | Texto Normal | Texto Grande (18px+ ou negrito 14px+) |
| ----- | ------------ | ------------------------------------- |
| AA    | 4.5:1        | 3.0:1                                 |
| AAA   | 7.0:1        | 4.5:1                                 |

### 4. Integração na Validação

```typescript
// Na função validateAccessibility
const style = getComputedStyle(element)
const textColor = style.color
const backgroundColor = getEffectiveBackgroundColor(element)
const contrastRatio = calculateContrastRatio(textColor, backgroundColor)

// Determinar se é texto grande
const fontSize = parseInt(style.fontSize)
const fontWeight = parseInt(style.fontWeight) || 400
const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700)

// Verificar threshold (usando AA como padrão)
const threshold = isLargeText ? 3.0 : 4.5

if (contrastRatio < threshold) {
  issues.push(
    `Contraste insuficiente: ${contrastRatio.toFixed(2)}:1 ` +
      `(mínimo: ${threshold}:1 para ${isLargeText ? 'texto grande' : 'texto normal'})`
  )
}
```

## Casos de Teste

Estrutura já preparada em `contrastTestCases`:

```typescript
describe('Contrast Validation', () => {
  it('should pass for adequate contrast', () => {
    contrastTestCases.shouldPass.forEach(({ text, background, expected }) => {
      const ratio = calculateContrastRatio(text, background)
      expect(ratio).toBeCloseTo(expected, 2)
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    })
  })

  it('should fail for inadequate contrast', () => {
    contrastTestCases.shouldFail.forEach(({ text, background, expected }) => {
      const ratio = calculateContrastRatio(text, background)
      expect(ratio).toBeCloseTo(expected, 2)
      expect(ratio).toBeLessThan(4.5)
    })
  })
})
```

## Status Atual

✅ **Corrigido**: Verificação incorreta removida  
✅ **Documentado**: TODO detalhado adicionado  
✅ **Estruturado**: Placeholders e casos de teste criados  
⏳ **Pendente**: Implementação completa com biblioteca WCAG

## Benefícios da Implementação Futura

1. **Precisão**: Cálculos reais de luminosidade e contraste
2. **Conformidade**: Seguir padrões WCAG 2.1/2.2
3. **Flexibilidade**: Suportar todos os formatos de cor CSS
4. **Robustez**: Lidar com cores transparentes e herdadas
5. **Usabilidade**: Mensagens de erro informativas e acionáveis
