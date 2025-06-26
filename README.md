# 🌐 CERCLE - Réseau Social Moderne

**CERCLE** est une plateforme de réseau social moderne, sécurisée et performante construite avec une architecture microservices containerisée.

## 📋 Table des Matières

- [🎯 Vue d'ensemble](#-vue-densemble)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Stack Technique](#️-stack-technique)
- [🚀 Installation Rapide](#-installation-rapide)
- [🎮 Utilisation](#-utilisation)
- [🔒 Sécurité](#-sécurité)
- [🤝 Contribution](#-contribution)

## 🎯 Vue d'ensemble

**CERCLE** est un réseau social complet offrant une expérience utilisateur fluide et moderne avec toutes les fonctionnalités essentielles d'une plateforme sociale moderne.

### ✨ Fonctionnalités principales

#### 👤 Gestion des utilisateurs
- **Authentification sécurisée** avec JWT (access/refresh tokens)
- **Profils personnalisables** avec photos de profil
- **Comptes privés/publics** avec système de demandes
- **Système de suivi** (followers/following)
- **Onboarding** pour les nouveaux utilisateurs

#### 📝 Publications et contenu
- **Posts courts** (280 caractères) avec support média
- **Timeline personnalisée** et publique
- **Système de likes** et interactions
- **Commentaires hiérarchiques** et threads de discussion
- **Upload de médias** (images/vidéos) via MinIO

#### 💬 Communication
- **Messagerie privée** temps réel
- **Notifications** en temps réel
- **Recherche** d'utilisateurs et de contenu

#### 🛡️ Modération et administration
- **Interface d'administration** complète
- **Système de signalement** de contenu
- **Bannissement temporaire/permanent** des utilisateurs
- **Modération** de contenu inapproprié
- **Statistiques** et analytics détaillées

#### 🎨 Interface utilisateur
- **Design responsive** mobile-first
- **Thème sombre/clair** personnalisable
- **Interface moderne** avec TailwindCSS
- **Animations fluides** et micro-interactions

### 🚀 Points forts techniques

- **Performance** : Architecture optimisée avec cache et pagination
- **Sécurité** : Protection CORS, XSS, injection SQL, rate limiting
- **Scalabilité** : Microservices containerisés prêts pour la production
- **Developer Experience** : Docker, hot-reload, documentation complète
- **Monitoring** : Logs centralisés avec Winston

## 🏗️ Architecture

### Structure du projet

```
📁 web-groupe-1/
├── 📁 backend/                   # API Node.js + Express
│   ├── 📁 src/
│   │   ├── 📁 controllers/       # Logique métier (Auth, Posts, Users...)
│   │   ├── 📁 middleware/        # Auth, validation, rate limiting
│   │   ├── 📁 routes/           # Routes API REST
│   │   ├── 📁 services/         # Services (JWT, upload, etc.)
│   │   ├── 📁 utils/           # Utilitaires (logger, database)
│   │   ├── 📁 validators/       # Validation Joi
│   │   └── 📁 config/          # Configuration MinIO, DB
│   ├── 📁 prisma/              # Schema et migrations Prisma
│   ├── 📄 server.js            # Point d'entrée API
│   ├── 📄 Dockerfile           # Image Docker backend
│   └── 📄 package.json         # Dépendances Node.js
├── 📁 frontend/                  # Frontend React
│   ├── 📁 src/
│   │   ├── 📁 components/       # Composants UI réutilisables
│   │   │   ├── 📁 admin/       # Interface d'administration
│   │   │   └── 📁 ui/          # Composants de base
│   │   ├── 📁 context/         # Context React (Auth, Theme)
│   │   ├── 📁 stores/          # État global Zustand
│   │   ├── 📁 services/        # Services API (auth, posts, media)
│   │   └── 📄 App.jsx          # Composant racine
│   ├── 📄 Dockerfile           # Image Docker frontend
│   ├── 📄 vite.config.js       # Configuration Vite
│   └── 📄 tailwind.config.js   # Configuration TailwindCSS
├── 📄 docker-compose.yml        # Orchestration complète
├── 📄 .env.example             # Template variables d'environnement
└── 📄 README.md                # Cette documentation
```

## 🛠️ Stack Technique

### Backend
| Technologie | Version | Rôle |
|-------------|---------|------|
| **Node.js** | 18+ | Runtime JavaScript serveur |
| **Express.js** | 4.18+ | Framework web minimaliste |
| **PostgreSQL** | 16+ | Base de données relationnelle |
| **Prisma** | 5.7+ | ORM type-safe avec migrations |
| **JWT** | 9.0+ | Authentification stateless |
| **Joi** | 17.13+ | Validation de données robuste |
| **Winston** | 3.11+ | Logging centralisé et structuré |
| **Helmet** | 7.2+ | Sécurité HTTP headers |
| **MinIO** | Latest | Stockage S3-compatible pour médias |

### Frontend
| Technologie | Version | Rôle |
|-------------|---------|------|
| **React** | 18+ | Bibliothèque UI moderne |
| **Vite** | 5+ | Build tool ultra-rapide |
| **TailwindCSS** | 3+ | Framework CSS utility-first |
| **React Router** | 6+ | Navigation SPA |
| **Zustand** | 4+ | Gestion d'état légère |
| **Axios** | 1+ | Client HTTP avec intercepteurs |
| **Lucide React** | 0.263+ | Icônes modernes |

### Infrastructure
| Service | Rôle | Configuration |
|---------|------|---------------|
| **Docker** | Containerisation | Multi-stage builds |
| **Docker Compose** | Orchestration locale | Services interconnectés |
| **PostgreSQL** | Base de données | Volume persistant |
| **MinIO** | Stockage objet | Buckets automatisés |

## 🚀 Installation Rapide

### Prérequis

- **Node.js** 18+ et npm
- **Docker** et Docker Compose
- **Git**

### Installation avec Docker (Recommandé)

```bash
# 1. Cloner le projet
git clone https://github.com/CESI-FISA-Info-24-27/web-groupe-1.git
cd web-groupe-1

# 2. Configuration des variables d'environnement
cp .env.example .env

# 3. Personnaliser les variables dans .env
# Modifier les mots de passe, secrets JWT, etc.

# 4. Démarrer tous les services
docker-compose up -d
```

L'application sera accessible sur :
- **Frontend** : http://localhost:5173
- **API** : http://localhost:3000
- **MinIO Console** : http://localhost:9001

## 🎮 Utilisation

### Fonctionnalités de test

1. **Inscription/Connexion** : Créez un nouveau compte ou utilisez les comptes de test
2. **Onboarding** : Suivez le processus d'accueil pour nouveaux utilisateurs
3. **Publications** : Créez des posts avec du texte et des images
4. **Interactions** : Likez, commentez, partagez du contenu
5. **Messages privés** : Envoyez des messages à d'autres utilisateurs
6. **Administration** : Connectez-vous avec le compte admin pour accéder au backoffice

## 🔒 Sécurité

### Mesures implémentées

- **🔑 Authentification JWT** avec tokens d'accès et de rafraîchissement
- **🛡️ Hachage bcrypt** des mots de passe (12 rounds)
- **🚦 Rate limiting** sur les endpoints sensibles
- **🔒 Headers de sécurité** avec Helmet.js
- **🚫 Protection CORS** configurée finement
- **✅ Validation stricte** des données avec Joi
- **🗄️ Protection SQL injection** avec Prisma ORM
- **📁 Upload sécurisé** avec validation de type MIME

### Issues et bugs

Pour signaler un bug ou proposer une fonctionnalité :

1. **Vérifiez** qu'une issue similaire n'existe pas déjà
2. **Utilisez** les templates fournis
3. **Incluez** les détails de reproduction
4. **Ajoutez** les labels appropriés

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Développé avec ❤️ par l'équipe CERCLE**
