# Decisões de Projeto

Registro de decisões de tooling, configuração e arquitetura com contexto, alternativas rejeitadas e raciocínio. Atualizar sempre que uma decisão relevante for tomada.

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
