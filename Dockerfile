FROM alpine
RUN apk add --update nodejs npm
COPY . /src
WORKDIR /src
RUN npm ci
EXPOSE 3000
CMD ["npm", "run", "start"]