# syntax=docker/dockerfile:1

FROM node:14 AS ui-build
WORKDIR /usr/src/app
COPY ./ ./
#RUN npm install && npm run build
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

