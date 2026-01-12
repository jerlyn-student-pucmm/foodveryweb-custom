FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile --prod=false

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN pnpm build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/i18n.ts ./
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["pnpm", "start"]
