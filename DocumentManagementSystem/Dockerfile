FROM node:23-slim AS builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html/DocumentManagementSystem
COPY --from=builder /app/dist /usr/share/nginx/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
