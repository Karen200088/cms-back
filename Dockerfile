FROM node:18.16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm audit fix --force

COPY . .

CMD ["npm", "run", "start:dev"]