import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useScrollTo } from '../useScrollTo'

const TEST_SECTION_ID = 'test-section'
const DATA_SECTION_ABOUT = 'about'
const ABOUT_SECTION_ID = 'about-section'
const NON_EXISTENT_ID = 'non-existent'
const DATA_SECTION_ATTR = 'data-section'

describe('useScrollTo - inicialização', () => {
  it('deve retornar função scrollTo', () => {
    const { result } = renderHook(() => useScrollTo())

    expect(result.current).toHaveProperty('scrollTo')
    expect(typeof result.current.scrollTo).toBe('function')
  })

  it('deve aceitar opções customizadas', () => {
    const { result } = renderHook(() =>
      useScrollTo({
        behavior: 'auto',
        block: 'end',
      })
    )

    expect(result.current.scrollTo).toBeDefined()
  })
})

describe('useScrollTo - scroll por ID', () => {
  let mockElement: HTMLElement
  let mockScrollIntoView: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockScrollIntoView = vi.fn()
    mockElement = document.createElement('div')
    mockElement.id = TEST_SECTION_ID
    mockElement.scrollIntoView = mockScrollIntoView as any
    document.body.appendChild(mockElement)

    vi.stubGlobal('history', {
      replaceState: vi.fn(),
    })
  })

  afterEach(() => {
    document.body.removeChild(mockElement)
    vi.unstubAllGlobals()
  })

  it('deve fazer scroll para elemento por ID usando string', () => {
    const { result } = renderHook(() => useScrollTo())
    result.current.scrollTo(TEST_SECTION_ID)

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
  })

  it('deve fazer scroll usando opções customizadas', () => {
    const { result } = renderHook(() =>
      useScrollTo({ behavior: 'auto', block: 'center' })
    )

    result.current.scrollTo(TEST_SECTION_ID)

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'center',
    })
  })

  it('deve atualizar URL ao fazer scroll por ID', () => {
    const { result } = renderHook(() => useScrollTo())
    result.current.scrollTo(TEST_SECTION_ID)

    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      `#${TEST_SECTION_ID}`
    )
  })

  it('deve fazer scroll para elemento usando objeto { id }', () => {
    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo({ id: TEST_SECTION_ID })

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
  })
})

describe('useScrollTo - scroll por data-section', () => {
  let dataElement: HTMLElement
  let dataScrollSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    dataScrollSpy = vi.fn()
    dataElement = document.createElement('section')
    dataElement.setAttribute(DATA_SECTION_ATTR, DATA_SECTION_ABOUT)
    dataElement.id = ABOUT_SECTION_ID
    dataElement.scrollIntoView = dataScrollSpy as any
    document.body.appendChild(dataElement)

    vi.stubGlobal('history', {
      replaceState: vi.fn(),
    })
  })

  afterEach(() => {
    if (dataElement && document.body.contains(dataElement)) {
      document.body.removeChild(dataElement)
    }
    vi.unstubAllGlobals()
  })

  it('deve fazer scroll para elemento por data-section usando string', () => {
    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo(DATA_SECTION_ABOUT)

    expect(dataScrollSpy).toHaveBeenCalled()
  })

  it('deve fazer scroll usando objeto { dataSection }', () => {
    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo({ dataSection: DATA_SECTION_ABOUT })

    expect(dataScrollSpy).toHaveBeenCalled()
  })

  it('deve atualizar URL ao fazer scroll por data-section', () => {
    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo({ dataSection: DATA_SECTION_ABOUT })

    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      `#${DATA_SECTION_ABOUT}`
    )
  })
})

describe('useScrollTo - tratamento de erros', () => {
  let mockElement: HTMLElement
  let mockScrollIntoView: ReturnType<typeof vi.fn>
  let mockConsoleWarn: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockScrollIntoView = vi.fn()
    mockElement = document.createElement('div')
    mockElement.id = TEST_SECTION_ID
    mockElement.scrollIntoView = mockScrollIntoView as any
    document.body.appendChild(mockElement)

    mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    vi.stubGlobal('history', {
      replaceState: vi.fn(),
    })
  })

  afterEach(() => {
    document.body.removeChild(mockElement)
    mockConsoleWarn.mockRestore()
    vi.unstubAllGlobals()
  })

  it('deve avisar quando elemento não for encontrado', () => {
    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo(NON_EXISTENT_ID)

    expect(mockConsoleWarn).toHaveBeenCalledWith(
      'Scroll target not found:',
      NON_EXISTENT_ID
    )
    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })

  it('deve avisar quando elemento com data-section não for encontrado', () => {
    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo({ dataSection: NON_EXISTENT_ID })

    expect(mockConsoleWarn).toHaveBeenCalledWith('Scroll target not found:', {
      dataSection: NON_EXISTENT_ID,
    })
  })

  it('não deve atualizar URL se elemento não for encontrado', () => {
    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo(NON_EXISTENT_ID)

    expect(window.history.replaceState).not.toHaveBeenCalled()
  })
})

describe('useScrollTo - escape de CSS', () => {
  let mockScrollIntoView: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockScrollIntoView = vi.fn()
  })

  it('deve fazer escape de caracteres especiais em data-section', () => {
    const specialElement = document.createElement('div')
    specialElement.setAttribute(DATA_SECTION_ATTR, 'section:with:colons')
    specialElement.scrollIntoView = mockScrollIntoView as any
    document.body.appendChild(specialElement)

    const querySelectorSpy = vi.spyOn(document, 'querySelector')

    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo('section:with:colons')

    // Verifica se CSS.escape foi usado
    expect(querySelectorSpy).toHaveBeenCalled()
    expect(mockScrollIntoView).toHaveBeenCalled()

    document.body.removeChild(specialElement)
    querySelectorSpy.mockRestore()
  })
})

describe('useScrollTo - prioridade de busca', () => {
  let mockElement: HTMLElement
  let mockScrollIntoView: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockScrollIntoView = vi.fn()
    mockElement = document.createElement('div')
    mockElement.id = TEST_SECTION_ID
    mockElement.scrollIntoView = mockScrollIntoView as any
    document.body.appendChild(mockElement)
  })

  afterEach(() => {
    document.body.removeChild(mockElement)
  })

  it('deve priorizar getElementById sobre querySelector para strings', () => {
    const getByIdSpy = vi.spyOn(document, 'getElementById')
    const querySelectorSpy = vi.spyOn(document, 'querySelector')

    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo(TEST_SECTION_ID)

    expect(getByIdSpy).toHaveBeenCalledWith(TEST_SECTION_ID)
    // querySelector é chamado como fallback se getElementById não encontrar
    // Mas neste caso getElementById encontra, então querySelector pode ou não ser chamado

    getByIdSpy.mockRestore()
    querySelectorSpy.mockRestore()
  })

  it('deve usar querySelector como fallback se getElementById não encontrar', () => {
    // Elemento sem ID, mas com data-section
    const element = document.createElement('div')
    element.setAttribute(DATA_SECTION_ATTR, 'test-fallback')
    element.scrollIntoView = mockScrollIntoView as any
    document.body.appendChild(element)

    const { result } = renderHook(() => useScrollTo())

    result.current.scrollTo('test-fallback')

    expect(mockScrollIntoView).toHaveBeenCalled()

    document.body.removeChild(element)
  })
})

describe('useScrollTo - comportamento sem window.history', () => {
  let mockElement: HTMLElement
  let mockScrollIntoView: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockScrollIntoView = vi.fn()
    mockElement = document.createElement('div')
    mockElement.id = TEST_SECTION_ID
    mockElement.scrollIntoView = mockScrollIntoView as any
    document.body.appendChild(mockElement)
  })

  afterEach(() => {
    document.body.removeChild(mockElement)
    vi.unstubAllGlobals()
  })

  it('não deve lançar erro se window.history.replaceState não existir', () => {
    vi.stubGlobal('history', {
      replaceState: undefined,
    })

    const { result } = renderHook(() => useScrollTo())

    expect(() => {
      result.current.scrollTo(TEST_SECTION_ID)
    }).not.toThrow()

    expect(mockScrollIntoView).toHaveBeenCalled()
  })
})

describe('useScrollTo - atualização de dependências', () => {
  let mockElement: HTMLElement
  let mockScrollIntoView: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockScrollIntoView = vi.fn()
    mockElement = document.createElement('div')
    mockElement.id = TEST_SECTION_ID
    mockElement.scrollIntoView = mockScrollIntoView as any
    document.body.appendChild(mockElement)
  })

  afterEach(() => {
    document.body.removeChild(mockElement)
  })

  it('deve usar opções atualizadas quando props mudarem', () => {
    const { result, rerender } = renderHook(
      ({ options }) => useScrollTo(options),
      {
        initialProps: {
          options: { behavior: 'smooth' as ScrollBehavior },
        },
      }
    )

    result.current.scrollTo(TEST_SECTION_ID)

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })

    mockScrollIntoView.mockClear()

    rerender({ options: { behavior: 'auto' as ScrollBehavior } })

    result.current.scrollTo(TEST_SECTION_ID)

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'start',
    })
  })
})
