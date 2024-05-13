FROM node:20-alpine3.18

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm ci && npm cache clean --force

ADD . /app

CMD ["npm", "run", "dev"]