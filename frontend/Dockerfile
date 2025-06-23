# ===================================
# DOCKERFILE FRONTEND POUR DOCKER
# ===================================
FROM node:18-alpine

# Installer curl pour healthcheck
RUN apk add --no-cache curl dumb-init

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

USER nodejs

# Exposer le port
EXPOSE 5173

# Point d'entrée avec dumb-init
ENTRYPOINT ["dumb-init", "--"]

# Commande par défaut
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]