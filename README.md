# Recipe Planner

## Project Description
The Recipe Planner project helps users search for recipes, save their favorite ones, and manage these recipes effectively. The application provides a search functionality to find recipes from an external API and allows users to save and delete recipes.

## Project Objectives
- Develop an API using Node.js and Express
- Implement CRUD operations for recipes
- Utilize React for the frontend interface
- Utilize Tailwind CSS for styling
- Test API endpoints with Postman

## Prerequisites
Before starting, ensure you have:
- Basic knowledge of JavaScript
- Understanding of Node.js and Express
- Experience with Git and GitHub
- Postman or similar API testing tool

## Getting Started
1. Clone the repository:
    ```bash
    git clone https://github.com/Adrian-Apostu/Recipe-Planner.git
    cd Recipe-Planner
    ```

2. Set up the server:
    ```bash
    cd server
    npm install
    ```

3. Configure environment variables:
    Create a `.env` file in the `server` directory:
    ```env
    PORT=3000
    SPOONACULAR_API_KEY=your_spoonacular_api_key
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

5. Set up the client:
    ```bash
    cd ../client
    npm install
    ```

6. Start the frontend server:
    ```bash
    npm start
    ```

7. Use Postman or any API testing tool to interact with the API endpoints.

## API Endpoints
### Recipe Endpoints
- `GET /api/recipes`: Retrieve a list of recipes
- `GET /api/recipes/:id`: Retrieve a specific recipe by ID
- `POST /api/recipes`: Create a new recipe
- `PUT /api/recipes/:id`: Update an existing recipe
- `DELETE /api/recipes/:id`: Delete a recipe

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
