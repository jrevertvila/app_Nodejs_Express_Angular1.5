FROM ubuntu
WORKDIR /home/server/rest
COPY . .
RUN apt update
RUN apt install -y nodejs
RUN apt install -y npm
RUN apt install -y mongodb
RUN npm install
EXPOSE 3000
RUN chmod +x init.sh
#service mongodb start doesn't works on RUN or CMD
CMD [ "./init.sh" ]
