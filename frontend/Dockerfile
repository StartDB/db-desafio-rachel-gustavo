FROM node:18-alpine
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview", "--", "--port", "8080", "--host","0.0.0.0"]