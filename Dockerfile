# 1️⃣ Usando Node.js como base para build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
COPY . .

ENV GENERATE_SOURCEMAP=false
RUN npm install
RUN npm run build

# Etapa 2️⃣: Servindo a aplicação com Nginx
FROM nginx:alpine

# Copia os arquivos de produção gerados na primeira etapa
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]