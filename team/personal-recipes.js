let allRecipes = [];

document.addEventListener("DOMContentLoaded", function () {
    allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    renderRecipes(allRecipes);
});

function renderRecipes(recipes) {
    const container = document.getElementById("personalRecipeList");
    container.innerHTML = "";

    if (recipes.length === 0) {
        container.innerHTML = "<p>No matching recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
      <h2><a href="recipe.html?id=${recipe.id}">${recipe.name}</a></h2>
      <p><strong>Type:</strong> ${recipe.mealType}</p>
      <p><strong>Cooking Time:</strong> ${recipe.cookingTime} minutes</p>
      <button class="hero-button" onclick="deleteRecipe(${recipe.id})">Delete</button>
    `;

        container.appendChild(card);
    });
}

window.applyFilter = function () {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const mealTypeFilter = document.getElementById("mealTypeFilter").value;

    const filtered = allRecipes.filter(recipe => {
        const matchName = recipe.name.toLowerCase().includes(searchInput);
        const matchMeal = mealTypeFilter === "all" || recipe.mealType === mealTypeFilter;
        return matchName && matchMeal;
    });

    renderRecipes(filtered);
};

window.deleteRecipe = function (id) {
    allRecipes = allRecipes.filter(r => r.id != id);
    localStorage.setItem("recipes", JSON.stringify(allRecipes));
    alert("Recipe deleted!");
    applyFilter();
};
