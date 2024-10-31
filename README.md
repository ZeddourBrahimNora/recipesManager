
# Recipes Manager

Recipes Manager est une application de gestion de recettes permettant aux utilisateurs de créer, visualiser, modifier, rechercher et supprimer des recettes.

## Prérequis

- Node.js (version 20.17.0 ou plus)
- npm

## Installation et Lancement

### 1. Cloner le Repository

Clonez ce repository sur votre machine locale :

```bash
git clone https://github.com/ZeddourBrahimNora/recipesManager.git
cd recipesManager
```

### 2. Installer les Dépendances

Depuis le dossier racine du projet, exécutez la commande suivante pour installer toutes les dépendances nécessaires :

```bash
npm install
```

### 3. Lancer l'Application

#### Démarrer le Serveur Backend

1. Pour démarrer le serveur backend, exécutez la commande suivante depuis le dossier racine :

   ```bash
   npm start
   ```

   Cela lancera le serveur sur `http://localhost:5000`.



---

## Structure du Projet

Voici la structure principale de l'application :

- `controllers/recipeController.js` : Contient les fonctions pour gérer les recettes (créer, lire, mettre à jour, supprimer).
- `routes/` : Définit les routes de l'API.
- `public/` : Contient les fichiers du frontend, y compris `index.html`, `app.js` et `styles.css`.
- `index.js` : Point d'entrée de l'application, configurant le serveur Express.

## API RESTful

L'API backend propose les endpoints suivants :

- **GET /api/recipes** : Récupérer toutes les recettes.
- **POST /api/recipes** : Créer une nouvelle recette.
- **GET /api/recipes/:id** : Récupérer une recette par ID.
- **PUT /api/recipes/:id** : Mettre à jour une recette par ID.
- **DELETE /api/recipes/:id** : Supprimer une recette par ID.

## Notes supplémentaires

- Utilisez `npm run dev` pour lancer le serveur en mode développement avec **nodemon** afin de recharger automatiquement le serveur après chaque modification de code.
- Le backend est développé en Node.js avec Express, et les données sont stockées temporairement en mémoire (dans un tableau `recipes`).
- Ce projet ne comprend pas de base de données, donc les données seront réinitialisées à chaque redémarrage du serveur.


