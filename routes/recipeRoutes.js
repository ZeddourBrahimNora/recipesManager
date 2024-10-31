const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
  @route   GET /api/recipes
  @description    Recup la liste de toutes les recettes
  @access  Public
 */
router.get('/recipes', recipeController.getAllRecipes);

/**
  @route   POST /api/recipes
  @description   Créer une nouvelle recette
  @access  Public
 */
router.post('/recipes', recipeController.createRecipe);

/**
 * @route   GET /api/recipes/:id
 * @description    Recup une recette spécifique par ID
 * @access  Public
 */
router.get('/recipes/:id', recipeController.getRecipeById);

/**
 * @route   PUT /api/recipes/:id
 * @description    Mettre à jour une recette spécifique par ID
 * @access  Public
 */
router.put('/recipes/:id', recipeController.updateRecipe);

/**
 * @route   DELETE /api/recipes/:id
 * @description    Supprimer une recette spécifique par ID
 * @access  Public
 */
router.delete('/recipes/:id', recipeController.deleteRecipe);

module.exports = router;