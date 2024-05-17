import { useState } from 'react';
import Button from './Button';

export default function RecipeSearch() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const searchRecipes = async () => {
        if (!query) return;
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/recipes?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const cleanedRecipes = data.results.map(recipe => ({
                ...recipe,
                summary: recipe.summary.split('.').slice(0, 2).join('.') + '.'
            }));
            setRecipes(cleanedRecipes || []);
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
            setError('Failed to fetch recipes. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter a recipe..."
                className="input-field p-2 text-gray-700 border border-gray-300 m-1 rounded shadow"
            />
            <Button onClick={searchRecipes}>Search</Button>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {recipes.length > 0 && (
                <ul className="mt-6">
                    {recipes.map((recipe, index) => (
                        <li key={index} className="mb-4 p-2 border-b border-gray-200 grid grid-cols-2 items-center">
                            <img src={recipe.image} alt={recipe.title} className="w-auto h-auto" />
                            <div>
                                <h3 className="text-lg font-bold">{recipe.title}</h3>
                                <div className="prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                                <p>Calories: {recipe.nutrition.nutrients.find(n => n.name === 'Calories').amount}</p>
                                <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600" onClick={() => window.open(recipe.sourceUrl, "_blank")}>View Recipe</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
