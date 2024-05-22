const router = require('express').Router();
const axios = require('axios');

//get a list of recipes
router.get('/recipes', async (req, res) => {
    const { query, offset = 0, number = 10 } = req.query;
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
                query,
                addRecipeNutrition: true,
                includeNutrition: false,
                offset: parseInt(offset, 10),
                number: parseInt(number, 10),
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error when accessing Spoonacular API: ", error);
        res.status(500).json({ message: "Error accessing the recipe API", details: error.message });
    }
});

module.exports = router;