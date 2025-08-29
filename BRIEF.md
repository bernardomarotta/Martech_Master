# Martech Master — Brief Executivo
_Data: 2025-08-29_

Visão, pilares, papéis, North Star e roadmap resumidos.

Objetivo: Comunidade “Martech Master” para certificar experts, conectar com o mercado e entregar conhecimento aplicável (cursos curados, materiais, prompts, agentes).
Público: Masters (sênior/lead/dir/VP), membros avançados e empresas (corporate).
Top 3 fluxos do MVP:
	1.	Aplicação e certificação de Masters.
	2.	Consumo e busca de cursos/materiais/prompts com taxonomia.
	3.	Uso de agentes de IA (Trend, Planner, Creative, SEO, Data QA).
Dados & integrações: YouTube playlists, uploads (PPT/Docs), S3/Wasabi, Postgres, Meilisearch, pgvector; Pagar.me; Auth Google/LinkedIn/OTP; Discord; PostHog/GA4; HubSpot.
IA: OpenAI (tiered) + RAG; guardrails + logs; caching.
UX/UI: Fundo preto, Inter, roxo fluorescente; cards/tabelas/player; dark-only.
KPIs & analytics: WAM-Agents; ativação 7d, MAU, consumo, buscas, salvamentos, NPS; MRR/ARR, churn, LTV, match rate.
Stack & hospedagem: Next.js + Strapi/Postgres (Neon) + Meilisearch + pgvector + Redis/BullMQ; Vercel + Render/Fly + S3/Wasabi + Cloudflare.
Auth & papéis: Admin/Editor/Master/Membro; Corporate v1.1.
Custos/latência alvo: IA ≤ R$5k/mês (MVP); p95 inferência < 2.5s.
Exportações: PDF, PPTX, CSV/JSON; links com expiração.
Cronograma: MVP 60–90 dias; v1.1 e v1.2 conforme acima.
Riscos: licenças, curadoria, custo IA, cold start. Mitigação: diretrizes + rating, cache IA, Masters âncora.
