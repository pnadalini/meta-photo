FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

ENV PORT=8000

CMD ["node", "dist/index.js"]
