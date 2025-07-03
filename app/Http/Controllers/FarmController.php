<?php

namespace App\Http\Controllers;

use App\Models\Farm;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreFarmRequest;

class FarmController extends Controller
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

        $farms = Farm::where('user_id', $user->id)->select('id', 'name', 'email', 'website')->paginate(10);

        return response()->json($farms);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFarmRequest $request)
    {
        $validated = $request->validated();

        $farm = $request->user()->farms()->create($validated);

        return response()->json([
            'success' => true,
            'farm' => $farm,
            'message' => 'Farm created successfully',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreFarmRequest $request, string $id)
    {
        $validated = $request->validated();

        $farm = Farm::findOrFail($id);

        $farm->update($validated);

        return response()->json([
            'success' => true,
            'farm' => $farm,
            'message' => 'Farm updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $farm = Farm::findOrFail($id);
        $farm->delete();

        return response()->json([
            'success' => true,
            'message' => 'Farm deleted successfully',
        ]);
    }
}
