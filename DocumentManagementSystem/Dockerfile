FROM node:23-slim


WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production

COPY . /app

CMD ["npm", "run", "dev"]
