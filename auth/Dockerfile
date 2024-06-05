FROM node:lts-alpine

WORKDIR /app/auth

COPY package.json .

RUN npm install --omit=dev

COPY . .

# RUN chmod 644 /app/auth/key.pem

USER node

EXPOSE 8001

CMD ["npm", "start"]

