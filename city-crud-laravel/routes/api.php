<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityController;

// CRUD routes for City resource
Route::get('/cities', [CityController::class, 'index']); // List all cities
Route::get('/cities/{id}', [CityController::class, 'show']); // Get city by id
Route::post('/cities', [CityController::class, 'store']); // Create city
Route::put('/cities/{id}', [CityController::class, 'update']); // Update city
Route::delete('/cities/{id}', [CityController::class, 'destroy']); // Delete city
