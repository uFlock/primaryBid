FROM node:alpine3.11 AS development

ENV CHOKIDAR_USEPOLLING=true

RUN apk add g++ make python

WORKDIR /client
COPY package.json package-lock.json /client/
RUN npm ci
COPY . .

CMD [ "npm", "run", "serve"]

FROM development AS builder

RUN npm run build

FROM nginx:1.17.9 AS production

COPY --from=builder /client/dist /usr/share/nginx/html