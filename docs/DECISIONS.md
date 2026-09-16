# Decisões de Projeto

Registro de decisões de tooling, configuração e arquitetura com contexto, alternativas rejeitadas e raciocínio. Atualizar sempre que uma decisão relevante for tomada.

---

## 2026-09-16 — Remoção de jobs mortos/redundantes do `ci-cd.yml`

**Contexto**: `deploy-staging`, `deploy-production` e `notify` eram placeholders (`echo`, sem
comando de deploy real) — confirmado que o Vercel já faz auto-deploy via GitHub App a cada push
(checks `Vercel`/`Vercel Preview Comments` nos PRs). `deploy-staging` era ainda mais morto: seu
gate (`if: github.ref == 'refs/heads/beta'`) nunca dispara porque a branch `beta` não existe no
repositório. Achado adicional durante o PR #24 (branch `chore/add-secret-scanning`): o job
`accessibility` rodava `npx @axe-core/cli` sem versão fixada, que baixa o ChromeDriver mais
recente e falha sempre que ele exige uma versão de Chrome mais nova que a pré-instalada no
runner do GitHub Actions (aconteceu de verdade: ChromeDriver 153 vs. Chrome 152). O workflow
`seo-accessibility-tests.yml` já cobre o mesmo terreno de acessibilidade via
`@axe-core/playwright` (gerencia a própria versão de browser, imune a esse tipo de skew) e
passou normalmente no mesmo PR.

**Decisão**: remover os 4 jobs (`deploy-staging`, `deploy-production`, `notify`,
`accessibility`) do `ci-cd.yml`, e remover `beta` do gatilho `push.branches` (não existe mais
nenhum job que dependa dessa branch). Jobs restantes: `static-analysis`, `unit-tests`, `build`,
`e2e`, `performance`.

**Alternativa rejeitada**: corrigir o `accessibility` fixando a versão do `@axe-core/cli`/
ChromeDriver em vez de remover. Rejeitada — manteria redundância real com
`seo-accessibility-tests.yml` sem ganho de cobertura, só mais superfície pra quebrar de novo no
futuro (mesmo tipo de skew pode se repetir a qualquer atualização do runner).

**Validação**: nenhum job restante tinha `needs:` apontando pros 4 removidos (só
`deploy-staging`/`deploy-production` referenciavam `accessibility`, e ambos foram removidos
juntos — sem referência órfã). YAML validado (`js-yaml`), `lint`/`tsc --noEmit`/`format:check`
limpos.

---

## 2026-09-16 — Secret scanning (gitleaks) no `pre-commit`

**Contexto**: `.husky/pre-commit` só rodava `npx lint-staged` — nenhuma verificação de segredo
acidentalmente commitado antes do commit existir. `docs/CICD-SENTRY-CONFIGURACAO.md` e o
`ci-cd.yml` já lidam com segredos reais (Sentry DSN/token), então o risco de vazamento acidental
é concreto.

**Decisão**: `gitleaks protect --staged --redact --verbose` roda antes do `lint-staged` no
`pre-commit`, resolvendo o binário via `command -v gitleaks || echo "$HOME/.local/bin/gitleaks"`
— mesmo padrão já usado em `faladoria-web`/`faladoria-backend`, reaproveitando o binário já
instalado na máquina.

**Validação**: testado empiricamente antes de confiar. Duas tentativas com segredos "óbvios"
(uma chave de exemplo oficial da AWS, um token do Sentry inventado) **não** foram detectadas —
a chave da AWS é o placeholder de documentação oficial (`AKIAIOSFODNN7EXAMPLE`), provavelmente
allowlisted por padrão; o padrão de token do Sentry não está nas regras default do gitleaks.
Terceira tentativa com um token no formato de GitHub PAT (`ghp_...`) foi corretamente detectada
e bloqueada (`RuleID: github-pat`), confirmando que o hook funciona para os formatos de segredo
cobertos pelo conjunto de regras padrão do gitleaks — mas reforça que ele não é uma rede de
segurança universal para qualquer formato de credencial.

---
