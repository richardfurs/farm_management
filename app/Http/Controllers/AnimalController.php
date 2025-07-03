<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Farm;
use App\Http\Resources\AnimalResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreAnimalRequest;

class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Not authenticated'], 401);
        }

        $animals = Animal::whereHas('farm', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->with('farm:id,name')
        ->orderBy('id', 'asc')
        ->paginate(10);
    
        $farms = Farm::where('user_id', $user->id)->select('id', 'name')->get();

        return response()->json([
            'animals' => AnimalResource::collection($animals)->response()->getData(true),
            'farms' => $farms,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnimalRequest $request)
    {
        $validated = $request->validated();

        $validated['farm_id'] = $validated['farm'];
        unset($validated['farm']);

        $animal = Animal::create($validated);

        return response()->json([
            'success' => true,
            'animal' => $animal,
            'message' => 'Animal created successfully',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreAnimalRequest $request, string $id)
    {
        $validated = $request->validated();

        $validated['farm_id'] = $validated['farm'];
        unset($validated['farm']);

        $animal = Animal::findOrFail($id);

        $animal->update($validated);

        return response()->json([
            'success' => true,
            'animal' => $animal,
            'message' => 'Animal updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $farm = Animal::findOrFail($id);
        $farm->delete();

        return response()->json([
            'success' => true,
            'message' => 'Animal deleted successfully',
        ]);
    }
}
