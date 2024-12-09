FROM alpine
RUN apk add --update nodejs npm
COPY . /src
WORKDIR /src
RUN npm ci
RUN cat .env
EXPOSE 3000
CMD ["npm", "run", "start"]