FROM node:22-alpine AS base
WORKDIR /app

# Enable pnpm
RUN corepack enable

# Install dependencies (cached layer)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy prisma schema (if used during build)
COPY prisma ./prisma

# Copy app source and build
COPY . .
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Enable pnpm in runtime image
RUN corepack enable

# Copy built output and runtime deps from builder
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/prisma ./prisma

EXPOSE 3000
CMD ["pnpm", "start"]