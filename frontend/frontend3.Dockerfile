# syntax=docker/dockerfile:1
FROM node:14-alpine AS base
WORKDIR /app

FROM base AS builder
COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
EXPOSE 3000
CMD [ "npm", "start" ]