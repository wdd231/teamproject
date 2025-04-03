// Load breakfast recipes from localStorage
function loadLocalRecipes() {
    let localRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    return localRecipes.filter(recipe =>
        typeof recipe.mealType === "string" && recipe.mealType.toLowerCase() === "breakfast"
    );
}

// Display recipe cards with expand/collapse
function displayBreakfastRecipes(recipes) {
    const container = document.getElementById("breakfastList");
    container.innerHTML = "";

    if (recipes.length === 0) {
        container.innerHTML = "<p>No breakfast recipes found.</p>";
        return;
    }

    recipes.forEach((recipe, index) => {
        const card = document.createElement("div");
        card.classList.add("api-recipe-card");

        const image = recipe.image || recipe.image_url || "images/default.jpg";
        const ingredients = Array.isArray(recipe.ingredients)
            ? recipe.ingredients.join(", ")
            : recipe.ingredients || "No ingredients listed.";
        const instructions = Array.isArray(recipe.instructions)
            ? recipe.instructions.join(" ")
            : recipe.instructions || "No instructions available.";
        const previewText = instructions.length > 100 ? instructions.slice(0, 100) + "..." : instructions;

        card.innerHTML = `
        <img src="${image}" alt="${recipe.name}">
        <div class="api-recipe-content">
            <h2>${recipe.name}</h2>
            <p><strong>Time:</strong> ${recipe.cookingTime || recipe.time || "?"} minutes</p>
            <p class="instructions-preview" id="preview-${index}">${previewText}</p>
            <div class="recipe-details" id="details-${index}">
                <p><strong>Ingredients:</strong> ${ingredients}</p>
                <p><strong>Instructions:</strong> ${instructions}</p>
            </div>
            <a class="hero-button" href="recipe-detail.html?recipeId=${recipe.id}">Go to Detail</a>
        </div>
        `;

        container.appendChild(card);
    });

    // Toggle logic
    document.querySelectorAll(".toggle-button").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.dataset.index;
            const details = document.getElementById(`details-${index}`);
            const preview = document.getElementById(`preview-${index}`);

            details.classList.toggle("expanded");
            preview.classList.toggle("hidden");
            this.textContent = details.classList.contains("expanded") ? "Hide Recipe" : "View Recipe";
        });
    });
}

// Fetch + combine local and API breakfast recipes
fetch('https://dummyjson.com/recipes')
    .then(response => response.json())
    .then(data => {
        const apiRecipes = data.recipes.filter(recipe =>
            Array.isArray(recipe.mealType)
                ? recipe.mealType.map(m => m.toLowerCase()).includes("breakfast")
                : recipe.mealType?.toLowerCase() === "breakfast"
        );

        const localRecipes = loadLocalRecipes();
        displayBreakfastRecipes([...apiRecipes, ...localRecipes]);
    })
    .catch(error => {
        console.error("Error fetching breakfast recipes:", error);
        document.getElementById("breakfastList").innerHTML = "<p>Error loading breakfast recipes.</p>";
    });
