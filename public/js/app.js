const recipeList = document.getElementById('recipe-list');
const recipeForm = document.getElementById('recipe-form');
const recipeListSection = document.getElementById('recipe-list-section');
const recipeFormSection = document.getElementById('recipe-form-section');
const formTitle = document.getElementById('form-title');
const submitButton = document.getElementById('submit-btn');
let editingRecipeId = null;

// Fonction pour afficher une section et masquer l'autre
function showSection(sectionId) {
    if (sectionId === 'recipe-list-section') {
        recipeListSection.style.display = 'block';
        recipeFormSection.style.display = 'none';
        fetchRecipes();
    } else if (sectionId === 'recipe-form-section') {
        recipeListSection.style.display = 'none';
        recipeFormSection.style.display = 'block';
    }
}

// Prépare le formulaire pour ajouter une nouvelle recette
function prepareAddRecipe() {
    editingRecipeId = null;
    formTitle.textContent = "Ajouter une Nouvelle Recette";
    submitButton.textContent = "Ajouter";
    recipeForm.reset();
    showSection('recipe-form-section');
}

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

// Fonction pour afficher le formulaire de modification avec les détails d'une recette
async function viewRecipe(id) {
    try {
        const response = await fetch(`/api/recipes/${id}`);
        const recipe = await response.json();

        showSection('recipe-form-section');
        formTitle.textContent = "Modifier la Recette";
        submitButton.textContent = "Enregistrer les modifications";

        document.getElementById('name').value = recipe.name;
        document.getElementById('description').value = recipe.description;
        document.getElementById('ingredients').value = recipe.ingredients.join(', ');
        document.getElementById('instructions').value = recipe.instructions;

        editingRecipeId = id;
    } catch (error) {
        console.error("Erreur lors de la récupération des détails de la recette :", error);
    }
}

// Fonction pour ajouter ou modifier une recette
recipeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const instructions = document.getElementById('instructions').value;

    try {
        if (editingRecipeId) {
            await fetch(`/api/recipes/${editingRecipeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, ingredients, instructions })
            });
            editingRecipeId = null;
            formTitle.textContent = "Ajouter une Nouvelle Recette";
            submitButton.textContent = "Ajouter";
        } else {
            await fetch('/api/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, ingredients, instructions })
            });
        }

        recipeForm.reset();
        showSection('recipe-list-section');
    } catch (error) {
        console.error("Erreur lors de la sauvegarde de la recette :", error);
    }
});

// Fonction pour supprimer une recette
async function deleteRecipe(id) {
    try {
        await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
        fetchRecipes();
    } catch (error) {
        console.error("Erreur lors de la suppression de la recette :", error);
    }
}

// Affiche la liste des recettes au chargement initial de la page
document.addEventListener('DOMContentLoaded', () => {
    showSection('recipe-list-section');
});
