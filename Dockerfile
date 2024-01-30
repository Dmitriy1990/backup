FROM node:21 as build

RUN mkdir -p /build_npm

WORKDIR /build_npm

COPY ./. /build_npm

RUN ls -la . && \
    npm install -g npm@6 && \
    npm install && \
    npm run-script build

FROM nginx:1-alpine

COPY --from=build /build_npm/nginx/docker/build /usr/share/nginx/html/build-front/
COPY --from=build /build_npm/nginx/docker/conf /etc/nginx/conf.d/

ENV BACKEND_UPSTREAM_SECTION="    server telegram-cleaner:8080;" \
    ESC="$" \
    PROXY_CONNECT_TIMEOUT="70" \
    PROXY_SEND_TIMEOUT="90" \
    PROXY_READ_TIMEOUT="90" \
    SEND_TIMEOUT="90" \
    CLIENT_MAX_BODY_SIZE="2200M" \
    CLIENT_BODY_BUFFER_SIZE="4M"

EXPOSE 80/tcp
EXPOSE 8000/tcp
EXPOSE 443/tcp

STOPSIGNAL SIGTERM

CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/conf.d/telegram-cleaner-front.conf.template > /etc/nginx/conf.d/default.conf && cat /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
