import PropTypes from 'prop-types';

function RecipeCard({ recipe }) {
    return (
        <li className="mb-4 p-2 border-b border-gray-200 grid grid-cols-2 items-center">
            <img src={recipe.image} alt={recipe.title} className="w-auto h-auto" />
            <div>
                <h3 className="text-lg font-bold">{recipe.title}</h3>
                <div className="prose prose-sm max-w-none mb-4" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                <p>Calories: {recipe.nutrition.nutrients.find(n => n.name === 'Calories').amount}</p>
                <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600" onClick={() => window.open(recipe.sourceUrl, "_blank")}>View Recipe</button>
            </div>
        </li>
    );
}

RecipeCard.propTypes = {
    recipe: PropTypes.object.isRequired,
};

export default RecipeCard;