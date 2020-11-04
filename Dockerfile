FROM node:lts as build-env

WORKDIR /build

COPY package.json package-lock.json /app/

RUN npm install

COPY . /build

RUN npm run build

FROM node:lts-alpine

ENV PORT 3000
ENV NODE_ENV production

WORKDIR /app

COPY --from=build-env /build/lib /app/lib
COPY --from=build-env /build/static /app/static

EXPOSE 3000

CMD ["node", "lib"]
