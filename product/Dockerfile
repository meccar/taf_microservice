FROM node:lts-alpine

WORKDIR /app/product

COPY package*.json .

# COPY . .

# COPY client/package*.json client/
# RUN npm run install-client --omit=dev

# COPY ./package*.json product/
RUN npm install
# RUN npm run install-product --omit=dev

# COPY client/ client/
# RUN npm run build --prefix client

COPY . .

# Set file permissions
RUN chmod 644 /app/product/key.pem

USER node

EXPOSE 8003

CMD ["npm", "run", "dev"]

