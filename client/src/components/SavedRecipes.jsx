import { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { getSavedRecipesFromLocal } from '../utils/localStorage';

export default function SavedRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        setSavedRecipes(getSavedRecipesFromLocal());
    }, []);

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <h2 className="mt-8 text-xl font-bold">Saved Recipes</h2>
            {savedRecipes.length > 0 ? (
                <ul className="mt-6 w-full max-w-3xl">
                    {savedRecipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} isSavedPage />
                    ))}
                </ul>
            ) : (
                <p className="mt-6">No saved recipes.</p>
            )}
        </div>
    );
}