# ── Build stage ───────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
COPY tsconfig.base.json ./
COPY shared/package.json ./shared/
COPY db/package.json ./db/
COPY worker/package.json ./worker/

RUN yarn install --frozen-lockfile

COPY shared ./shared
COPY db ./db
COPY worker ./worker

RUN yarn workspace @dalifabooks/db generate
RUN yarn workspace @dalifabooks/worker build

# ── Production stage ──────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
COPY shared/package.json ./shared/
COPY db/package.json ./db/
COPY worker/package.json ./worker/

RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/shared/dist ./shared/dist
COPY --from=builder /app/db/dist ./db/dist
COPY --from=builder /app/worker/dist ./worker/dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

CMD ["node", "worker/dist/main.js"]
