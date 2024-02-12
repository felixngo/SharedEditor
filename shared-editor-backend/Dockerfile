FROM node:21-alpine

EXPOSE 8080
COPY shared-editor-backend/package*.json ./
RUN npm install
COPY shared-editor-backend/* .
ENTRYPOINT ["npm", "start"]
