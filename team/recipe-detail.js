document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("recipeId");

    if (!recipeId) {
        document.getElementById("recipeDetail").textContent = "No recipe selected.";
        return;
    }

    // Get all recipes from localStorage
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // Try to find the recipe with the matching ID
    const recipe = recipes.find(r => r.id.toString() === recipeId);

    const container = document.getElementById("recipeDetail");

    if (recipe) {
        container.innerHTML = `
            <h2>${recipe.name}</h2>
            <img src="${recipe.image || "images/default.jpg"}" alt="${recipe.name}" width="300">
            <p><strong>Time:</strong> ${recipe.cookingTime} minutes</p>
            <p><strong>Ingredients:</strong> ${Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
    } else {
        container.textContent = "Recipe not found.";
    }
});
