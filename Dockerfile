# --- Stage 1: build the React frontend ---
FROM node:22-alpine AS frontend-build
WORKDIR /app/FrontEnd
COPY FrontEnd/package*.json ./
RUN npm ci
COPY FrontEnd/ ./
RUN npm run build

# --- Stage 2: production backend, serving the built frontend ---
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY BackEnd/ ./BackEnd/
COPY --from=frontend-build /app/FrontEnd/dist ./FrontEnd/dist

EXPOSE 3001
CMD ["node", "BackEnd/server.js"]
