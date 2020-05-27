FROM node:10.19 AS build-env
ADD . /app
WORKDIR /app
RUN npm i yarn cross-env && yarn install && yarn build

FROM gcr.io/distroless/nodejs
COPY --from=build-env /app /app
WORKDIR /app
CMD ["server.js"]