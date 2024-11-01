const recipeList = document.getElementById('recipe-list');

// Fonction pour récupérer et afficher les recettes
async function fetchRecipes() {
    try {
        const response = await fetch('/api/recipes');
        const recipes = await response.json();
        recipeList.innerHTML = recipes.map(recipe => `
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.name}</h5>
                        <p class="card-text">${recipe.description}</p>
                        <p><strong>Ingrédients :</strong> ${recipe.ingredients.join(', ')}</p>
                        <p><strong>Instructions :</strong> ${recipe.instructions}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="viewRecipe(${recipe.id})" class="btn btn-info btn-sm">Voir</button>
                        <button onclick="deleteRecipe(${recipe.id})" class="btn btn-danger btn-sm">Supprimer</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Erreur lors de la récupération des recettes :", error);
    }
}

// Supprime une recette
async function deleteRecipe(id) {
    try {
        await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
        fetchRecipes();
    } catch (error) {
        console.error("Erreur lors de la suppression de la recette :", error);
    }
}

// Initialisation de la liste des recettes
fetchRecipes();
