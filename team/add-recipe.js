document.addEventListener("DOMContentLoaded", function () {
    const recipeForm = document.getElementById("recipeForm");

    recipeForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const recipeName = document.getElementById("recipeName").value.trim();
        const ingredients = document.getElementById("recipeIngredients").value.trim().split(",");
        const instructions = document.getElementById("recipeInstructions").value.trim();
        const cookingTime = document.getElementById("cookingTime").value.trim();
        const mealType = document.getElementById("mealType").value;
        const recipeImage = document.getElementById("recipeImage").files[0];

        // Validate required fields
        if (!recipeName || ingredients.length === 0 || !instructions || !cookingTime) {
            alert("Please fill in all fields.");
            return;
        }

        // Generate a unique recipe ID
        const recipeId = Date.now();

        // Handle image upload and conversion to Base64
        let imageUrl = "";
        if (recipeImage) {
            const reader = new FileReader();
            reader.readAsDataURL(recipeImage);
            reader.onload = function (event) {
                imageUrl = event.target.result;
                saveRecipeAndRedirect(recipeId, recipeName, ingredients, instructions, cookingTime, mealType, imageUrl);
            };
        } else {
            saveRecipeAndRedirect(recipeId, recipeName, ingredients, instructions, cookingTime, mealType, imageUrl);
        }
    });

    function saveRecipeAndRedirect(id, name, ingredients, instructions, time, mealType, image) {
        // Retrieve existing recipes from localStorage
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

        // Create a new recipe object
        const newRecipe = {
            id: id,
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            cookingTime: time,
            mealType: mealType,
            image: image
        };

        // Add the new recipe to the list and save it
        recipes.push(newRecipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));

        alert("Recipe added successfully!");

        // Determine target page based on meal type
        let targetPage = "";
        if (mealType === "breakfast") {
            targetPage = "breakfast.html";
        } else if (mealType === "lunch") {
            targetPage = "lunch.html";
        } else if (mealType === "dinner") {
            targetPage = "dinner.html";
        }

        // Redirect with recipeId as URL parameter
        window.location.href = `${targetPage}?recipeId=${id}`;
    }
});
