FROM node:12.2.0-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN yarn install --silent
RUN yarn global add react-scripts@3.0.1 --silent
RUN yarn global add serve

COPY . /app

RUN yarn run build

EXPOSE 3000

CMD serve -s build -l 3000
