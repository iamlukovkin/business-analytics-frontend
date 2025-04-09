FROM node:18-alpine
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
