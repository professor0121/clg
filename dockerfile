# -----------------------------
# Base image
# -----------------------------
FROM node:20-alpine AS base

WORKDIR /app

# -----------------------------
# Dependencies
# -----------------------------
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

# -----------------------------
# Build
# -----------------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma needs env vars at build time
ENV NODE_ENV=production

RUN npx prisma generate
RUN npm run build

# -----------------------------
# Production runtime
# -----------------------------
FROM base AS runner

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
