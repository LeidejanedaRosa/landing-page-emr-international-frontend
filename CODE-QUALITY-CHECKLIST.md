# Code Quality Checklist

Use este checklist antes de cada commit para garantir qualidade consistente do código.

## ✅ Clean Code Principles

- [ ] **Funções pequenas**: Máximo 20 linhas por função
- [ ] **Nomes descritivos**: Variáveis, funções e classes com nomes claros
- [ ] **Responsabilidade única**: Cada função faz apenas uma coisa
- [ ] **Sem números mágicos**: Constantes nomeadas em vez de valores hardcoded
- [ ] **Código auto-documentado**: Código claro sem necessidade de comentários excessivos

**Referências**: [Clean Code - Robert Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350884)

## ⚡ SOLID Principles

- [ ] **Single Responsibility**: Componente tem apenas um motivo para mudar
- [ ] **Open/Closed**: Aberto para extensão, fechado para modificação
- [ ] **Liskov Substitution**: Subtipos substituíveis pelos tipos base
- [ ] **Interface Segregation**: Interfaces específicas, não genéricas
- [ ] **Dependency Inversion**: Dependa de abstrações, não de implementações

**Referências**: [SOLID Principles - Microsoft](https://docs.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles#solid)

## ♿ Accessibility (WCAG 2.1 AA)

- [ ] **HTML Semântico**: `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
- [ ] **ARIA Labels**: Todos elementos interativos têm labels apropriados
- [ ] **Navegação por teclado**: Tab, Enter, Space, Arrow keys funcionam
- [ ] **Contraste de cores**: Mínimo 4.5:1 para texto normal, 3:1 para texto grande
- [ ] **Alt text**: Imagens têm descrições significativas
- [ ] **Focus management**: Ordem lógica de foco e estados visuais claros

**Referências**: [WCAG 2.1 Guidelines](https://www.w3.org/WAG/WCAG21/Understanding/)

## 🚫 Code Smells Detection

- [ ] **Sem duplicação**: DRY (Don't Repeat Yourself)
- [ ] **Classes pequenas**: Máximo 300 linhas
- [ ] **Parâmetros limitados**: Máximo 3-4 parâmetros por função
- [ ] **Complexidade baixa**: Evitar deeply nested conditions
- [ ] **Nomes consistentes**: Padrão de nomenclatura uniforme

**Referências**: [Refactoring - Martin Fowler](https://martinfowler.com/books/refactoring.html)

## 🔍 SEO Best Practices

- [ ] **Title tags**: Únicos, descritivos, 50-60 caracteres
- [ ] **Meta descriptions**: 150-160 caracteres, call-to-action claro
- [ ] **Heading hierarchy**: H1 único, estrutura lógica H1→H2→H3
- [ ] **URL structure**: URLs limpos e descritivos
- [ ] **Schema markup**: JSON-LD structured data
- [ ] **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1

**Referências**: [Google SEO Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)

## 🏗️ HTML Semântico

- [ ] **Document structure**: `<html>`, `<head>`, `<body>` adequados
- [ ] **Landmarks**: `<main>`, `<nav>`, `<aside>`, `<footer>` para navegação
- [ ] **Content sectioning**: `<section>`, `<article>` para organização
- [ ] **Text content**: `<h1-h6>`, `<p>`, `<ul>`, `<ol>`, `<dl>` apropriados
- [ ] **Forms**: `<form>`, `<fieldset>`, `<legend>`, `<label>` corretos
- [ ] **Media**: `<img>`, `<figure>`, `<figcaption>` com contexto

**Referências**: [HTML5 Semantic Elements - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

## 🔧 React/TypeScript Específico

- [ ] **TypeScript strict**: Tipagem completa, sem `any`
- [ ] **Props interface**: Interfaces bem definidas para props
- [ ] **Error boundaries**: Componentes protegidos contra erros
- [ ] **Performance**: `React.memo`, `useMemo`, `useCallback` quando necessário
- [ ] **Hooks rules**: Seguir regras dos hooks
- [ ] **Component naming**: PascalCase para componentes, camelCase para funções

**Referências**: [React Best Practices](https://react.dev/learn/keeping-components-pure)

## 📝 Commit Guidelines

- [ ] **Conventional Commits**: `type(scope): description`
- [ ] **English messages**: Mensagens em inglês, imperativo
- [ ] **Atomic commits**: Um conceito por commit
- [ ] **Descriptive**: Explica o "what" e "why"

**Exemplos**:

```bash
feat(accessibility): add ARIA labels to navigation menu
fix(seo): correct meta description length for About page
refactor(components): extract reusable Button component
docs(readme): update installation instructions
```

**Referências**: [Conventional Commits](https://www.conventionalcommits.org/)

## 🧪 Testing Checklist

- [ ] **Unit tests**: Lógica de negócio testada
- [ ] **Integration tests**: Fluxos principais funcionam
- [ ] **Accessibility tests**: Navegação por teclado e screen reader
- [ ] **Visual regression**: Layout responsivo em diferentes tamanhos
- [ ] **Performance tests**: Core Web Vitals dentro dos limites

---

**Lembre-se**: Qualidade não é negociável. Cada linha de código deve seguir estes padrões.
