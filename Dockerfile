# syntax=docker/dockerfile:1

########################
# Etapa 1: builder
########################
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN rm -rf .next       # New: limpiar cualquier build previo
RUN npm run build

########################
# Etapa 2: runner
########################
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=9104

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

RUN npm install --production --legacy-peer-deps

EXPOSE 9104

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD wget --quiet --tries=1 --spider http://localhost:$PORT/ || exit 1  # New: verifica endpoint raíz

CMD ["sh", "-c", "npm start -- -p $PORT"]
