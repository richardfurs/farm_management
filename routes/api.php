<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\AnimalController;

Route::get('/user', function (Request $request) {
    if (!$request->user()) {
        return response()->json([
            'success' => false,
            'message' => 'No authenticated user found'
        ], 401);
    }

    return $request->user();

})->middleware('web');

Route::middleware('web')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('farms')->group(function () {
        Route::get('/', [FarmController::class, 'index']);
        Route::post('/store', [FarmController::class, 'store']);
        Route::patch('/update/{id}', [FarmController::class, 'update']);
        Route::delete('/delete/{id}', [FarmController::class, 'destroy']);
    });

    Route::prefix('animals')->group(function () {
        Route::get('/', [AnimalController::class, 'index']);
        Route::post('/store', [AnimalController::class, 'store']);
        Route::patch('/update/{id}', [AnimalController::class, 'update']);
        Route::delete('/delete/{id}', [AnimalController::class, 'destroy']);
    });
});
