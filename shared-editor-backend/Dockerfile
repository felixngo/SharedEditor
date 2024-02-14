FROM node:18-alpine
WORKDIR /app

EXPOSE 8080
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

ENTRYPOINT ["npm", "start"]
