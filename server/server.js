require('dotenv').config();
const express = require('express');
const cors = require('cors');
const RecipesRouter = require('./src/routes/RecipesRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Hello World');
});

// API routes
app.use('/api', RecipesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});