FROM node:lts as build-env

WORKDIR /build

COPY package.json package-lock.json /build/

RUN npm install

COPY . /build

RUN npm run build

FROM node:lts-alpine

ENV PORT 3000
ENV NODE_ENV production
ENV DEBUG express:*
ENV SERVICE_NAME hello-web-server

WORKDIR /app

COPY --from=build-env /build/lib /app/lib
COPY --from=build-env /build/static /app/static

COPY --from=build-env /build/package.json /app/package.json
COPY --from=build-env /build/package-lock.json /app/package-lock.json

RUN npm install --production

EXPOSE 3000

CMD ["node", "lib"]
