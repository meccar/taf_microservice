FROM node:lts-alpine

WORKDIR /app/order

COPY package*.json .

RUN npm install --omit=dev

COPY . .

USER node

EXPOSE 8004

CMD ["npm", "run", "dev"]

