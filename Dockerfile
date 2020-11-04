FROM node:lts as build-env

ENV PORT 3000

WORKDIR /build

COPY package.json package-lock.json /app/

RUN npm install

COPY . /build

RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=build-env /build/lib /app/lib
COPY --from=build-env /build/static /app/static

EXPOSE 3000

CMD ["node", "lib"]
