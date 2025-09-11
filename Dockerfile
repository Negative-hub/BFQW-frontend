FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
# Если собираешь с переменными окружения, используй VITE_*, например VITE_API_URL
RUN npm run build

# ---- nginx stage ----
FROM nginx:1.27-alpine
# В Vite итоговая статика в папке dist
COPY --from=build /app/dist /usr/share/nginx/html
# Настроим Nginx на index.html fallback для SPA
RUN sed -i 's/try_files $uri $uri\/ =404;/try_files $uri $uri\/ \/index.html;/' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]