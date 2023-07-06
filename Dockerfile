# Define a versão do Node.js Alpine que será utilizada
FROM node:alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código fonte para o diretório de trabalho
COPY . .

# Navega para a pasta do frontend e executa o build
RUN cd frontend && npm run build

# Define a porta que o servidor irá expor
EXPOSE 3333

# Comando para iniciar o servidor
CMD ["npm", "start"]