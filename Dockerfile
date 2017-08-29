FROM node:8-stretch

WORKDIR /
RUN git clone https://github.com/smartcreditex/smartcredit_server
WORKDIR /smartcredit_server
CMD ["node" "server.js"]