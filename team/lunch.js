// Function to load local storage recipes
function loadLocalRecipes() {
    let localRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    return localRecipes.filter(recipe =>
        typeof recipe.mealType === "string" && recipe.mealType.toLowerCase() === "lunch"
    );
}
function displayLunchRecipes(recipes) {
    const lunchContainer = document.getElementById("lunchRecipes");
    lunchContainer.innerHTML = "";
  
    if (recipes.length === 0) {
      lunchContainer.innerHTML = "<p>No lunch recipes found.</p>";
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
  
      // 첫 100자만 미리 보기로 자르기
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
          <button class="hero-button toggle-button" data-index="${index}">View Recipe</button>
        </div>
      `;
  
      lunchContainer.appendChild(card);
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
  

// Fetch API recipes and combine with local storage recipes
fetch('https://dummyjson.com/recipes')
    .then(response => response.json())
    .then(data => {
        const apiRecipes = data.recipes.filter(recipe =>
            Array.isArray(recipe.mealType)
                ? recipe.mealType.map(m => m.toLowerCase()).includes("lunch")
                : recipe.mealType?.toLowerCase() === "lunch"
        );

        const localRecipes = loadLocalRecipes();
        displayLunchRecipes([...apiRecipes, ...localRecipes]);
    })
    .catch(error => {
        console.error("Error fetching lunch recipes:", error);
        document.getElementById("lunchRecipes").innerHTML = "<p>Error loading recipes.</p>";
    });
