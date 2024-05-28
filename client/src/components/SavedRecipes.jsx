import { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { getSavedRecipesFromLocal } from '../utils/localStorage';

export default function SavedRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        setSavedRecipes(getSavedRecipesFromLocal());
    }, []);

    return (
        <div>
            <h2 className="mt-8 text-xl font-bold">Saved Recipes</h2>
            {savedRecipes.length > 0 ? (
                <ul className="mt-6">
                    {savedRecipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} isSavedPage />
                    ))}
                </ul>
            ) : (
                <p>No saved recipes.</p>
            )}
        </div>
    );
}