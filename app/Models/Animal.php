<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Animal extends Model
{
    /** @use HasFactory<\Database\Factories\AnimalFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'number',
        'species',
        'age',
        'farm_id'
    ];

    /**
     * Get the farm that owns the animal.
     */
    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }
}
