FROM node:18-alpine

RUN apk update && apk upgrade
RUN apk add --no-cache openssl

WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install
RUN npm install pg
RUN npm install nodemailer
RUN npm install minio sharp

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000

# Utiliser CMD avec un tableau (pas de shell) - compatible Windows
CMD ["npm", "run", "dev"]