# Dockerfile.dev - Mode développement pour le backend
FROM node:18-alpine

# Installer les outils nécessaires
RUN apk add --no-cache \
    curl \
    postgresql-client \
    git \
    openssl \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copier package.json pour installer les dépendances
COPY package*.json ./

# Installer toutes les dépendances (y compris dev)
RUN npm install

# Installer nodemon globalement si pas dans les dépendances
RUN npm list nodemon || npm install -g nodemon

# Le code sera monté via volume, pas copié
# Créer les dossiers nécessaires
RUN mkdir -p uploads logs temp prisma

# Exposer le port
EXPOSE 3000

# Variables d'environnement pour le développement
ENV NODE_ENV=development
ENV PORT=3000

# Script de démarrage pour le développement
CMD ["sh", "-c", "\
  echo '🚀 Démarrage en mode développement...' && \
  echo 'Attente de la base de données...' && \
  sleep 5 && \
  if [ -f prisma/schema.prisma ]; then \
    echo '📊 Génération du client Prisma...' && \
    npx prisma generate && \
    echo '🔄 Application des migrations...' && \
    npx prisma migrate dev --name init || \
    npx prisma db push || \
    echo 'Impossible d\\'appliquer les migrations'; \
  fi && \
  echo '⚡ Démarrage avec hot reload...' && \
  npm run dev \
"]
