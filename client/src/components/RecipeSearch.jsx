import { useState, useEffect, useCallback, useRef } from 'react';
import Button from './Button';
import Pagination from './Pagination';
import RecipeCard from './RecipeCard';
import { debounce } from '../utils/debounce';

const debouncedSearch = debounce((func, page) => func(page), 300);

export default function RecipeSearch() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [cache, setCache] = useState({});

    const searchRecipesRef = useRef(null);

    const sortRecipes = (recipes, option) => {
        if (option === 'calories-asc') {
            return recipes.sort((a, b) => a.nutrition.nutrients.find(n => n.name === 'Calories').amount - b.nutrition.nutrients.find(n => n.name === 'Calories').amount);
        } else if (option === 'calories-desc') {
            return recipes.sort((a, b) => b.nutrition.nutrients.find(n => n.name === 'Calories').amount - a.nutrition.nutrients.find(n => n.name === 'Calories').amount);
        }
        return recipes;
    };

    const searchRecipes = useCallback(async (page = 1) => {
        if (!query) return;
        setLoading(true);
        setError('');

        const cacheKey = `${query}-${page}-${sortOption}`;
        if (cache[cacheKey]) {
            setRecipes(cache[cacheKey]);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/recipes?query=${encodeURIComponent(query)}&offset=${(page - 1) * 10}&number=10`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const cleanedRecipes = data.results.map(recipe => ({
                ...recipe,
                summary: recipe.summary.split('.').slice(0, 2).join('.') + '.'
            }));
            const sortedRecipes = sortRecipes(cleanedRecipes, sortOption);
            setRecipes(sortedRecipes || []);
            setCache(prevCache => ({ ...prevCache, [cacheKey]: sortedRecipes }));
            setTotalPages(Math.ceil(data.totalResults / 10));
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
            setError('Failed to fetch recipes. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [query, sortOption, cache]);

    searchRecipesRef.current = searchRecipes;

    const handleSearch = () => {
        debouncedSearch(searchRecipesRef.current, page);
        setPage(1);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setPage(1);
    };

    useEffect(() => {
        searchRecipesRef.current(page);
        window.scrollTo(0, 0);
    }, [page, sortOption]);

    return (
        <div className="p-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter a recipe..."
                className="input-field p-2 text-gray-700 border border-gray-300 m-1 rounded shadow"
            />
            <select value={sortOption} onChange={handleSortChange} className="p-2 border border-gray-300 m-1 rounded shadow">
                <option value="">Sort by...</option>
                <option value="calories-asc">Calories (Lowest to Highest)</option>
                <option value="calories-desc">Calories (Highest to Lowest)</option>
            </select>
            <Button onClick={handleSearch}>Search</Button>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {recipes.length > 0 && (
                <>
                    <ul className="mt-6">
                        {recipes.map((recipe, index) => (
                            <RecipeCard key={index} recipe={recipe} />
                        ))}
                    </ul>
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                </>
            )}
        </div>
    );
}