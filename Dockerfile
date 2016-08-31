FROM node:4.4-onbuild
RUN apt-get -y update
RUN apt-get install -y mysql-server mysql-client libmysqlclient-dev
RUN npm install -g sails
WORKDIR '/app'
CMD sails lift
