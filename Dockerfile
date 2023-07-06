# Define a versão do Node.js Alpine que será utilizada
FROM node:alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copia todo o código fonte para o diretório de trabalho
COPY . .

# Navega para a pasta do backend e executa o build
WORKDIR /usr/app/backend
RUN npm run build

# Define a porta que o servidor irá expor
EXPOSE 3333

# Comando para iniciar o servidor
CMD ["node", "backend/src/index.js"]
