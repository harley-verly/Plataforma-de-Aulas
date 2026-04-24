# Portal ACMB — Interface Premium "Noir & Gold Editorial"

Plataforma institucional e colaborativa para a Associação ACMB com visual de revista de luxo: preto profundo, dourado champagne, tipografia Instrument Serif + Work Sans, e composição em bento grid moderno. Objetivo: causar impacto imediato e justificar o ticket de R$25 mil pela densidade de design e nível de craft.

## Direção visual

- **Paleta**: preto #0d0d0d e #1a1a1a como base, dourado #c9a84c como acento principal, dourado claro #f0d78c para gradientes e hovers, branco quente para texto.
- **Tipografia**: Instrument Serif (display, títulos enormes em itálico ocasional), Work Sans (corpo, labels, UI).
- **Tratamentos**: linhas finas douradas como divisores, números grandes serifados como rótulos editoriais ("01 — Institucional"), micro animações suaves (fade/slide), cursor com estados refinados, ruído sutil opcional na textura.
- **Tom**: editorial, calmo, confiante. Espaço negativo generoso. Sensação de "isso custou caro".

## Estrutura de páginas (rotas)

```text
/                      Homepage bento
/institucional         Quem somos, história, missão/visão/valores, objetivos
/eventos               Lista + filtros
/eventos/:slug         Página individual de evento
/cursos                Catálogo
/cursos/:slug          Página individual de curso
/comunidade            Vitrine de empreendedores
/comunidade/:slug      Perfil do negócio
/comunidade/cadastrar  Formulário público de cadastro de negócio
/contato               Formulário + dados
/admin                 Dashboard admin (mockado)
/admin/eventos         CRUD eventos
/admin/cursos          CRUD cursos
/admin/comunidade      CRUD negócios
/admin/paginas         Edição das páginas institucionais
/admin/midia           Biblioteca de imagens/vídeos
```

## Homepage (bento grid)

Composição premium com blocos de tamanhos variados:

- **Hero bento (2 colunas)**: título serifado gigante "Onde a comunidade empreendedora encontra propósito", logo ACMB, CTA primário dourado.
- **Bloco institucional**: card escuro com número "01" e teaser "Quem somos".
- **Evento em destaque**: imagem grande + data tipográfica enorme.
- **3 cursos em destaque**: cards verticais com thumbnail, carga horária, badge dourado.
- **Vitrine comunidade**: carrossel/grid de 4 negócios com avatar + nome + categoria.
- **Manifesto**: bloco só texto, citação serifada grande.
- **Newsletter / chamada final**: faixa preta com input dourado.
- **Footer editorial**: navegação completa, redes sociais, créditos.

## Módulos detalhados

### Institucional
Página longa estilo revista: hero com missão em tipografia gigante, timeline da história em formato horizontal, cards de Missão/Visão/Valores em bento, lista de objetivos numerados, seção de liderança opcional.

### Eventos
- Lista com filtros (próximos / passados / categoria), cards com data destacada (dia + mês serifado).
- Página individual: hero com imagem cinematográfica, dados (data, hora, local) em painel lateral fixo, descrição rica, galeria foto/vídeo, links sociais relacionados, CTA de inscrição.

### Cursos
- Catálogo em grid bento com badges (carga horária, modalidade, vagas).
- Página individual: hero, cronograma em accordion, vídeos embed, materiais complementares como lista de downloads, instrutor, CTA de matrícula.

### Comunidade Empreendedora
- Vitrine com filtros por categoria, busca, ordenação.
- Card de negócio: logo/foto, nome, categoria, mini-bio.
- Perfil: hero com identidade do negócio, descrição, contato, redes sociais, galeria.
- Página pública de **cadastro de novo negócio** (formulário multi-etapa elegante).

### Contato
Split layout: formulário à esquerda, mapa + dados + redes à direita.

## Painel Admin (mockado)

Layout com sidebar colapsável (shadcn sidebar) usando a mesma estética noir & gold — não um dashboard genérico.

- **Dashboard**: KPIs em bento (total de eventos, cursos ativos, negócios cadastrados, visitas mock), atividade recente, atalhos.
- **CRUDs** (eventos, cursos, comunidade): tabela elegante com busca, filtros, ações (editar/excluir/duplicar), drawer ou página de edição com formulário rico (título, descrição, datas, upload de imagem mock, vídeo URL, status publicado/rascunho).
- **Páginas institucionais**: editor de blocos simples (título + conteúdo rico mock).
- **Biblioteca de mídia**: grid de thumbnails mock com upload simulado.
- Toda a persistência é em estado local / dados de exemplo bem cuidados (sem backend real nesta entrega).

## Componentes-chave a construir

- `EditorialHeader` (nav fina com logo ao centro ou à esquerda, linha dourada inferior)
- `BentoCard` (variações: hero, media, stat, quote, list)
- `GoldButton` / `GhostGoldButton`
- `NumberedSectionLabel` ("01 —")
- `EventCard`, `CourseCard`, `BusinessCard`
- `EditorialFooter`
- `AdminSidebar`, `AdminDataTable`, `AdminFormDrawer`, `StatTile`
- `MediaGalleryGrid`
- `MultiStepBusinessForm`

## Detalhes técnicos

- Design tokens 100% via `index.css` (HSL) e `tailwind.config.ts`: cores semânticas (`--gold`, `--gold-soft`, `--ink`, `--ink-soft`, `--paper`), gradientes (`--gradient-gold`, `--gradient-ink`), sombras (`--shadow-editorial`), tipografia (`font-serif: Instrument Serif`, `font-sans: Work Sans`).
- Fontes via Google Fonts no `index.html`.
- Animações com Tailwind + keyframes customizados (fade-up, gold-shimmer no hover de CTAs principais).
- Dados mock em `src/data/` (eventos, cursos, negócios) tipados em TypeScript para ficar fácil plugar backend real depois.
- Admin protegido por rota simples com flag local (sem auth real, mas pronto para Lovable Cloud no futuro).
- Responsivo total: bento se reorganiza em mobile mantendo a hierarquia editorial.
- shadcn/ui já instalado: usaremos sidebar, dialog, drawer, table, tabs, accordion, form, sonner.

## O que NÃO está nesta entrega

- Backend real, autenticação, banco de dados, uploads reais (admin é visualmente completo, mas mockado).
- Integrações externas (pagamentos, e-mail marketing, Google Analytics).
- SEO técnico avançado e i18n.

Esses itens podem ser ativados em uma fase 2 com Lovable Cloud quando o cliente aprovar.
