import { Routes, Route } from 'react-router-dom';
import RecipeSearch from './components/RecipeSearch';
import SavedRecipes from './components/SavedRecipes';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<RecipeSearch />} />
                <Route path="/saved" element={<SavedRecipes />} />
            </Routes>
        </div>
    );
}

export default App;