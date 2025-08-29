# Playbook Completo
_Data: 2025-08-29_

(Use o PROMPTS completo que compartilhamos anteriormente para colar nos agentes.)
[PROMPTS_FULL.md](https://github.com/user-attachments/files/22052578/PROMPTS_FULL.md)
# Martech Master — Playbook Completo de Desenvolvimento 100% por IA
_Data: 2025-08-29_

Este playbook entrega um **roteiro detalhado** para conduzir o desenvolvimento inteiro com um **Modelo de IA** (Cursor/Windsurf/Claude Code/GPT-5 Thinking em modo código).  
Cada passo inclui: **Objetivo → Prompt (copiar e colar) → Anexos recomendados → Saídas → Critérios de Aceite**.

> **Dica de fluxo:** Faça **uma branch por passo** (`feature/xx`), **abra PR**, e peça revisão ao **Reviewer Agent** incluído ao final.  
> **Dica de contexto:** Sempre anexe novamente `BRIEF.md`, `plan/martech_master_project_plan.xlsx`, `tokens.design.json`, `tokens-studio.json`, `seed/*`, `.env.example` quando o passo envolver decisões de arquitetura/negócio.

---

## 0) Ingestão & Alinhamento (gera `PLAN.md`)
**Objetivo:** o modelo entender o produto, mapear trilha crítica e variáveis .env.

**Prompt:**
```
Você é um Arquiteto/Tech Lead sênior. Leia todos os anexos e gere um arquivo PLAN.md contendo:
1) Resumo executivo em 10 bullets do produto.
2) Épicos → histórias com priorização (MoSCoW), dependências e estimativas (story points).
3) Mapa de pastas do monorepo (app Next14 + Tailwind; Strapi + Postgres; Meilisearch; pgvector; Redis).
4) Lista de variáveis .env (descrição, exemplo, ambiente onde é usada).
5) Plano de riscos/mitigações e marcos semanais até o MVP.
6) Lista de Assumptions e Gaps (o que falta decidir).
Responda em Markdown. Não invente requisito fora dos anexos.
```

**Anexos:** `BRIEF.md`, `plan/martech_master_project_plan.xlsx`, `tokens.design.json`, `tokens-studio.json`, `seed/*`, `.env.example`  
**Saída:** `PLAN.md` no repositório.  
**Aceite:** épicos e .env cobertos; riscos e marcos claros; assumptions listadas.

---

## 1) Bootstrap, Padrões e CI/CD
**Objetivo:** repositório preparado para equipes/IA (qualidade, automação, reprodutibilidade).

**Prompt:**
```
Você é um Engenheiro de Plataforma. A partir do starter, configure:
- Scripts npm: prepare, lint, lint:fix, typecheck, test, e2e.
- ESLint + Prettier; Husky + lint-staged (pre-commit: lint/format; pre-push: test/typecheck).
- DevContainer (Node 18, pnpm, Playwright).
- GitHub Actions: build + typecheck + lint + e2e em PR; deploy de main → staging.
- Gere .env.example completo a partir do PLAN.md; crie CONTRIBUTING.md (padrões de branch/PR/commits/labels).
- Adicione CODEOWNERS e um PULL_REQUEST_TEMPLATE com checklist de QA/A11y/Sec.
Crie PR `chore/bootstrap-ci`.
```

**Saídas:** PR com configs; pipelines rodando verde.  
**Aceite:** `npm run dev` funciona; CI verde; DevContainer abre e roda.

---

## 2) Design Tokens & Design System (Storybook)
**Objetivo:** aplicar tema light/dark, tipografia, gradiente azul→roxo, componentes acessíveis.

**Prompt:**
```
Aplique tokens de `tokens.design.json` no Tailwind/CSS vars (light/dark). 
Implemente biblioteca com: Button, Card, Input, Select, Badge, Tabs, Table, Modal, Toast, Tooltip.
- Estados: hover/focus/disabled; foco visível (WCAG AA); aria-labels.
- Storybook com docs e controls para 5 componentes.
Atualize a Home com Hero (gradiente azul→roxo) e cards de features.
Entregue PR `feat/design-system`.
```

**Saídas:** Storybook e componentes base.  
**Aceite:** contraste AA, foco visível; Storybook “up”; snapshots básicos.

---

## 3) Autenticação & Assinatura (Pagar.me)
**Objetivo:** login e plano anual com promoção automática de papel.

**Prompt:**
```
Implemente Auth (Auth.js): Google, LinkedIn e Email OTP. Papéis: admin, master, member, visitor.
Integre Pagar.me (PIX/cartão/boleto) com webhooks idempotentes em fila (Redis) que promovem o usuário a `member` ao confirmar pagamento.
Páginas: /login, /assinar, /conta, /admin/users. RBAC por rota/servidor.
Testes e2e dos fluxos principais. PR `feat/auth-billing`.
```

**Saídas:** login/checkout completo em sandbox.  
**Aceite:** RBAC ativo; webhooks resilientes; e2e passando.

---

## 4) CMS Strapi — Modelos, Permissões e Seeds
**Objetivo:** coleções e políticas alinhadas ao catálogo e comunidade.

**Prompt:**
```
No Strapi, crie coleções: Cursos, Materiais, Prompts, Ferramentas, Agentes, Eventos, Masters, ForumThreads, ForumReplies, Badges.
- Validações, ACL por papel e webhooks de pós-publicação (índice Meilisearch + embeddings pgvector).
- Scripts de seed usando os CSV/JSON anexados (seed/*).
- Documente endpoints e gere SDK client (OpenAPI ou GraphQL).
PR `feat/cms-schemas` + `docs/strapi-api.md`.
```

**Anexos:** `seed/*`  
**Saídas:** migrations/seed reprodutíveis; doc de API.  
**Aceite:** seeds importam sem erro; políticas corretas; webhooks disparam.

---

## 5) Catálogo — Listas, Filtros e Detalhes (+ Meu Hub)
**Objetivo:** descobrir e consumir conteúdos e agentes.

**Prompt:**
```
Implemente listagens com filtros-pílula (domínio, nível, indústria) e busca.
Páginas de detalhe:
- Cursos: player (playlist) + progresso básico.
- Materiais: preview + download controlado + licença.
- Prompts: copiar e testar (playground simples).
- Ferramentas: ficha com prós/cons e integrações.
- Agentes: card + modal de execução (mock inicial).
Adicionar “Salvar” em coleções e página /meu-hub com os salvos.
PR `feat/catalog-ui` com testes e2e.
```

**Saídas:** UI funcional para catálogo.  
**Aceite:** paginação, filtros combináveis, salvar/unsave OK; e2e cobre fluxos.

---

## 6) Busca Híbrida (Meilisearch + pgvector)
**Objetivo:** relevância superior combinando sinais.

**Prompt:**
```
Implemente indexação full-text (Meilisearch) e embeddings (pgvector) para conteúdos/threads/prompts.
Endpoint `/api/search` que faz ranking híbrido (alpha ponderado). 
Telemetry de relevância; crie 5 consultas canônicas para avaliação A/B.
PR `feat/search-hybrid`.
```

**Saídas:** API de busca; índices populados.  
**Aceite:** p95 < 200ms (dataset inicial); ganho de nDCG/Recall nas consultas canônicas.

---

## 7) Fórum & Reputação (MVP)
**Objetivo:** Q&A técnico e sinal de qualidade.

**Prompt:**
```
Fórum: criar/editar threads e respostas; upvote; “resposta aceita”; templates de pergunta/case.
Reputação: pontos por ação + 3 badges iniciais; exibir no perfil; destaque “Resposta do Master”.
Moderação básica (fechar/editar/destacar) para Admin/Master.
PR `feat/forum-reputation` + testes e2e.
```

**Saídas:** Q&A funcional; reputação mínima.  
**Aceite:** taxa de “resolvido” medível; moderação OK; eventos auditados.

---

## 8) Eventos (Calendário + RSVP + ICS + Lembretes)
**Objetivo:** organizar encontros e AMAs.

**Prompt:**
```
Implementar calendário mensal, detalhe do evento, RSVP idempotente, geração `.ics` e lembretes via Resend.
Páginas: /eventos, /eventos/[id], /meu-hub (RSVPs).
PR `feat/events-hub`.
```

**Saídas:** fluxo completo de eventos.  
**Aceite:** .ics abre em GCal/Apple; e-mails de lembrete enviados (sandbox).

---

## 9) Agentes de IA & RAG
**Objetivo:** entregar valor de IA com governança, custo previsível e citações.

**Prompt:**
```
Crie camada IA com providers (OpenAI + fallback), cache por hash, limits por usuário e logs sem dados sensíveis.
Implemente 5 agentes: Trend Scout, Campaign Planner, Creative Scorer, SEO Brief, Data QA.
RAG com conteúdos do portal; obrigar citações de fonte; métricas de custo/latência.
PR `feat/ai-agents-rag` + testes de precisão.
```

**Saídas:** agentes executáveis e controlados.  
**Aceite:** p95 < 2.5s; custo/req logado; respostas com fontes.

---

## 10) Certificação & Vitrine de Masters
**Objetivo:** legitimar experts e gerar matchmaking.

**Prompt:**
```
Fluxo de candidatura (form + portfólio + 2 referências) → painel do Board → decisão → emissão de Open Badge.
Página pública do Master (cases, skills, CTA/Calendly). Revalidação a cada 24 meses.
PR `feat/masters-certification`.
```

**Saídas:** candidatura, avaliação, badges.  
**Aceite:** badge linkável e verificável; painel do Board funcional.

---

## 11) Admin & Moderação
**Objetivo:** operar com eficiência e segurança.

**Prompt:**
```
Crie Admin Console com filas (conteúdos, fórum, eventos), filtros, ações em massa, audit log e permissões por papel.
Exports (CSV/JSON) e dashboards básicos (PostHog + KPI essenciais).
PR `feat/admin-console`.
```

**Saídas:** console operacional.  
**Aceite:** operações críticas ≤ 3 cliques; audit log persistente.

---

## 12) SEO, Acessibilidade, Qualidade & Lançamento
**Objetivo:** polimento final e go-live seguro.

**Prompt:**
```
Aplique SEO técnico (sitemap/robots/OG), Core Web Vitals “verdes”, Acessibilidade AA e testes e2e Playwright para fluxos críticos.
Crie RUNBOOK.md (deploy/rollback), SECURITY.md, e finalize LEGAL/ (Termos/Privacidade/DMCA).
PR `release/mvp`.
```

**Saídas:** build de produção e governança.  
**Aceite:** AA ok; CWV ok; staging aprovado com checklist de release.

---

# Agents Auxiliares (copie quando abrir cada PR)

## Reviewer Agent (QA/Sec/A11y/Perf)
```
Você é um Staff Engineer revisor. Avalie este PR em:
- Segurança (auth/RBAC, injeção, segredos, headers, rate limit)
- Acessibilidade (WCAG AA: foco, contraste, navegação por teclado, aria)
- Testes (unit/e2e) — cobrem critérios de aceite?
- Performance (p95, N+1, caching, bundle size)
- Observabilidade (logs/traços/telemetria) e DX (docs/scripts)
Liste achados por severidade (Alta/Média/Baixa) e sugira diffs prontos.
```

## Test Writer Agent (Playwright/Unit)
```
Gere testes cobrindo os critérios de aceite desta feature. Inclua casos felizes e de erro, e cenários de acessibilidade (tab/foco).
```

## Docs Agent
```
Atualize README, PLAN e docs afetadas (rotas, .env, scripts, uso). Crie CHANGELOG.md com breaking changes.
```

---

# Seeds & Scripts — prompts prontos

**Import para Strapi + Postgres**
```
Gere scripts Node/TS para importar seed/* (CSV/JSON) nas coleções do Strapi:
- Validar cabeçalhos e tipos
- Normalizar tags (lowercase; separar por vírgula/ponto-e-vírgula)
- Criar relacionamentos (threads→replies; masters→badges)
- Disparar webhooks após insert/update para indexação Meilisearch e embeddings pgvector
- Idempotência (upsert por ID)
Retorne: scripts, comandos npm, e README de import.
```

**Reindexação**
```
Implemente CLI `scripts/reindex.ts` para reindexar todo catálogo (full-text + embeddings) e imprimir métricas.
```

---

# .env — Lista base (exemplo)
```
NEXT_PUBLIC_APP_URL=
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
PAGARME_API_KEY=
PAGARME_SECRET_KEY=
PAGARME_WEBHOOK_SECRET=
DATABASE_URL=
STRAPI_DATABASE_URL=
STRAPI_ADMIN_JWT_SECRET=
REDIS_URL=
MEILISEARCH_HOST=
MEILISEARCH_API_KEY=
OPENAI_API_KEY=
RESEND_API_KEY=
S3_ENDPOINT=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET=mm-assets
S3_REGION=us-east-1
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
GA4_MEASUREMENT_ID=
EMBEDDINGS_PROVIDER=openai
EMBEDDINGS_MODEL=text-embedding-3-large
ENCRYPTION_KEY=
```

---

# Checklists para PR
- [ ] Critérios de aceite atendidos
- [ ] Testes unit/e2e cobrindo fluxos críticos
- [ ] Acessibilidade AA (foco visível, contraste, navegação por teclado)
- [ ] Segurança (RBAC, segredos, cabeçalhos, rate limit)
- [ ] Logs/telemetria nos pontos-chave
- [ ] Documentação atualizada (.env.example, README, PLAN)
- [ ] Sem segredos no repo

---

# Rollback rápido
1. Pausar tráfego (canário), revisar logs/metrics.
2. Reverter para tag anterior.
3. Restaurar dados/migrações se necessário.
4. Comunicar incidente e registrar pós-mortem.

---

# Convenções
- Branch: `feat/*`, `chore/*`, `fix/*`, `release/*`
- Commits: Conventional Commits
- Pastas: `apps/web`, `apps/cms`, `packages/sdk`, `infra/` (se evoluir para monorepo)
