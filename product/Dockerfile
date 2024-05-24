FROM node

WORKDIR /app/community

COPY package.json

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]