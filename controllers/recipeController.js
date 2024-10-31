
let recipes = [];

// Fonction utilitaire pour gérer les réponses d'erreur
const handleError = (res, error, message = "Erreur serveur", statusCode = 500) => {
    console.error(message, error);
    res.status(statusCode).json({ message });
};

// Fonction utilitaire pour valider les champs d'une recette
const validateRecipeFields = (recipeData) => {
    const { name, description, ingredients, instructions } = recipeData;
    if (!name || !description || !Array.isArray(ingredients) || !instructions) {
        return { isValid: false, message: "Tous les champs sont requis et les ingrédients doivent être un tableau" };
    }
    return { isValid: true };
};

/**
 * Récupérer toutes les recettes
 */
exports.getAllRecipes = async (req, res) => {
    try {
        res.status(200).json(recipes);
    } catch (error) {
        handleError(res, error, "Erreur lors de la récupération des recettes");
    }
};

/**
 * Créer une nouvelle recette
 */
exports.createRecipe = async (req, res) => {
    try {
        const validation = validateRecipeFields(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }

        const { name, description, ingredients, instructions } = req.body;
        const newRecipe = {
            id: recipes.length + 1,
            name,
            description,
            ingredients,
            instructions,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        recipes.push(newRecipe);
        res.status(201).json(newRecipe);
    } catch (error) {
        handleError(res, error, "Erreur lors de la création de la recette");
    }
};

/**
 * Recup une recette par ID
 */
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = recipes.find(r => r.id === parseInt(req.params.id));
        if (!recipe) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        handleError(res, error, "Erreur lors de la récupération de la recette");
    }
};

/**
 * Mettre à jour une recette par ID
 */
exports.updateRecipe = async (req, res) => {
    try {
        const validation = validateRecipeFields(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }

        const recipeIndex = recipes.findIndex(r => r.id === parseInt(req.params.id));
        if (recipeIndex === -1) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }

        const { name, description, ingredients, instructions } = req.body;
        recipes[recipeIndex] = {
            ...recipes[recipeIndex],
            name,
            description,
            ingredients,
            instructions,
            updatedAt: new Date()
        };

        res.status(200).json(recipes[recipeIndex]);
    } catch (error) {
        handleError(res, error, "Erreur lors de la mise à jour de la recette");
    }
};

/**
 * Supprimer une recette par ID
 */
exports.deleteRecipe = async (req, res) => {
    try {
        const recipeIndex = recipes.findIndex(r => r.id === parseInt(req.params.id));
        if (recipeIndex === -1) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }

        const deletedRecipe = recipes.splice(recipeIndex, 1);
        res.status(200).json({ message: "Recette supprimée avec succès", recipe: deletedRecipe });
    } catch (error) {
        handleError(res, error, "Erreur lors de la suppression de la recette");
    }
};
