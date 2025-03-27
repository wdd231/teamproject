// Function to load local storage recipes
function loadLocalRecipes() {
    let localRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    return localRecipes.filter(recipe => 
        typeof recipe.mealType === "string" && recipe.mealType.toLowerCase() === "dinner"
    );
}

// Function to display dinner recipes
function displayDinnerRecipes(recipes) {
    const dinnerContainer = document.getElementById("dinnerRecipes");
    dinnerContainer.innerHTML = ""; // Clear previous content

    if (recipes.length === 0) {
        dinnerContainer.innerHTML = "<p>No dinner recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        let div = document.createElement("div");
        div.classList.add("recipe-card");

        div.innerHTML = `
            <h2><a href="recipe.html?id=${recipe.id}">${recipe.name}</a></h2>
            <p><strong>Meal Type:</strong> ${Array.isArray(recipe.mealType) ? recipe.mealType.join(', ') : recipe.mealType}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" width="150">` : ""}
            <hr>
        `;

        dinnerContainer.appendChild(div);
    });
}

// Fetch API recipes and combine with local storage recipes
fetch('https://dummyjson.com/recipes')
    .then(response => response.json())
    .then(data => {
        const apiRecipes = data.recipes.filter(recipe => 
            Array.isArray(recipe.mealType) ? recipe.mealType.includes("Dinner") : recipe.mealType.toLowerCase() === "dinner"
        );
        const localRecipes = loadLocalRecipes();
        displayDinnerRecipes([...apiRecipes, ...localRecipes]); // Merge API and local recipes
    })
    .catch(error => console.error("Error fetching dinner recipes:", error));
