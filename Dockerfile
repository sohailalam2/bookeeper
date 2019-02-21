FROM node:10-alpine

WORKDIR /app

ADD ./dist /app/

RUN npm install --production

EXPOSE 8080:8080

CMD npm run start:prod
