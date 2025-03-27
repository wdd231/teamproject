// Function to load local storage recipes
function loadLocalRecipes() {
    let localRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    return localRecipes.filter(recipe => 
        typeof recipe.mealType === "string" && recipe.mealType.toLowerCase() === "lunch"
    );
}

// Function to display lunch recipes
function displayLunchRecipes(recipes) {
    const lunchContainer = document.getElementById("lunchRecipes");
    lunchContainer.innerHTML = ""; // Clear previous content

    if (recipes.length === 0) {
        lunchContainer.innerHTML = "<p>No lunch recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        let recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <h2><a href="recipe.html?id=${recipe.id}">${recipe.name}</a></h2>
            <p><strong>Meal Type:</strong> ${Array.isArray(recipe.mealType) ? recipe.mealType.join(', ') : recipe.mealType}</p>
            <p><strong>Cooking Time:</strong> ${recipe.cookingTime} min</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" width="150">` : ""}
            <hr>
        `;

        lunchContainer.appendChild(recipeCard);
    });
}

// Fetch API recipes and combine with local storage recipes
fetch('https://dummyjson.com/recipes')
    .then(response => response.json())
    .then(data => {
        const apiRecipes = data.recipes.filter(recipe => 
            Array.isArray(recipe.mealType) ? recipe.mealType.includes("Lunch") : recipe.mealType.toLowerCase() === "lunch"
        );
        const localRecipes = loadLocalRecipes();
        displayLunchRecipes([...apiRecipes, ...localRecipes]); // Merge API and local recipes
    })
    .catch(error => console.error("Error fetching lunch recipes:", error));
