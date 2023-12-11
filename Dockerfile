# Stage 1: Build planqk-proxy
FROM node:14-alpine AS builder
WORKDIR /app
COPY ./planqk-proxy/package.json ./planqk-proxy/
RUN cd ./planqk-proxy && npm install
COPY ./planqk-proxy/ ./planqk-proxy/

# Stage 2: Setup Nginx, Node and Supervisord
FROM node:14-alpine
WORKDIR /app
RUN apk add --no-cache nginx supervisor
COPY --from=builder /app/planqk-proxy/ /app/planqk-proxy/
COPY ./webapp /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./supervisord.conf /etc/supervisord.conf
EXPOSE 8080
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]