FROM node:14-alpine AS base
WORKDIR app

# ------- Builder ----------
FROM base AS builder
COPY ./backend-nodejs/package*.json ./backend-nodejs/tsconfig.json ./
RUN npm install
COPY ./backend-nodejs/src ./src
RUN npm run build
RUN npm prune --production


# -------- Release ---------
FROM base AS release
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3000
CMD [ "node", "./dist/server.js" ]