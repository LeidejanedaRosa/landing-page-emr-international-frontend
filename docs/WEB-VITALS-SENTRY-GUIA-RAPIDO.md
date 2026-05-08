# Guia Rápido: Visualizando Web Vitals no Sentry

## 🎯 Como Acessar as Métricas

### 1. Dashboard de Performance

**Onde**: Sentry → Performance → Web Vitals

Você verá gráficos em tempo real para todas as 5 métricas principais:

- **LCP** (Largest Contentful Paint) - Tempo de carregamento do maior elemento
- **INP** (Interaction to Next Paint) - Tempo de resposta às interações
- **CLS** (Cumulative Layout Shift) - Estabilidade visual da página
- **FCP** (First Contentful Paint) - Tempo até o primeiro conteúdo aparecer
- **TTFB** (Time to First Byte) - Tempo de resposta do servidor

**URL**: `https://[SUA-ORG].sentry.io/performance/browser/vitals/`

### 2. Alertas de Performance Ruim

**Onde**: Sentry → Issues → Filtrar por "Poor Web Vital"

Quando uma métrica é classificada como "ruim", você recebe um alerta automático com:

- Nome da métrica e valor
- Tipo de navegação (carregamento inicial, volta do navegador, etc)
- URL onde ocorreu o problema
- Tipo de conexão do usuário
- Contexto completo para análise

**Exemplo de Alerta**:

```
Poor Web Vital: LCP
Nível: Warning
Valor: 4523ms (ruim)
Variação: 1200ms
Navegação: navigate
URL: https://emr-international.com/
```

## 📊 Entendendo os Valores

### Classificação das Métricas

| Métrica | Bom     | Precisa Melhorar | Ruim    |
| ------- | ------- | ---------------- | ------- |
| LCP     | ≤ 2.5s  | 2.5s - 4.0s      | > 4.0s  |
| INP     | ≤ 200ms | 200ms - 500ms    | > 500ms |
| CLS     | ≤ 0.1   | 0.1 - 0.25       | > 0.25  |
| FCP     | ≤ 1.8s  | 1.8s - 3.0s      | > 3.0s  |
| TTFB    | ≤ 800ms | 800ms - 1.8s     | > 1.8s  |

### Quando Você é Notificado

- ✅ Métricas "boas": Enviadas para dashboard, sem alertas
- ⚠️ Métricas "precisam melhorar": Enviadas para dashboard, sem alertas
- 🚨 Métricas "ruins": Enviadas para dashboard E criam Issues com alertas

## 🔔 Configurando Alertas

### Alertas Recomendados

**1. Alerta de LCP Ruim (Alta Prioridade)**

- Condição: LCP > 4000ms para mais de 10% dos usuários
- Ação: Email + notificação Slack

**2. Alerta de CLS Alto (Média Prioridade)**

- Condição: CLS > 0.25 para mais de 5% dos usuários
- Ação: Email

**3. Alerta de INP Lento (Alta Prioridade)**

- Condição: INP > 500ms para mais de 15% dos usuários
- Ação: Email + notificação Slack

### Como Criar Alertas

1. Acesse `Alerts` → `Create Alert`
2. Escolha `Performance`
3. Defina os limites das métricas
4. Configure notificações (email, Slack, etc)
5. Atribua responsáveis

## 🔍 Troubleshooting

### Métricas Não Aparecem no Sentry

**Verifique**:

1. `VITE_SENTRY_DSN` configurado no `.env.production`
2. App rodando em modo produção (`npm run build && npm run preview`)
3. Aguarde 2-3 minutos para processamento
4. Verifique console do navegador por erros do Sentry

### Muitos Falsos Positivos

**Causas Comuns**:

- Tráfego de bots/crawlers
- Usuários em redes muito lentas (2G, satélite)
- Extensões de navegador interferindo

**Soluções**:

- Filtrar tráfego de bots nas configurações do Sentry
- Criar alertas separados por tipo de conexão
- Aumentar limites dos alertas

### Por que Diferente do Lighthouse?

**Comportamento Esperado**:

- Lighthouse = Dados de laboratório (sintético, ambiente controlado)
- Web Vitals = Dados de campo (usuários reais, condições variadas)

As diferenças são normais porque:

- Condições de rede variam
- Capacidades dos dispositivos diferem
- Interações dos usuários afetam INP
- Complexidade do mundo real vs ambiente de teste

## 📈 Boas Práticas

1. **Estabeleça Baselines**: Monitore por 1-2 semanas para entender o normal
2. **Foque em Tendências**: Observe degradações súbitas, não valores absolutos
3. **Segmente por Dispositivo**: Mobile normalmente tem métricas piores que desktop
4. **Considere Geografia**: Localização do usuário impacta latência

## 🔗 Links Úteis

- [Web Vitals Oficiais](https://web.dev/articles/vitals)
- [Sentry Performance Docs](https://docs.sentry.io/product/performance/)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [Lighthouse Performance](https://developer.chrome.com/docs/lighthouse/performance/)

## ℹ️ Informações Técnicas

### O que é Enviado para o Sentry?

**Para Todas as Métricas**:

```typescript
{
  nome: "LCP" | "INP" | "CLS" | "FCP" | "TTFB",
  valor: number,
  unidade: "millisecond" | "ratio"
}
```

**Para Métricas Ruins (Issues)**:

```typescript
{
  nível: "warning",
  mensagem: "Poor Web Vital: [NOME_MÉTRICA]",
  tags: {
    metric_name: string,
    metric_rating: "poor"
  },
  contexto: {
    web_vitals: {
      nome, valor, rating, delta, id, tipoNavegação
    }
  }
}
```

### Privacidade & Compliance

- ✅ Sem dados pessoais identificáveis (PII)
- ✅ Conforme LGPD/GDPR
- ✅ Conforme HIPAA (conteúdo médico não incluído)
- ✅ Usuários podem desabilitar via configurações do navegador
