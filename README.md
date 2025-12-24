# City CRUD Project

This repository contains a full-stack City CRUD application with a Node.js/Express backend and a React frontend.

---

## Project Structure

- **city-crud-api/** — Backend REST API (Node.js, Express)
- **city-crud-ui/** — Frontend UI (React, Vite)

---

## Features

### Backend (city-crud-api)
- RESTful API for managing cities (Create, Read, Update, Delete)
- Built with Node.js and Express
- Swagger/OpenAPI documentation (if available)

### Frontend (city-crud-ui)
- Modern React interface built with Vite
- Add, view, update, and delete cities
- Connects to the backend API

---

## Prerequisites
- Node.js (v16 or higher recommended)
- npm

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

### 2. Frontend Setup (city-crud-ui)
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
- `GET /cities` — List all cities
- `POST /cities` — Add a new city
- `PUT /cities/:id` — Update a city
- `DELETE /cities/:id` — Delete a city

---

## Notes
- Environment variables for the backend can be set in a `.env` file.
- For API documentation, visit `/api-docs` if Swagger is enabled.
- You can configure the API endpoint in the frontend code if needed.

---

## License
MIT or your preferred license.
