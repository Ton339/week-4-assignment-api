FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm install
COPY . .

FROM base AS builder
RUN npm install
COPY . .
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist
USER node 
EXPOSE 3001
CMD ["node", "dist/main"]