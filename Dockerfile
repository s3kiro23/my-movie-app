# Utilisation d'une image Node.js
FROM node:18-alpine

# Créer un répertoire de travail
WORKDIR /app

# Copier les dépendances de l'application
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install --production

# Copier le reste des fichiers de l'application
COPY . .

# Construction de l'application
RUN yarn build

# Exposer le port sur lequel l'application fonctionnera
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["yarn", "start"]