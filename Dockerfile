FROM node:20.9.0

WORKDIR /home/manifest
COPY . .

RUN npm install
RUN npm run build

RUN chmod +x /home/manifest/startup.sh

CMD ["bash", "/home/manifest/startup.sh"]

EXPOSE ${CONFIG_APP_PORT}