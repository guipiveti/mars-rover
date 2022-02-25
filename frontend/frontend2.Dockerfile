# syntax=docker/dockerfile:1
FROM node:14-alpine AS base
WORKDIR /app

# ------- Builder ----------
FROM base AS builder
COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
RUN npm run build
RUN npm prune --production

# -------- Release ---------
FROM base AS release
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD [ "node", "./dist/index.js" ]