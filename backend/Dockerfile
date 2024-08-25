# Étape 1: Utiliser Node.js 20 comme image de base
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port 10090
EXPOSE 10090

# Démarrer l'application en mode développement avec le serveur Vite
CMD ["node", "app.js"]