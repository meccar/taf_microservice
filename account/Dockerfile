FROM node

WORKDIR /app/account

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8004

CMD ["npm", "start"]