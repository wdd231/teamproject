document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("recipeId");

    if (!recipeId) {
        document.getElementById("recipeDetail").textContent = "No recipe selected.";
        return;
    }

    const container = document.getElementById("recipeDetail");

    // Step 1: Try localStorage first
    const localRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const localRecipe = localRecipes.find(r => r.id.toString() === recipeId);

    if (localRecipe) {
        renderRecipe(localRecipe);
    } else {
        // Step 2: Try fetching from API
        fetch("https://dummyjson.com/recipes")
            .then(response => response.json())
            .then(data => {
                const apiRecipe = data.recipes.find(r => r.id.toString() === recipeId);
                if (apiRecipe) {
                    renderRecipe(apiRecipe);
                } else {
                    container.textContent = "Recipe not found.";
                }
            })
            .catch(error => {
                console.error("Error fetching API recipes:", error);
                container.textContent = "Error loading recipe.";
            });
    }

    function renderRecipe(recipe) {
        container.innerHTML = `
            <h2>${recipe.name}</h2>
            <img src="${recipe.image || recipe.image_url || "images/default.jpg"}" alt="${recipe.name}" width="300">
            <p><strong>Time:</strong> ${recipe.cookingTime || recipe.time || "?"} minutes</p>
            <p><strong>Ingredients:</strong> ${Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${Array.isArray(recipe.instructions) ? recipe.instructions.join(" ") : recipe.instructions}</p>
        `;
    }
});
