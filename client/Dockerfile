FROM node:lts-alpine

WORKDIR /app/client

COPY package*.json .

RUN npm install --omit=dev

COPY . .

RUN chown -R node:node /app/client

USER node

EXPOSE 3000

CMD ["npm", "run", "dev"]