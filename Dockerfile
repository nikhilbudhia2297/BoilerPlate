FROM node:14-alpine

RUN apk add --no-cache git

RUN npm install typescript -g

COPY package*.json ./

ADD . /app

WORKDIR /app

RUN npm install

RUN npm run build

EXPOSE 80

CMD npm run server

