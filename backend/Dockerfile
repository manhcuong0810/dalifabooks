# ── Build stage ───────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy workspace manifests
COPY package.json yarn.lock ./
COPY tsconfig.base.json ./
COPY shared/package.json ./shared/
COPY db/package.json ./db/
COPY backend/package.json ./backend/

RUN yarn install --frozen-lockfile

# Copy source
COPY shared ./shared
COPY db ./db
COPY backend ./backend

# Generate Prisma client
RUN yarn workspace @dalifabooks/db generate

# Build
RUN yarn workspace @dalifabooks/backend build

# ── Production stage ──────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
COPY tsconfig.base.json ./
COPY shared/package.json ./shared/
COPY db/package.json ./db/
COPY backend/package.json ./backend/

RUN yarn install --frozen-lockfile --production

# Copy built output
COPY --from=builder /app/shared/dist ./shared/dist
COPY --from=builder /app/db/dist ./db/dist
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 4000

CMD ["node", "backend/dist/main.js"]
