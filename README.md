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

Comeco rapido:

1. instalar dependencias com `pnpm install`
2. gerar o client do Prisma com `pnpm prisma:generate`
3. subir servicos locais de dados com `docker compose -f infra/local/dev-data.compose.yml up -d`
4. iniciar a API com `pnpm --filter @plataforma/api dev`
5. iniciar o frontend com `pnpm --filter @plataforma/web dev`
