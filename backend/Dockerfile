FROM node:18.16-bullseye-slim

RUN npm install -g nodemon

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm", "run", "dev"]