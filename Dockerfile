# Define a versão do Node.js Alpine que será utilizada
FROM node:alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copia todo o código fonte para o diretório de trabalho
COPY . .

# Define a porta que o servidor irá expor
EXPOSE 3333

