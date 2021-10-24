FROM node:lts

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN apt-get -q update && apt-get -qy install netcat

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 5000

CMD [ "yarn", "start" ]