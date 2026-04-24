FROM node:22-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages
COPY prisma ./prisma
COPY scripts ./scripts

RUN pnpm install --no-frozen-lockfile
RUN pnpm prisma:generate
RUN pnpm run build:packages
RUN pnpm --filter @plataforma/api build

FROM node:22-alpine AS runtime

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

RUN corepack enable

WORKDIR /app

COPY --from=build /app /app

EXPOSE 4000

CMD ["pnpm", "--filter", "@plataforma/api", "start"]
