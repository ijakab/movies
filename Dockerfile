FROM node:12-alpine AS base
RUN apk add --no-cache git bash nano
RUN mkdir /home/node/app/ && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node

FROM base AS dependencies
COPY --chown=node:node package*.json ./
RUN npm set progress=false
RUN npm install

FROM base AS build
COPY --chown=node:node . ./
COPY --from=dependencies /home/node/app/node_modules ./node_modules
RUN node ace build --production

FROM base AS deploy
ENV NODE_ENV=production
COPY --from=build /home/node/app/build ./
RUN touch .env
RUN npm ci --production
CMD node ace migration:run --force && node server.js
