require('dotenv').config();
const express = require('express');
const cors = require('cors');
const RecipesRouter = require('./src/routes/RecipesRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://recipe-planner-app.netlify.app',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', RecipesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
