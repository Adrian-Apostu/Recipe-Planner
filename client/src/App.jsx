// App.jsx
import RecipeSearch from './components/RecipeSearch';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-xl">Recipe Finder</h1>
            </header>
            <main className="p-4">
                <RecipeSearch />
            </main>
        </div>
    );
}

export default App;