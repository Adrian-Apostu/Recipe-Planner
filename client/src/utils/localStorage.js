// Add a new function to remove a recipe
export const removeRecipeFromLocal = (id) => {
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    savedRecipes = savedRecipes.filter(recipe => recipe.id !== id);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
};

// Update the save function to prevent duplicates
export const saveRecipeToLocal = (recipe) => {
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    const isRecipeSaved = savedRecipes.some(savedRecipe => savedRecipe.id === recipe.id);
    if (!isRecipeSaved) {
        savedRecipes.push(recipe);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }
};

export const getSavedRecipesFromLocal = () => {
    return JSON.parse(localStorage.getItem('savedRecipes')) || [];
};