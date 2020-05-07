FROM node:alpine as mybuild
WORKDIR /opt/app
COPY ./package.json .
RUN yarn install
COPY . .
RUN yarn build

CMD ["yarn", "start"]

FROM nginx
COPY --from=mybuild /opt/app/build /use/share/ngnix/html
