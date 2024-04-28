FROM node

WORKDIR /app/post

COPY package.json

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]