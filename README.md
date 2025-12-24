# City CRUD Project


This repository contains a full-stack City CRUD application with:
- Node.js/Express backend
- Laravel (PHP) backend
- React frontend

---


## Project Structure

- **city-crud-api/** — Backend REST API (Node.js, Express)
- **city-crud-laravel/** — Backend REST API (Laravel, PHP)
- **city-crud-ui/** — Frontend UI (React, Vite)

---

## Features


### Backend (city-crud-api)
- RESTful API for managing cities (Create, Read, Update, Delete)
- Built with Node.js and Express
- Swagger/OpenAPI documentation (if available)

### Backend (city-crud-laravel)
- RESTful API for managing cities (Create, Read, Update, Delete)
- Built with Laravel (PHP)
- Swagger/OpenAPI documentation at `/api/documentation`
- **Note:** The default implementation uses an in-memory array, so data does NOT persist between requests. For persistence, use a database (see Laravel docs).

### Frontend (city-crud-ui)
- Modern React interface built with Vite
- Add, view, update, and delete cities
- Connects to the backend API

---


## Prerequisites
- Node.js (v16 or higher recommended)
- npm
- PHP (v8.1 or higher recommended)
- Composer (for Laravel)

---

## Setup Instructions


### 1. Backend Setup (city-crud-api)
1. Open a terminal in the `city-crud-api` directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. (If not already installed) Install CORS middleware:
   ```sh
   npm install cors
   ```
4. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

### 2. Backend Setup (city-crud-laravel)
1. Open a terminal in the `city-crud-laravel` directory.
2. Install dependencies:
   ```sh
   composer install
   ```
3. Start the Laravel development server:
   ```sh
   php artisan serve
   ```
   The server will run on `http://localhost:8000` by default.
4. (Optional) To view API documentation, visit:
   ```
   http://localhost:8000/api/documentation
   ```
5. **Note:** By default, city data is not persistent. To enable persistence, set up a database and update the controller to use Eloquent models.

### 3. Frontend Setup (city-crud-ui)
1. Open a terminal in the `city-crud-ui` directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The app will run on `http://localhost:5173` by default.

---

## Usage
- Make sure the backend is running before starting the frontend for full functionality.
- The frontend allows you to add, view, update, and delete cities via the UI.
- The backend exposes RESTful endpoints for city management.

---


## API Endpoints (Backend)

### Node.js (city-crud-api)
- `GET /cities` — List all cities
- `POST /cities` — Add a new city
- `PUT /cities/:id` — Update a city
- `DELETE /cities/:id` — Delete a city

### Laravel (city-crud-laravel)
- `GET /api/cities` — List all cities
- `POST /api/cities` — Add a new city
- `PUT /api/cities/{id}` — Update a city
- `DELETE /api/cities/{id}` — Delete a city

---

## Notes
- Environment variables for the backend can be set in a `.env` file.
- For Node.js API documentation, visit `/api-docs` if Swagger is enabled.
- For Laravel API documentation, visit `/api/documentation`.
- You can configure the API endpoint in the frontend code if needed.

---

## License
MIT or your preferred license.
