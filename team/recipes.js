// Function to load local storage recipes
function loadLocalRecipes() {
    return JSON.parse(localStorage.getItem("recipes")) || [];
}

// Function to display recipes
function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = ''; // Clear previous content

    if (recipes.length === 0) {
        recipeList.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <h2>${recipe.name}</h2>
            <p><strong>Meal Type:</strong> ${Array.isArray(recipe.mealType) ? recipe.mealType.join(', ') : recipe.mealType}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" width="150">` : ""}
            <hr>
        `;

        recipeList.appendChild(recipeCard);
    });
}

// Fetch API recipes and combine with local storage recipes
fetch('https://dummyjson.com/recipes')
    .then(res => res.json())
    .then(data => {
        console.log(data); // Debugging: Check if API data is fetched correctly
        const apiRecipes = data.recipes;
        const localRecipes = loadLocalRecipes();
        displayRecipes([...apiRecipes, ...localRecipes]); // Merge API and local recipes
    })
    .catch(error => console.error('Error fetching recipes:', error));
