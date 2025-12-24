/**
 * City Management API
 * 
 * DESIGN PATTERN:
 * Although this is a single-file application for demonstration/testing purposes,
 * it follows a "Layered Architecture" approach internally:
 * 
 * 1. Config & Documentation (Swagger)
 * 2. Repository Layer (Direct data access/logic)
 * 3. Controller Layer (HTTP Request/Response handling)
 * 4. Route Definitions (Mapping endpoints to controllers)
 * 5. Global Error Handling
 */

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// ==========================================
// 1. CONFIGURATION & CONSTANTS
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'City Management API',
            version: '1.0.0',
            description: 'A professional RESTful API for managing City resources.',
            contact: { name: 'Developer Candidate' }
        },
        servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./index.js'], // Points to this file for JSDoc parsing
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ==========================================
// 2. REPOSITORY LAYER (Data Access)
// ==========================================
/**
 * In-memory data store. 
 * In a real application, this would be replaced by a DB connection (SQL/NoSQL).
 */
const db = {
    cities: []
};

const CityRepository = {
    /**
     * Retrieve all cities from the database.
     * @returns {Array} List of cities
     */
    findAll: () => {
        return db.cities;
    },

    /**
     * Find a specific city by ID.
     * @param {number} id 
     * @returns {Object|undefined} City object or undefined
     */
    findById: (id) => {
        return db.cities.find(c => c.id === id);
    },

    /**
     * Create a new city.
     * @param {Object} data - { name, country }
     * @returns {Object} The created city
     */
    create: (data) => {
        const newCity = {
            id: Date.now(), // Simple unique ID generation
            name: data.name.trim(),
            country: data.country.trim()
        };
        db.cities.push(newCity);
        return newCity;
    },

    /**
     * Update an existing city.
     * @param {number} id 
     * @param {Object} updates - { name?, country? }
     * @returns {Object|null} The updated city or null if not found
     */
    update: (id, updates) => {
        const city = db.cities.find(c => c.id === id);
        if (!city) return null;

        if (updates.name) city.name = updates.name.trim();
        if (updates.country) city.country = updates.country.trim();
        return city;
    },

    /**
     * Delete a city by ID.
     * @param {number} id 
     * @returns {boolean} True if deleted, False if not found
     */
    delete: (id) => {
        const index = db.cities.findIndex(c => c.id === id);
        if (index === -1) return false;

        db.cities.splice(index, 1);
        return true;
    }
};


// ==========================================
// 3. CONTROLLER LAYER (Request Handling)
// ==========================================
const CityController = {
    getAll: (req, res, next) => {
        try {
            const cities = CityRepository.findAll();
            res.status(200).json(cities);
        } catch (error) {
            next(error); // Pass to global error handler
        }
    },

    getOne: (req, res, next) => {
        try {
            // Always specify radix 10 for parseInt
            const id = parseInt(req.params.id, 10);
            const city = CityRepository.findById(id);

            if (!city) {
                return res.status(404).json({ 
                    error: 'Resource Not Found', 
                    message: `City with ID ${id} does not exist.` 
                });
            }
            res.status(200).json(city);
        } catch (error) {
            next(error);
        }
    },

    create: (req, res, next) => {
        try {
            const { name, country } = req.body;

            // Strict Input Validation
            if (!name || typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({ error: 'Validation Error', message: 'Field "name" is required and must be a string.' });
            }
            if (!country || typeof country !== 'string' || !country.trim()) {
                return res.status(400).json({ error: 'Validation Error', message: 'Field "country" is required and must be a string.' });
            }

            const newCity = CityRepository.create({ name, country });
            res.status(201).json(newCity);
        } catch (error) {
            next(error);
        }
    },

    update: (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, country } = req.body;

            // Check if at least one field is provided
            if (!name && !country) {
                return res.status(400).json({ error: 'Validation Error', message: 'Please provide at least one field to update (name or country).' });
            }

            const updatedCity = CityRepository.update(id, { name, country });

            if (!updatedCity) {
                return res.status(404).json({ error: 'Resource Not Found', message: 'City not found.' });
            }
            res.status(200).json(updatedCity);
        } catch (error) {
            next(error);
        }
    },

    delete: (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const isDeleted = CityRepository.delete(id);

            if (!isDeleted) {
                return res.status(404).json({ error: 'Resource Not Found', message: 'City not found.' });
            }
            
            // 204 No Content is standard for delete, but returning a success message is also acceptable
            res.status(200).json({ message: 'City deleted successfully', id });
        } catch (error) {
            next(error);
        }
    }
};


// ==========================================
// 4. SWAGGER SCHEMAS & ROUTES
// ==========================================

/**
 * @swagger
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       required:
 *         - name
 *         - country
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Name of the city
 *         country:
 *           type: string
 *           description: Country the city belongs to
 *       example:
 *         id: 162524
 *         name: Addis Ababa
 *         country: Ethiopia
 */

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: API endpoints for managing cities
 */

/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Retrieve a list of all cities
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: A list of cities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *   post:
 *     summary: Create a new city
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *             required:
 *               - name
 *               - country
 *     responses:
 *       201:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       400:
 *         description: Validation error
 */
app.route('/cities')
    .get(CityController.getAll)
    .post(CityController.create);

/**
 * @swagger
 * /cities/{id}:
 *   get:
 *     summary: Get a city by ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the city
 *     responses:
 *       200:
 *         description: City found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       404:
 *         description: City not found
 *   put:
 *     summary: Update a city
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: City not found
 *   delete:
 *     summary: Delete a city
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: City not found
 */
app.route('/cities/:id')
    .get(CityController.getOne)
    .put(CityController.update)
    .delete(CityController.delete);


// ==========================================
// 5. GLOBAL ERROR HANDLER
// ==========================================
// This ensures that if any part of the app crashes, the server stays alive
// and returns a formatted JSON error instead of an HTML stack trace.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong on the server.'
    });
});

// ==========================================
// 6. START SERVER
// ==========================================
app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📄 Swagger Docs available at http://localhost:${PORT}/api-docs`);
    console.log(`==================================================\n`);
});