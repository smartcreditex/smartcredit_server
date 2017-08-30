FROM node:8-stretch

WORKDIR /
RUN git clone https://github.com/smartcreditex/smartcredit_server
WORKDIR /smartcredit_server
RUN npm install --save
CMD "node" "server.js"