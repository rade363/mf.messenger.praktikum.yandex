FROM node:10.18.1

WORKDIR /app
COPY . .

RUN npm ci && npm run build

EXPOSE 4000

CMD ["npm", "start"]
