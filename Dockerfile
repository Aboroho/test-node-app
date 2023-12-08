FROM node:alpine

WORKDIR /app
COPY package*.json . 
RUN npm install
COPY . .
ENV api_url=https://tasnimshoes.com
CMD ["node","main.js"]
 