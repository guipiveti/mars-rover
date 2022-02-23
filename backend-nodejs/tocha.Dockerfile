FROM node:14 as base
WORKDIR /app/api

# Builder image, used only for build 
FROM base as builder
COPY . .
#RUN npm install @vscode/sqlite3 --save

RUN npm install

RUN npm run build

COPY ./built ./built

EXPOSE 3333

#CMD node ./dist/server.js
CMD [ "node", "./built/server.js" ]
#RUN node ./app/api/dist/server.js
