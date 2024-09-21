FROM node:20-alpine3.18

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY patches/@pyodide+webpack-plugin+1.3.2.patch /app/patches/
RUN ls /app/patches/@pyodide+webpack-plugin+1.3.2.patch
RUN npm i

RUN npm run postinstall

ADD . /app

CMD ["npm", "run", "dev"]