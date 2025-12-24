# city-crud-api

This is the backend API for the City CRUD project.

## Features
- RESTful API for managing cities (Create, Read, Update, Delete)
- Built with Node.js and Express
- Swagger/OpenAPI documentation (if available)

## Prerequisites
- Node.js (v16 or higher recommended)
- npm

## Setup & Run
1. Open a terminal in the `city-crud-api` directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

## API Endpoints
- `GET /cities` - List all cities
- `POST /cities` - Add a new city
- `PUT /cities/:id` - Update a city
- `DELETE /cities/:id` - Delete a city

## Notes
- Environment variables can be set in a `.env` file.
- For API documentation, visit `/api-docs` if Swagger is enabled.
