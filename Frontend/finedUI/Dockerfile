# syntax=docker / dockerfile:1
From node:18.5
WORKDIR 
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "react-native", "start"]