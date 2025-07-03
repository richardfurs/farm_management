<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnimalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'species' => $this->species,
            'age' => $this->age,
            'farm' => [
                'id' => $this->farm->id ?? null,
                'name' => $this->farm->name ?? null,
            ],
        ];
    }
}
