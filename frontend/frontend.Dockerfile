# syntax=docker/dockerfile:1
#FROM node:14-alpine AS base
#WORKDIR /app/frontend
#COPY . ./app/frontend
#RUN npm install --production
#CMD [ "node", "src/server.js" ]

#FROM node:12-alpine AS base
#WORKDIR /app/frontend

# ------- Builder ----------
#FROM base AS builder
#COPY package*.json ./
#RUN npm install
#COPY ./src ./src
#COPY ./public ./public
#RUN npm run start

FROM node:14 AS ui-build
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install && npm run build

# production environment
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3333
CMD [“nginx”, “-g”, “daemon off;”]