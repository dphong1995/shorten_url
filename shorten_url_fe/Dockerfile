# syntax=docker/dockerfile:1
FROM node:alpine
RUN mkdir -p /myapp
ENV PORT 3003
WORKDIR /myapp

COPY package.json /myapp
COPY yarn.lock /myapp
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

RUN yarn install
EXPOSE 3003
CMD [ "yarn", "start" ]
