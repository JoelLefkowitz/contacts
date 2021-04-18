FROM node:14.9 AS build
WORKDIR /contacts

ARG BUILD_TARGET
ENV PATH /contacts/node_modules/.bin:$PATH

COPY package.json .
RUN npm i

COPY . .
RUN ng run contacts:server:$BUILD_TARGET

ENTRYPOINT ["node", "/contacts/dist/contacts/server"]