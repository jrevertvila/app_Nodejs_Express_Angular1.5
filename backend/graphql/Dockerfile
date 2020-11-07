FROM ubuntu
WORKDIR /home/server/app/backend/graphql
COPY . .
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y mongodb
RUN npm install
EXPOSE 3001
RUN service mongodb start
CMD [ "npm","run","dev" ]