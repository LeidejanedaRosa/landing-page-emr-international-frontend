# 🚀 Guia de Configuração CI/CD e Sentry

Este guia explica como configurar completamente o pipeline de CI/CD e monitoramento com Sentry para o projeto EMR International.

## 📋 Índice

- [O que é CI/CD](#o-que-é-cicd)
- [Configuração do Sentry](#configuração-do-sentry)
- [Configuração de Secrets no GitHub](#configuração-de-secrets-no-github)
- [Configuração de Deploy](#configuração-de-deploy)
- [Verificação e Testes](#verificação-e-testes)

---

## 🎯 O que é CI/CD

### Continuous Integration (CI) - Integração Contínua

É a prática de automatizar a integração de mudanças de código de múltiplos contribuidores em um único projeto de software.

**O que o nosso pipeline CI faz:**

1. **Quality Gates** - Valida qualidade do código
   - ✅ TypeScript: Verifica tipos estáticos
   - ✅ ESLint: Detecta problemas de código
   - ✅ Prettier: Valida formatação
   - ✅ Unit Tests: Testa lógica isolada
   - ✅ Coverage: Mede cobertura de testes

2. **Build & Security** - Compila e verifica segurança
   - ✅ Build de produção
   - ✅ Security audit de dependências
   - ✅ Bundle size analysis

3. **E2E Tests** - Testa aplicação completa
   - ✅ Playwright: Testes em múltiplos navegadores

4. **Accessibility** - Valida acessibilidade
   - ✅ Axe-core: Testes WCAG 2.1 AA

5. **Performance** - Mede performance
   - ✅ Lighthouse CI: Core Web Vitals

**Referências:**

- [Martin Fowler - Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

### Continuous Deployment (CD) - Implantação Contínua

É a prática de automatizar o deploy de código para ambientes de staging/produção após passar por todas as verificações.

**O que o nosso pipeline CD faz:**

- 🔄 **Staging Deploy**: Branch `beta` → Ambiente de testes
- 🚀 **Production Deploy**: Branch `main` → Ambiente de produção
- 📢 **Notifications**: Notifica equipe sobre status

**Referências:**

- [Google Cloud - CI/CD](https://cloud.google.com/solutions/devops/devops-tech-continuous-delivery)
- [Atlassian - Continuous Deployment](https://www.atlassian.com/continuous-delivery/continuous-deployment)

---

## 🛡️ Configuração do Sentry

Sentry é uma plataforma de monitoramento de erros e performance em tempo real.

### 1. Criar Conta e Projeto

1. Acesse [sentry.io](https://sentry.io) e crie uma conta
2. Crie um novo projeto:
   - Platform: **React**
   - Project Name: `emr-international-frontend`
   - Alert Frequency: Configure conforme preferência

3. Na tela de configuração, copie o **DSN** (Data Source Name)
   - Exemplo: `https://examplePublicKey@o0.ingest.sentry.io/0`

**Documentação:** [Sentry React Setup](https://docs.sentry.io/platforms/javascript/guides/react/)

### 2. Criar Auth Token para CI/CD

Para fazer upload de source maps automaticamente:

1. Acesse: `Settings` → `Account` → `API` → `Auth Tokens`
2. Clique em **Create New Token**
3. Configure:
   - **Name:** `GitHub Actions CI/CD`
   - **Scopes:**
     - ✅ `project:read`
     - ✅ `project:releases`
     - ✅ `project:write`
     - ✅ `org:read`
4. Clique em **Create Token** e **copie o token** (só será exibido uma vez)

**Documentação:** [Sentry Auth Tokens](https://docs.sentry.io/product/accounts/auth-tokens/)

### 3. Obter Organization Slug e Project Name

1. **Organization Slug:**
   - Acesse: `Settings` → `General Settings`
   - Copie o valor de **Organization Slug**

2. **Project Name:**
   - Acesse o projeto criado
   - O nome aparece na URL: `https://sentry.io/organizations/[ORG]/projects/[PROJECT]/`

---

## 🔐 Configuração de Secrets no GitHub

Secrets são variáveis de ambiente criptografadas que o GitHub Actions usa durante a execução dos workflows.

### 1. Acessar Configurações de Secrets

1. Vá para seu repositório no GitHub
2. Clique em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**

**Documentação:** [GitHub Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

### 2. Adicionar Secrets do Sentry

Adicione os seguintes secrets:

| Secret Name         | Descrição                | Onde Obter                                    |
| ------------------- | ------------------------ | --------------------------------------------- |
| `VITE_SENTRY_DSN`   | URL de conexão do Sentry | Sentry → Project Settings → Client Keys (DSN) |
| `SENTRY_AUTH_TOKEN` | Token de autenticação    | Sentry → Account → API → Auth Tokens          |
| `SENTRY_ORG`        | Slug da organização      | Sentry → Settings → General Settings          |
| `SENTRY_PROJECT`    | Nome do projeto          | URL do projeto no Sentry                      |

### 3. Adicionar Secrets Opcionais

| Secret Name             | Descrição                              | Status      |
| ----------------------- | -------------------------------------- | ----------- |
| `CODECOV_TOKEN`         | Token do Codecov para coverage reports | ⚠️ Opcional |
| `LHCI_GITHUB_APP_TOKEN` | Token do Lighthouse CI                 | ⚠️ Opcional |

---

## 🚀 Configuração de Deploy

Atualmente, os jobs de deploy estão com placeholders. Você precisa escolher e configurar um provedor de hosting.

### Opção 1: Vercel (Recomendado) ✨

**Vantagens:**

- ✅ Deploy automático integrado com GitHub
- ✅ Preview deployments para PRs
- ✅ CDN global gratuito
- ✅ SSL automático
- ✅ Configuração zero

**Como Configurar:**

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **Add New** → **Project**
3. Selecione o repositório `landing-page-emr-international-frontend`
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Adicione as variáveis de ambiente:

   ```
   VITE_SENTRY_DSN=seu-dsn-aqui
   SENTRY_AUTH_TOKEN=seu-token-aqui
   SENTRY_ORG=seu-org-aqui
   SENTRY_PROJECT=seu-projeto-aqui
   ```

6. Clique em **Deploy**

**Documentação:** [Vercel GitHub Integration](https://vercel.com/docs/concepts/git/vercel-for-github)

### Opção 2: Netlify

**Como Configurar:**

1. Acesse [netlify.com](https://netlify.com) e faça login
2. **Add new site** → **Import an existing project**
3. Selecione GitHub e autorize
4. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

5. Adicione environment variables nas configurações do site

**Documentação:** [Netlify Deploy](https://docs.netlify.com/configure-builds/get-started/)

### Opção 3: GitHub Pages

Para configurar GitHub Pages, adicione este workflow:

```yaml
# .github/workflows/deploy-gh-pages.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          VITE_SENTRY_DSN: ${{ secrets.VITE_SENTRY_DSN }}
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: 'dist'
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Documentação:** [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages)

---

## 🔍 Configuração de Environments no GitHub

Environments permitem adicionar proteções e aprovações antes do deploy.

### 1. Criar Environment de Production

1. Vá para **Settings** → **Environments**
2. Clique em **New environment**
3. Nome: `production`
4. Configure:
   - ✅ **Required reviewers:** Adicione revisores obrigatórios
   - ✅ **Wait timer:** Adicione delay se necessário
   - ✅ **Deployment branches:** Apenas `main`

5. Salve as configurações

### 2. Descomentar no CI/CD

No arquivo `.github/workflows/ci-cd.yml` linha 304, descomente:

```yaml
environment: production
```

**Documentação:** [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

---

## ✅ Verificação e Testes

### 1. Testar Localmente

Antes de fazer push, teste o build com as variáveis do Sentry:

```bash
# Crie arquivo .env.local
cp .env.example .env.local

# Adicione suas credenciais do Sentry
# Edite .env.local e adicione:
# VITE_SENTRY_DSN=https://seu-dsn
# SENTRY_AUTH_TOKEN=seu-token
# SENTRY_ORG=seu-org
# SENTRY_PROJECT=seu-projeto

# Execute build de produção
npm run build

# Execute em modo de preview
npm run preview
```

### 2. Verificar CI/CD no GitHub

1. Faça commit das mudanças
2. Faça push para uma branch de feature
3. Abra um Pull Request
4. Verifique a aba **Actions** no GitHub
5. Todos os checks devem passar ✅

### 3. Testar Sentry

1. Acesse a aplicação em produção
2. Force um erro (ex: clique em um botão inexistente no console):
   ```javascript
   throw new Error('Teste Sentry')
   ```
3. Verifique no Sentry se o erro foi capturado
4. Verifique se os source maps estão funcionando (código legível)

### 4. Monitorar Performance

No Sentry, acesse:

- **Performance** → Veja métricas de carregamento
- **Issues** → Veja erros capturados
- **Releases** → Veja deploys e commits

---

## 🎓 Recursos Adicionais

### Documentação Oficial

- **GitHub Actions:** https://docs.github.com/en/actions
- **Sentry React:** https://docs.sentry.io/platforms/javascript/guides/react/
- **Vite:** https://vitejs.dev/guide/
- **Vercel:** https://vercel.com/docs
- **Netlify:** https://docs.netlify.com/

### Melhores Práticas

- **CI/CD Patterns:** https://martinfowler.com/articles/continuousIntegration.html
- **Trunk Based Development:** https://trunkbaseddevelopment.com/
- **Semantic Versioning:** https://semver.org/
- **Conventional Commits:** https://www.conventionalcommits.org/

### Segurança

- **GitHub Security Best Practices:** https://docs.github.com/en/code-security
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **Secrets Management:** https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions

---

## 🆘 Troubleshooting

### Build Falha no CI

**Problema:** `npm run build` falha no GitHub Actions

**Soluções:**

1. Verifique se todas as dependências estão no `package.json`
2. Teste `npm ci` localmente
3. Verifique logs completos na aba Actions

### Sentry Não Captura Erros

**Problema:** Erros não aparecem no Sentry

**Soluções:**

1. Verifique se `VITE_SENTRY_DSN` está configurado
2. Confirme que está rodando em modo produção
3. Verifique no console do navegador se há erros de inicialização do Sentry
4. Teste forçando um erro: `throw new Error('Test')`

### Source Maps Não Funcionam

**Problema:** Erros aparecem minificados no Sentry

**Soluções:**

1. Verifique se `SENTRY_AUTH_TOKEN` tem as permissões corretas
2. Confirme que `sourcemap: 'hidden'` está configurado no Vite
3. Verifique logs do build para erros de upload
4. Teste release manualmente: `sentry-cli releases files <VERSION> upload-sourcemaps ./dist`

### Deploy Não Acontece

**Problema:** Pipeline passa mas deploy não ocorre

**Soluções:**

1. Verifique se está fazendo push para branch correto (`main` ou `beta`)
2. Confirme que o provedor de hosting está conectado ao repositório
3. Verifique webhooks do GitHub (Settings → Webhooks)
4. Veja logs no dashboard do provedor (Vercel/Netlify)

---

## 📝 Checklist de Configuração

Use este checklist para garantir que tudo está configurado:

### Sentry

- [ ] Conta criada no Sentry.io
- [ ] Projeto React criado
- [ ] DSN copiado
- [ ] Auth Token criado com permissões corretas
- [ ] Organization Slug identificado
- [ ] Project Name identificado

### GitHub Secrets

- [ ] `VITE_SENTRY_DSN` adicionado
- [ ] `SENTRY_AUTH_TOKEN` adicionado
- [ ] `SENTRY_ORG` adicionado
- [ ] `SENTRY_PROJECT` adicionado
- [ ] `CODECOV_TOKEN` adicionado (opcional)
- [ ] `LHCI_GITHUB_APP_TOKEN` adicionado (opcional)

### GitHub Environments

- [ ] Environment `production` criado
- [ ] Required reviewers configurados
- [ ] Deployment branches configurados
- [ ] Environment descomentado no workflow

### Deploy

- [ ] Provedor de hosting escolhido (Vercel/Netlify/AWS/etc)
- [ ] Repositório conectado ao provedor
- [ ] Variáveis de ambiente configuradas no provedor
- [ ] Build command configurado
- [ ] Output directory configurado
- [ ] Domínio customizado configurado (se aplicável)

### Testes

- [ ] Build local com Sentry funcionando
- [ ] CI passa em Pull Request de teste
- [ ] Deploy para staging funciona
- [ ] Deploy para production funciona
- [ ] Erro de teste aparece no Sentry
- [ ] Source maps funcionam no Sentry
- [ ] Performance tracking funcionando

---

## 🎉 Conclusão

Após seguir este guia, você terá:

✅ Pipeline de CI/CD completamente automatizado
✅ Monitoramento de erros em tempo real com Sentry
✅ Source maps para debugging facilitado
✅ Deploy automático para staging e production
✅ Proteções de deployment configuradas
✅ Notificações de erros e deploys

**Lembre-se:** Este é um processo iterativo. Continue melhorando seu pipeline conforme necessário!

---

**Dúvidas ou problemas?** Consulte a documentação oficial dos provedores ou abra uma issue no repositório.
