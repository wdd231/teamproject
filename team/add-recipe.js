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
        const recipeImage = document.getElementById("recipeImage").files[0]; // File input

        // Check if required fields are filled
        if (!recipeName || ingredients.length === 0 || !instructions || !cookingTime) {
            alert("Please fill in all fields.");
            return;
        }

        // Generate a unique recipe ID
        const recipeId = Date.now();

        // Convert image to Base64 (optional)
        let imageUrl = "";
        if (recipeImage) {
            const reader = new FileReader();
            reader.readAsDataURL(recipeImage);
            reader.onload = function (event) {
                imageUrl = event.target.result;
                saveRecipe(recipeId, recipeName, ingredients, instructions, cookingTime, mealType, imageUrl);
            };
        } else {
            saveRecipe(recipeId, recipeName, ingredients, instructions, cookingTime, mealType, imageUrl);
        }
    });

    function saveRecipe(id, name, ingredients, instructions, time, mealType, image) {
        // Retrieve existing recipes from localStorage
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

        // Create new recipe object
        const newRecipe = {
            id: id,
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            cookingTime: time,
            mealType: mealType,
            image: image
        };

        // Add new recipe to the list
        recipes.push(newRecipe);

        // Save updated list back to localStorage
        localStorage.setItem("recipes", JSON.stringify(recipes));

        alert("Recipe added successfully!");

        // Redirect user to the appropriate meal page
        if (mealType === "breakfast") {
            window.location.href = "breakfast.html";
        } else if (mealType === "lunch") {
            window.location.href = "lunch.html";
        } else if (mealType === "dinner") {
            window.location.href = "dinner.html";
        }
    }
});
