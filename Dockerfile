FROM node:22-bookworm

WORKDIR /app

# Install dependencies first so they cache between source changes.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Metro bundler / Expo dev server
EXPOSE 8081

CMD ["npx", "expo", "start", "--tunnel", "ngrok"]
