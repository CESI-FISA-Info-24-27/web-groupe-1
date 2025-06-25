# Utiliser l'image de votre collègue qui contient déjà Sharp
FROM matteoturc/theo-sharp:latest

WORKDIR /app

# Copier package.json (avec Sharp inclus cette fois)
COPY package*.json ./

# Installation complète (production + development)
RUN npm install

# Installer spécifiquement les packages qui pourraient manquer
RUN npm install bcryptjs nodemon --save

# Copier le code source
COPY . .

# Générer Prisma
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "dev"]