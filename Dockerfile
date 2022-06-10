# pull official base image
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json information and install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Copy all other files
COPY . .

# Build production files
RUN yarn run build --omit=dev

# Use nginx image to serve react files
FROM nginx
WORKDIR /root/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html/ptcgo-scanner
