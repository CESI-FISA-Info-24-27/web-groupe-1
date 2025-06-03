# 🌐 Réseau Social Moderne - CERCLE

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![React](https://img.shields.io/badge/React-18%2B-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16%2B-blue)
![Docker](https://img.shields.io/badge/Docker-ready-blue)
![API](https://img.shields.io/badge/API-REST-orange)

Une plateforme de réseau social moderne, rapide et scalable construite avec une architecture microservices.

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API Documentation](#api-documentation)
- [Base de données](#base-de-données)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Contribution](#contribution)

## 🎯 Vue d'ensemble

**CERCLE** est un réseau social léger et performant conçu pour offrir une expérience utilisateur fluide avec des fonctionnalités essentielles :

### ✨ Fonctionnalités principales

- **Authentification sécurisée** avec JWT (access/refresh tokens)
- **Publication de messages** courts (280 caractères max)
- **Système de likes** et interactions
- **Timeline personnalisée** et publique
- **Système de followers/following** avec comptes privés
- **Messagerie privée** en temps réel
- **Profils utilisateur** personnalisables
- **Recherche** d'utilisateurs et de contenu
- **Upload de médias** (images/vidéos)
- **Modération** et signalement
- **Interface responsive** mobile-first

### 🚀 Points forts

- **Performance** : Architecture optimisée pour les environnements à faibles ressources
- **Sécurité** : Protection CORS, XSS, injection SQL, rate limiting
- **Scalabilité** : Architecture modulaire prête pour la croissance
- **Developer Experience** : Documentation complète, tests, Docker

## 🏗️ Architecture

### Schéma général

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   React + Vite  │◄──►│   Node.js       │◄──►│   PostgreSQL    │
│   TailwindCSS   │    │   Express       │    │   Prisma ORM    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   File Storage  │
                       │   MinIO         │
                       └─────────────────┘
```

### Structure du projet

```
📁 social-network/
├── 📁 api/                    # Backend API (Node.js + Express)
│   ├── 📁 src/
│   │   ├── 📁 controllers/    # Logique métier
│   │   ├── 📁 middleware/     # Middlewares (auth, validation)
│   │   ├── 📁 routes/         # Routes API
│   │   ├── 📁 services/       # Services (tokens, etc.)
│   │   ├── 📁 utils/          # Utilitaires (logger, database)
│   │   └── 📁 validators/     # Validation Joi
│   ├── 📁 prisma/            # Schema et migrations
│   └── 📄 server.js          # Point d'entrée
├── 📁 web_app/               # Frontend React
│   ├── 📁 src/
│   │   ├── 📁 components/    # Composants réutilisables
│   │   ├── 📁 pages/         # Pages de l'app
│   │   ├── 📁 store/         # État global (Zustand)
│   │   └── 📄 App.jsx        # Composant principal
├── 📁 database/              # Scripts SQL et configuration
└── 📄 docker-compose.yml     # Orchestration des services
```

## 🛠️ Technologies

### Backend
- **Node.js** (18+) - Runtime JavaScript
- **Express.js** - Framework web minimaliste
- **PostgreSQL** (16+) - Base de données relationnelle
- **Prisma** - ORM type-safe
- **JWT** - Authentification stateless
- **Joi** - Validation des données
- **Winston** - Logging avancé
- **Helmet** - Sécurité HTTP
- **Docker** - Containerisation

### Frontend
- **React** (18+) - Bibliothèque UI
- **Vite** - Build tool rapide
- **TailwindCSS** - Framework CSS utility-first
- **React Router** - Navigation SPA
- **Zustand** - Gestion d'état légère
- **Axios** - Client HTTP
- **React Hook Form** - Gestion de formulaires

### Infrastructure
- **MinIO** - Stockage d'objets S3-compatible
- **Docker Compose** - Orchestration locale
- **ESLint + Prettier** - Qualité de code

## 🚀 Installation

### Prérequis

- **Node.js** 18+ et npm
- **Docker** et Docker Compose
- **Git**

### Installation rapide

```bash
# 1. Cloner le projet
git clone <repository-url>
cd social-network

# 2. Configuration des variables d'environnement
cp .env.template .env
cp api/.env.example api/.env

# 3. Démarrer les services avec Docker
docker-compose up -d

# 4. Installer les dépendances API
cd api
npm install

# 5. Migrations et seed de la base
npm run db:migrate
npm run db:seed

# 6. Installer les dépendances Frontend
cd ../web_app
npm install

# 7. Démarrer le développement
npm run dev
```

### Installation manuelle (sans Docker)

```bash
# 1. Démarrer PostgreSQL localement
# Exemple avec Docker :
docker run -d --name social_postgres \
  -e POSTGRES_DB=social_network \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres123 \
  -p 5432:5432 postgres:16

# 2. Configuration API
cd api
cp .env.example .env
# Modifier DATABASE_URL dans .env

# 3. Installation et migration
npm install
npm run db:migrate
npm run db:seed

# 4. Démarrer l'API
npm run dev

# 5. Dans un autre terminal - Frontend
cd ../web_app
npm install
npm run dev
```

## ⚙️ Configuration

### Variables d'environnement (.env)

#### Base de données
```env
DATABASE_URL=postgresql://username:password@host:5432/social_network
```

#### JWT
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

#### Sécurité
```env
BCRYPT_ROUNDS=12
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_MAX_REQUESTS=100
```

#### Fonctionnalités
```env
MAX_POST_LENGTH=280
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp
```

### Docker Compose (.env pour services)

```env
# PostgreSQL
POSTGRES_DB=social_network
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
HOST_PORT=5432

# MinIO
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
MINIO_API_PORT=9000
MINIO_CONSOLE_PORT=9001
MINIO_DEFAULT_BUCKETS=avatars,posts,media
```

## 🎮 Utilisation

### Accès aux services

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | Interface utilisateur |
| API | http://localhost:3000 | API REST |
| API Docs | http://localhost:3000/health | Health check |
| MinIO Console | http://localhost:9001 | Interface MinIO |
| Database | localhost:5432 | PostgreSQL |

### Comptes de test (après seed)

| Email | Mot de passe | Rôle | Description |
|-------|-------------|------|-------------|
| admin@social.com | password123 | ADMIN | Administrateur |
| alice@example.com | password123 | USER | Utilisateur certifié |
| bob@example.com | password123 | USER | Compte public |
| charlie@example.com | password123 | USER | Compte privé |

### Commandes utiles

#### Développement
```bash
# API
npm run dev          # Démarrer en mode dev
npm run db:studio    # Interface Prisma Studio
npm run db:reset     # Reset complet de la DB

# Frontend
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
```

#### Docker
```bash
npm run docker:build  # Construire l'image
npm run docker:up     # Démarrer avec docker-compose
npm run docker:down   # Arrêter les services
npm run docker:logs   # Voir les logs
```

#### Tests et qualité
```bash
npm run test         # Tests unitaires
npm run test:coverage # Couverture de tests
npm run lint         # Vérification ESLint
npm run format       # Formatage Prettier
```

## 📚 API Documentation

### Authentification

#### Inscription
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "mail": "john@example.com",
  "password": "Password123",
  "nom": "Doe",
  "prenom": "John"
}
```

#### Connexion
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "mail": "john@example.com",
  "password": "Password123"
}
```

### Posts

#### Créer un post
```http
POST /api/v1/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Mon premier post ! 🚀"
}
```

#### Timeline personnalisée
```http
GET /api/v1/posts/timeline/personal?page=1&limit=20
Authorization: Bearer <token>
```

#### Timeline publique
```http
GET /api/v1/posts/public?page=1&limit=20
```

### Interactions

#### Liker un post
```http
POST /api/v1/likes/posts/{post_id}
Authorization: Bearer <token>
```

#### Suivre un utilisateur
```http
POST /api/v1/follow/{user_id}
Authorization: Bearer <token>
```

### Messages privés

#### Envoyer un message
```http
POST /api/v1/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "receiver": "user_id",
  "message": "Salut ! Comment ça va ?"
}
```

> 📖 **Documentation complète** disponible dans [api/wiki/doc.md](api/wiki/doc.md)

## 🗃️ Base de données

### Modèle de données

```sql
-- Utilisateurs
users (id_user, username, mail, password_hash, bio, photo_profil, private, certified...)

-- Posts
post (id_post, id_user, content, created_at, active...)

-- Relations
follow (follower, account, pending, active...)
likes (id_user, id_post, created_at...)
messages_prives (sender, receiver, message, send_at, read_at...)

-- Configuration
roles (id_role, role)
```

### Migrations

```bash
# Créer une nouvelle migration
npx prisma migrate dev --name add_new_feature

# Appliquer les migrations en production
npx prisma migrate deploy

# Générer le client Prisma
npx prisma generate

# Reset complet (dev uniquement)
npx prisma migrate reset
```

### Seed des données

```bash
# Peupler avec des données de test
npm run db:seed

# Utilisation de la procédure stockée
SELECT * FROM cercle.create_user(
  'Dupont', 'Jean', 'jean_dupont', 
  'jean@example.com', '$2b$12$hash...'
);
```

## 🧪 Tests

### Structure des tests

```
📁 api/tests/
├── 📁 unit/          # Tests unitaires
├── 📁 integration/   # Tests d'intégration
└── 📁 fixtures/      # Données de test
```

### Exécution des tests

```bash
# Tests complets
npm test

# Tests en mode watch
npm run test:watch

# Couverture de code
npm run test:coverage

# Tests d'intégration uniquement
npm run test:integration
```

### Exemple de test

```javascript
describe('POST /api/v1/auth/login', () => {
  it('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        mail: 'test@example.com',
        password: 'password123'
      })
      .expect(200)

    expect(response.body).toHaveProperty('accessToken')
    expect(response.body.user.mail).toBe('test@example.com')
  })
})
```

## 🚀 Déploiement

### Déploiement avec Docker

#### Production simple
```bash
# 1. Build de l'image de production
docker build -t social-network-api ./api

# 2. Déploiement avec docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

#### Variables d'environnement de production
```env
NODE_ENV=production
API_PORT=3000
DATABASE_URL=postgresql://user:password@prod-db:5432/social_network
JWT_SECRET=your-production-secret-key-very-long-and-secure
FRONTEND_URL=https://your-domain.com
LOG_LEVEL=warn
```

### Plateformes de déploiement

#### Backend (API)
- **Railway** - Déploiement simple et rapide
- **Render** - Gratuit avec PostgreSQL inclus
- **Heroku** - Classic PaaS
- **DigitalOcean App Platform** - Scalable
- **VPS personnel** - Contrôle total

#### Frontend
- **Vercel** - Optimisé pour React
- **Netlify** - Déploiement continu
- **GitHub Pages** - Gratuit pour projets publics
- **Serveur statique** (Nginx)

#### Base de données
- **Supabase** - PostgreSQL managed gratuit
- **Neon** - PostgreSQL serverless
- **Railway** - PostgreSQL intégré
- **AWS RDS** - PostgreSQL en production

### Exemple déploiement Vercel + Railway

```bash
# 1. Frontend sur Vercel
npm install -g vercel
cd web_app
vercel --prod

# 2. Backend sur Railway
# - Connecter le repo GitHub
# - Configurer les variables d'environnement
# - Déploiement automatique

# 3. Database sur Supabase
# - Créer un projet
# - Récupérer DATABASE_URL
# - Exécuter les migrations
```

## 🔧 Maintenance

### Monitoring et logs

```bash
# Logs en temps réel
docker-compose logs -f api

# Logs d'erreur uniquement
tail -f api/logs/error.log

# Monitoring des performances
docker stats
```

### Backup de la base de données

```bash
# Backup complet
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
psql $DATABASE_URL < backup_file.sql
```

### Mise à jour des dépendances

```bash
# Vérifier les mises à jour
npm outdated

# Mettre à jour (patch/minor)
npm update

# Mise à jour majeure (avec prudence)
npm install package@latest
```

## 🤝 Contribution

### Workflow de développement

1. **Fork** du projet
2. **Créer une branche** feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commit** des changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Pull Request**

### Standards de code

- **ESLint** pour la qualité JavaScript
- **Prettier** pour le formatage
- **Conventional Commits** pour les messages
- **Tests** obligatoires pour les nouvelles fonctionnalités

### Structure des commits

```bash
# Exemples de commits
feat: ajouter système de notifications
fix: corriger bug de connexion JWT
docs: mettre à jour README
test: ajouter tests pour l'authentification
refactor: optimiser les requêtes de timeline
```

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

Développé dans le cadre d'un projet étudiant avec :

- **Backend** : Node.js, Express, PostgreSQL
- **Frontend** : React, TailwindCSS
- **DevOps** : Docker, CI/CD

## 🆘 Support

### Problèmes fréquents

#### Erreur de connexion à la base
```bash
# Vérifier que PostgreSQL est démarré
docker ps | grep postgres

# Vérifier les variables d'environnement
echo $DATABASE_URL
```

#### Erreur CORS
```bash
# Vérifier FRONTEND_URL dans .env
FRONTEND_URL=http://localhost:5173
```

#### Port déjà utilisé
```bash
# Trouver le processus qui utilise le port
lsof -i :3000
# Arrêter le processus
kill -9 <PID>
```

### Liens utiles

- 📖 [Documentation API complète](api/wiki/doc.md)
- 🐛 [Signaler un bug](issues)
- 💡 [Proposer une fonctionnalité](issues)
- 📧 Contact : ts

---

**🌟 Star le projet si il vous plaît !**

---

<div align="center">
  <p>Fait avec ❤️ par l'équipe de développement</p>
  <p>© 2025 CERCLE - Réseau Social Moderne</p>
</div>