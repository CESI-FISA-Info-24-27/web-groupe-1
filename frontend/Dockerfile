# Dockerfile.dev - Mode développement pour le frontend
FROM node:18-alpine

# Installer git pour certaines dépendances
RUN apk add --no-cache git curl

WORKDIR /app

# Copier package.json pour installer les dépendances
COPY package*.json ./

# Installer toutes les dépendances
RUN npm install

# Le code sera monté via volume, pas copié
# Exposer le port Vite
EXPOSE 5173

# Variables d'environnement pour le développement
ENV NODE_ENV=development

# Script de démarrage Vite avec hot reload
CMD ["sh", "-c", "\
  echo '🚀 Démarrage du frontend en mode développement...' && \
  echo '⚡ Hot reload activé sur le port 5173' && \
  npm run dev -- --host 0.0.0.0 --port 5173 \
"]
