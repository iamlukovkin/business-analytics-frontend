FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN if [ ! -f ".env" ]; then echo ".env file not found! Aborting build."; exit 1; fi
RUN npm install --production

COPY . .
RUN npm run build
RUN npm prune --production && rm -rf src tests
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
