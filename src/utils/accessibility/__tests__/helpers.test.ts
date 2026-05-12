import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  announceToScreenReader,
  calculateContrastRatio,
  clearAllLiveRegions,
  contrastTestCases,
  focusNextElement,
  focusPreviousElement,
  generateAriaLabel,
  generateId,
  getContrastPreference,
  getEffectiveBackgroundColor,
  getFocusableElements,
  isKeyPressed,
  prefersReducedMotion,
  preventDefaultAndStopPropagation,
  resetIdCounter,
  trapFocus,
  validateAccessibility,
} from '../helpers'

beforeEach(() => {
  resetIdCounter()
  clearAllLiveRegions()
})

afterEach(() => {
  clearAllLiveRegions()
})

describe('generateId', () => {
  it('retorna ID com prefixo padrão', () => {
    expect(generateId()).toMatch(/^element-\d+$/)
  })

  it('retorna ID com prefixo customizado', () => {
    expect(generateId('btn')).toMatch(/^btn-\d+$/)
  })

  it('gera IDs únicos em chamadas consecutivas', () => {
    const id1 = generateId('test')
    const id2 = generateId('test')
    expect(id1).not.toBe(id2)
  })
})

describe('resetIdCounter', () => {
  it('reseta o contador para que IDs sejam reutilizados', () => {
    const id1 = generateId('a')
    resetIdCounter()
    const id2 = generateId('a')
    expect(id1).toBe(id2)
  })
})

describe('isKeyPressed', () => {
  it('retorna true quando a tecla confere', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    expect(isKeyPressed(event, 'Enter')).toBe(true)
  })

  it('retorna false quando a tecla não confere', () => {
    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    expect(isKeyPressed(event, 'Enter')).toBe(false)
  })
})

describe('preventDefaultAndStopPropagation', () => {
  it('chama preventDefault e stopPropagation', () => {
    const event = new MouseEvent('click')
    const preventDefault = vi.spyOn(event, 'preventDefault')
    const stopPropagation = vi.spyOn(event, 'stopPropagation')

    preventDefaultAndStopPropagation(event)

    expect(preventDefault).toHaveBeenCalledOnce()
    expect(stopPropagation).toHaveBeenCalledOnce()
  })
})

// JSDOM não faz layout, então offsetParent é sempre null.
// Para testar getFocusableElements precisamos mockar offsetParent.
const makeVisible = (el: HTMLElement) => {
  Object.defineProperty(el, 'offsetParent', {
    get: () => document.body,
    configurable: true,
  })
}

describe('getFocusableElements', () => {
  it('retorna botões não desabilitados', () => {
    document.body.innerHTML = `
      <button id="btn1">Clicável</button>
      <button disabled>Desabilitado</button>
    `
    const btn = document.getElementById('btn1') as HTMLElement
    makeVisible(btn)
    const elements = getFocusableElements(document.body)
    expect(elements).toHaveLength(1)
    expect(elements[0].textContent).toBe('Clicável')
  })

  it('retorna inputs não desabilitados', () => {
    document.body.innerHTML = `
      <input id="inp1" type="text" />
      <input type="text" disabled />
    `
    const inp = document.getElementById('inp1') as HTMLElement
    makeVisible(inp)
    const elements = getFocusableElements(document.body)
    expect(elements).toHaveLength(1)
  })

  it('retorna links com href', () => {
    document.body.innerHTML = `
      <a id="link1" href="/pagina">Link</a>
      <a>Sem href</a>
    `
    const link = document.getElementById('link1') as HTMLElement
    makeVisible(link)
    const elements = getFocusableElements(document.body)
    expect(elements).toHaveLength(1)
  })

  it('retorna elementos com tabindex positivo', () => {
    document.body.innerHTML = `<div id="div1" tabindex="0">Focável</div>`
    const div = document.getElementById('div1') as HTMLElement
    makeVisible(div)
    const elements = getFocusableElements(document.body)
    expect(elements).toHaveLength(1)
  })

  it('não retorna elementos com tabindex -1', () => {
    document.body.innerHTML = `<div tabindex="-1">Não focável via Tab</div>`
    const elements = getFocusableElements(document.body)
    expect(elements).toHaveLength(0)
  })

  it('retorna lista vazia para container sem elementos focáveis', () => {
    document.body.innerHTML = `<div><p>Apenas texto</p></div>`
    const elements = getFocusableElements(document.body)
    expect(elements).toHaveLength(0)
  })
})

describe('focusNextElement', () => {
  it('foca o próximo elemento focável', () => {
    document.body.innerHTML = `
      <button id="btn1">Primeiro</button>
      <button id="btn2">Segundo</button>
    `
    const btn1 = document.getElementById('btn1') as HTMLButtonElement
    const btn2 = document.getElementById('btn2') as HTMLButtonElement
    makeVisible(btn1)
    makeVisible(btn2)
    btn1.focus()
    focusNextElement()
    expect(document.activeElement?.id).toBe('btn2')
  })

  it('não faz nada se não há próximo elemento', () => {
    document.body.innerHTML = `<button id="btn1">Único</button>`
    const btn1 = document.getElementById('btn1') as HTMLButtonElement
    makeVisible(btn1)
    btn1.focus()
    focusNextElement()
    expect(document.activeElement?.id).toBe('btn1')
  })
})

describe('focusPreviousElement', () => {
  it('foca o elemento anterior focável', () => {
    document.body.innerHTML = `
      <button id="btn1">Primeiro</button>
      <button id="btn2">Segundo</button>
    `
    const btn1 = document.getElementById('btn1') as HTMLButtonElement
    const btn2 = document.getElementById('btn2') as HTMLButtonElement
    makeVisible(btn1)
    makeVisible(btn2)
    btn2.focus()
    focusPreviousElement()
    expect(document.activeElement?.id).toBe('btn1')
  })

  it('não faz nada se está no primeiro elemento', () => {
    document.body.innerHTML = `<button id="btn1">Único</button>`
    const btn1 = document.getElementById('btn1') as HTMLButtonElement
    makeVisible(btn1)
    btn1.focus()
    focusPreviousElement()
    expect(document.activeElement?.id).toBe('btn1')
  })
})

const setupTrapFocusDOM = (ids: string[]) => {
  document.body.innerHTML = `
    <div id="modal">
      ${ids.map(id => `<button id="${id}">${id}</button>`).join('')}
    </div>
  `
  const modal = document.getElementById('modal') as HTMLElement
  for (const id of ids) {
    makeVisible(document.getElementById(id) as HTMLElement)
  }
  return modal
}

describe('trapFocus', () => {
  it('retorna função de cleanup', () => {
    const modal = setupTrapFocusDOM(['a', 'b'])
    const cleanup = trapFocus(modal)
    expect(typeof cleanup).toBe('function')
    cleanup()
  })

  it('foca o primeiro elemento ao ativar o trap', () => {
    const modal = setupTrapFocusDOM(['first', 'second'])
    const cleanup = trapFocus(modal)
    expect(document.activeElement?.id).toBe('first')
    cleanup()
  })

  it('não quebra com container sem elementos focáveis', () => {
    document.body.innerHTML = `<div id="empty"></div>`
    const empty = document.getElementById('empty') as HTMLElement
    expect(() => {
      const cleanup = trapFocus(empty)
      cleanup()
    }).not.toThrow()
  })

  it('cicla para o último ao pressionar Shift+Tab no primeiro', () => {
    const modal = setupTrapFocusDOM(['first', 'last'])
    const cleanup = trapFocus(modal)

    const first = document.getElementById('first') as HTMLElement
    first.focus()

    modal.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
      })
    )

    expect(document.activeElement?.id).toBe('last')
    cleanup()
  })

  it('cicla para o primeiro ao pressionar Tab no último', () => {
    const modal = setupTrapFocusDOM(['first', 'last'])
    const cleanup = trapFocus(modal)

    const last = document.getElementById('last') as HTMLElement
    last.focus()

    modal.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: false,
        bubbles: true,
      })
    )

    expect(document.activeElement?.id).toBe('first')
    cleanup()
  })

  it('ignora teclas que não são Tab', () => {
    const modal = setupTrapFocusDOM(['btn'])
    const cleanup = trapFocus(modal)
    modal.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    )
    cleanup()
  })
})

describe('announceToScreenReader', () => {
  it('cria região live com aria-live="polite" por padrão', () => {
    announceToScreenReader('Mensagem de teste')
    const region = document.querySelector('[aria-live="polite"]')
    expect(region).not.toBeNull()
  })

  it('cria região live assertive quando solicitado', () => {
    announceToScreenReader('Alerta importante', 'assertive')
    const region = document.querySelector('[aria-live="assertive"]')
    expect(region).not.toBeNull()
  })

  it('não anuncia mensagem vazia', () => {
    announceToScreenReader('')
    const region = document.querySelector('[aria-live="polite"]')
    expect(region).toBeNull()
  })

  it('não anuncia mensagem com apenas espaços', () => {
    announceToScreenReader('   ')
    const region = document.querySelector('[aria-live="polite"]')
    expect(region).toBeNull()
  })

  it('reutiliza a mesma região live em chamadas consecutivas', () => {
    announceToScreenReader('Primeira')
    announceToScreenReader('Segunda')
    const regions = document.querySelectorAll('[aria-live="polite"]')
    expect(regions).toHaveLength(1)
  })
})

describe('clearAllLiveRegions', () => {
  it('remove regiões live criadas do DOM', () => {
    announceToScreenReader('Teste')
    clearAllLiveRegions()
    const region = document.querySelector('[aria-live]')
    expect(region).toBeNull()
  })

  it('não quebra quando chamado sem regiões existentes', () => {
    expect(() => clearAllLiveRegions()).not.toThrow()
  })
})

describe('prefersReducedMotion', () => {
  it('retorna false quando matchMedia não corresponde', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
    expect(prefersReducedMotion()).toBe(false)
  })

  it('retorna true quando usuário prefere redução de movimento', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
    } as MediaQueryList)
    expect(prefersReducedMotion()).toBe(true)
  })
})

describe('getContrastPreference', () => {
  it('retorna "no-preference" quando matchMedia não corresponde', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
    expect(getContrastPreference()).toBe('no-preference')
  })

  it('retorna "high" quando usuário prefere alto contraste', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
    } as MediaQueryList)
    expect(getContrastPreference()).toBe('high')
  })
})

describe('generateAriaLabel', () => {
  it('retorna apenas a ação quando não há target/context', () => {
    expect(generateAriaLabel('Fechar')).toBe('Fechar')
  })

  it('combina ação e target', () => {
    expect(generateAriaLabel('Fechar', 'modal')).toBe('Fechar modal')
  })

  it('combina ação, target e contexto', () => {
    expect(generateAriaLabel('Ir para', 'próxima página', 'carrossel')).toBe(
      'Ir para próxima página - carrossel'
    )
  })

  it('usa context como target quando target não é informado', () => {
    expect(generateAriaLabel('Abrir', undefined, 'menu')).toBe('Abrir menu')
  })
})

describe('validateAccessibility', () => {
  it('retorna lista vazia para elemento sem problemas', () => {
    const btn = document.createElement('button')
    btn.textContent = 'Clique aqui'
    expect(validateAccessibility(btn)).toHaveLength(0)
  })

  it('detecta botão sem label acessível', () => {
    const btn = document.createElement('button')
    const issues = validateAccessibility(btn)
    expect(issues).toContain('Elemento interativo sem label acessível')
  })

  it('aceita aria-label como label válido', () => {
    const btn = document.createElement('button')
    btn.setAttribute('aria-label', 'Fechar diálogo')
    expect(validateAccessibility(btn)).toHaveLength(0)
  })

  it('aceita aria-labelledby como label válido', () => {
    const btn = document.createElement('button')
    btn.setAttribute('aria-labelledby', 'titulo-id')
    expect(validateAccessibility(btn)).toHaveLength(0)
  })

  it('não valida elementos não interativos', () => {
    const div = document.createElement('div')
    expect(validateAccessibility(div)).toHaveLength(0)
  })
})

describe('calculateContrastRatio', () => {
  it('retorna 21 (stub de implementação futura)', () => {
    expect(calculateContrastRatio('#000000', '#ffffff')).toBe(21)
  })
})

describe('getEffectiveBackgroundColor', () => {
  it('retorna #ffffff (stub de implementação futura)', () => {
    const el = document.createElement('div')
    expect(getEffectiveBackgroundColor(el)).toBe('#ffffff')
  })
})

describe('contrastTestCases', () => {
  it('tem casos que devem passar (shouldPass)', () => {
    expect(contrastTestCases.shouldPass.length).toBeGreaterThan(0)
  })

  it('tem casos que devem falhar (shouldFail)', () => {
    expect(contrastTestCases.shouldFail.length).toBeGreaterThan(0)
  })

  it('casos shouldPass têm estrutura correta', () => {
    for (const testCase of contrastTestCases.shouldPass) {
      expect(testCase).toHaveProperty('text')
      expect(testCase).toHaveProperty('background')
      expect(testCase).toHaveProperty('expected')
    }
  })
})
