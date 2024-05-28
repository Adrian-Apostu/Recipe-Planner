import PropTypes from 'prop-types';
import Button from './Button';
import { saveRecipeToLocal, removeRecipeFromLocal } from '../utils/localStorage';

function RecipeCard({ recipe, isSavedPage }) {
    const saveRecipe = () => {
        saveRecipeToLocal(recipe);
        alert('Recipe saved successfully');
    };

    const deleteRecipe = () => {
        removeRecipeFromLocal(recipe.id);
        alert('Recipe deleted successfully');
        window.location.reload();
    };

    return (
        <li className="mb-4 p-2 border-b border-gray-200 grid grid-cols-2 items-center">
            <img src={recipe.image} alt={recipe.title} className="w-auto h-auto" />
            <div>
                <h3 className="text-lg font-bold">{recipe.title}</h3>
                <div className="prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                <p>Calories: {recipe.nutrition.nutrients.find(n => n.name === 'Calories').amount}</p>
                <div className="flex space-x-2">
                    <Button onClick={() => window.open(recipe.sourceUrl, "_blank")}>View Recipe</Button>
                    {!isSavedPage && <Button onClick={saveRecipe}>Save Recipe</Button>}
                    {isSavedPage && <Button onClick={deleteRecipe}>Delete Recipe</Button>}
                </div>
            </div>
        </li>
    );
}

RecipeCard.propTypes = {
    recipe: PropTypes.object.isRequired,
    isSavedPage: PropTypes.bool,
};

export default RecipeCard;