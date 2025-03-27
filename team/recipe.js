// recipe.js

function loadLocalRecipes() {
    return JSON.parse(localStorage.getItem("recipes")) || [];
  }
  
  function displayAllRecipes(recipes) {
    const container = document.getElementById("allRecipes");
    container.innerHTML = "";
  
    if (recipes.length === 0) {
      container.innerHTML = "<p>No recipes found.</p>";
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
      const preview = instructions.length > 100 ? instructions.slice(0, 100) + "..." : instructions;
  
      card.innerHTML = `
        <img src="${image}" alt="${recipe.name}">
        <div class="api-recipe-content">
          <h2>${recipe.name}</h2>
          <p><strong>Time:</strong> ${recipe.cookingTime || recipe.time || "?"} minutes</p>
          <p class="instructions-preview" id="preview-${index}">${preview}</p>
          <div class="recipe-details" id="details-${index}">
            <p><strong>Ingredients:</strong> ${ingredients}</p>
            <p><strong>Instructions:</strong> ${instructions}</p>
          </div>
          <button class="hero-button toggle-button" data-index="${index}">View Detail</button>
        </div>
      `;
  
      container.appendChild(card);
    });
  
    // Toggle 기능
    document.querySelectorAll(".toggle-button").forEach(button => {
      button.addEventListener("click", function () {
        const index = this.dataset.index;
        const details = document.getElementById(`details-${index}`);
        const preview = document.getElementById(`preview-${index}`);
  
        details.classList.toggle("expanded");
        preview.classList.toggle("hidden");
        this.textContent = details.classList.contains("expanded") ? "Hide Detail" : "View Detail";
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const localRecipes = loadLocalRecipes();
  
    fetch("https://dummyjson.com/recipes")
      .then(res => res.json())
      .then(data => {
        const apiRecipes = data.recipes || [];
        displayAllRecipes([...apiRecipes, ...localRecipes]);
      })
      .catch(error => {
        console.error("Error fetching API recipes:", error);
        displayAllRecipes(localRecipes);
      });
  });
  