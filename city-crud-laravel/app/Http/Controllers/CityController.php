<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * @OA\Info(
 *     title="City CRUD API",
 *     version="1.0.0"
 * )
 *
 * @OA\Tag(
 *     name="Cities",
 *     description="API Endpoints for managing cities"
 * )
 */
class CityController extends Controller
{
    // NOTE: In a real app, use a Database.
    // Static arrays in PHP are reset on every request in standard setups (Apache/Nginx).
    // For testing this properly without a DB, you would typically use a JSON file or Cache.
    // For this example, I will initialize it with dummy data if empty so you see something.
    private static $cities = [
        ["id" => 1, "name" => "Tokyo", "country" => "Japan"],
        ["id" => 2, "name" => "New York", "country" => "USA"],
        ["id" => 3, "name" => "Paris", "country" => "France"],
    ];

    /**
     * List all cities
     *
     * @OA\Get(
     *     path="/api/cities",
     *     tags={"Cities"},
     *     summary="Get all cities",
     *     @OA\Response(response=200, description="List of cities")
     * )
     */
    public function index()
    {
        return response()->json(self::$cities);
    }

    /**
     * Get city by id
     *
     * @OA\Get(
     *     path="/api/cities/{id}",
     *     tags={"Cities"},
     *     summary="Get a city by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="City found"),
     *     @OA\Response(response=404, description="City not found")
     * )
     */
    public function show($id)
    {
        $city = collect(self::$cities)->firstWhere('id', (int)$id);
        if ($city) {
            return response()->json($city);
        }
        return response()->json(["error" => "City not found"], 404);
    }

    /**
     * Create city
     *
     * @OA\Post(
     *     path="/api/cities",
     *     tags={"Cities"},
     *     summary="Create a new city",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "country"},
     *             @OA\Property(property="name", type="string", example="Addis Ababa"),
     *             @OA\Property(property="country", type="string", example="Ethiopia")
     *         )
     *     ),
     *     @OA\Response(response=201, description="City created")
     * )
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'country' => 'required|string', // Added to match Frontend
        ]);

        $id = count(self::$cities) ? max(array_column(self::$cities, 'id')) + 1 : 1;

        $city = [
            "id" => $id,
            "name" => $data['name'],
            "country" => $data['country']
        ];

        self::$cities[] = $city;
        return response()->json($city, 201);
    }

    /**
     * Update city
     *
     * @OA\Put(
     *     path="/api/cities/{id}",
     *     tags={"Cities"},
     *     summary="Update a city",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "country"},
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="country", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="City updated"),
     *     @OA\Response(response=404, description="City not found")
     * )
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'country' => 'required|string', // Added to match Frontend
        ]);

        foreach (self::$cities as &$city) {
            if ($city['id'] == (int)$id) {
                $city['name'] = $data['name'];
                $city['country'] = $data['country'];
                return response()->json($city);
            }
        }
        return response()->json(["error" => "City not found"], 404);
    }

    /**
     * Delete city
     *
     * @OA\Delete(
     *     path="/api/cities/{id}",
     *     tags={"Cities"},
     *     summary="Delete a city",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="City deleted"),
     *     @OA\Response(response=404, description="City not found")
     * )
     */
    public function destroy($id)
    {
        foreach (self::$cities as $i => $city) {
            if ($city['id'] == (int)$id) {
                array_splice(self::$cities, $i, 1);
                return response()->json(["message" => "City deleted"]);
            }
        }
        return response()->json(["error" => "City not found"], 404);
    }
}
