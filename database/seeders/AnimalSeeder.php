<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Farm;
use App\Models\Animal;

class AnimalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $farms = Farm::all();

        foreach ($farms as $farm) {
            Animal::factory()->count(rand(1, 3))->create([
                'farm_id' => $farm->id,
            ]);
        }
    }
}
