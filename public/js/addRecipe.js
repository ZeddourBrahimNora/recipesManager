const recipeForm = document.getElementById('recipe-form');
const formTitle = document.getElementById('form-title');
const submitButton = document.getElementById('submit-btn');
let editingRecipeId = null;

// Fonction pour ajouter ou modifier une recette
recipeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const ingredients = document.getElementById('ingredients').value.trim().split(',');
    const instructions = document.getElementById('instructions').value.trim();

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
        window.location.href = "../pages/recipes.html"; // Redirection vers la liste des recettes
    } catch (error) {
        console.error("Erreur lors de la sauvegarde de la recette :", error);
    }
});
