# builder

FROM node:lts-slim AS builder

WORKDIR /opt/shit-ui-src

ADD . ./

RUN npm install

RUN npm run build

# runner

FROM nginx:alpine-slim

COPY --from=builder /opt/shit-ui-src/dist/school-homework-infomation-tool/ /usr/share/nginx/html
COPY --from=builder /opt/shit-ui-src/nginx.conf /etc/nginx/conf.d/school-homework-infomation-tool.conf



EXPOSE 80 
EXPOSE 443