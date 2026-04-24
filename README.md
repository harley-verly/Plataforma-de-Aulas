# Plataforma de Aulas

Monorepo oficial da Plataforma de Aulas.

Stack principal:

- frontend em `Next.js`
- backend em `NestJS`
- ORM `Prisma`
- banco `PostgreSQL`
- cache `Redis`
- arquivos `MinIO`
- orquestracao de deploy via `Portainer`
- proxy reverso e TLS via `Traefik`

Areas do produto nesta fundacao:

- catalogo publico
- ofertas
- autenticacao
- learning
- studio
- affiliate
- admin
- checkout e pagamentos sandbox-first

Infra de staging prevista:

- `portainer-base`
- `edge-proxy`
- `data-services`
- `plataforma-app`

Fluxo oficial de entrega:

1. desenvolver e validar localmente
2. commitar no repositorio canonico
3. publicar no remoto oficial do GitHub
4. atualizar as stacks no Portainer a partir do repositorio
5. validar no dominio `aulas.abasolucoesetecnologia.com.br`

Comeco rapido:

1. instalar dependencias com `pnpm install`
2. gerar o client do Prisma com `pnpm prisma:generate`
3. subir servicos locais de dados com `docker compose -f infra/local/dev-data.compose.yml up -d`
4. iniciar a API com `pnpm --filter @plataforma/api dev`
5. iniciar o frontend com `pnpm --filter @plataforma/web dev`

Validacao local recomendada:

1. rodar `pnpm prisma:generate`
2. rodar `pnpm typecheck`
3. rodar `pnpm run build:packages`
4. rodar `pnpm --filter @plataforma/api build`
5. rodar `pnpm --filter @plataforma/web build`

Observacoes operacionais:

- as redes compartilhadas do staging sao `proxy` e `plataforma-internal`
- no ambiente com Portainer, essas redes devem existir antes das stacks de app e dados
- segredos reais nao devem entrar neste repositorio
- no Windows desta estacao, o agregador raiz `pnpm build` ainda pode falhar com `spawn EPERM` no `next build`; os passos de build acima sao a validacao confiavel desta rodada
