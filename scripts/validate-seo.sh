#!/bin/bash

set -e

echo "🔍 Executando validações de SEO e Acessibilidade..."
echo ""

echo "📋 1. Executando testes de Metadados SEO..."
npm run test:seo:metadata || exit 1
echo "✅ Metadados SEO: PASSOU"
echo ""

echo "🏗️  2. Executando testes de HTML Semântico..."
npm run test:seo:semantic || exit 1
echo "✅ HTML Semântico: PASSOU"
echo ""

echo "♿ 3. Executando testes de Acessibilidade WCAG 2.1 AA..."
npm run test:seo:a11y || exit 1
echo "✅ Acessibilidade: PASSOU"
echo ""

echo "⚡ 4. Executando testes de Performance e Keywords..."
npm run test:seo:performance || exit 1
echo "✅ Performance e Keywords: PASSOU"
echo ""

echo "🎉 Todas as validações de SEO e Acessibilidade foram concluídas com sucesso!"
echo ""
echo "📊 Para ver o relatório completo:"
echo "   npx playwright show-report"
