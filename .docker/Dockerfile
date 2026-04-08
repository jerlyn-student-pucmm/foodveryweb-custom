FROM node:20-alpine AS base

# Enable corepack and prepare pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install ALL dependencies (dev + prod) with cache mount for faster rebuilds
# Cache mount persists pnpm store between builds (default location in Alpine)
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the application
RUN pnpm build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create system user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy package files for production install
COPY package.json pnpm-lock.yaml* ./

# Install ONLY production dependencies with cache mount
# This will be much faster on subsequent builds due to cache
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prod

# Copy built application
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/i18n.ts ./
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["pnpm", "start"]
