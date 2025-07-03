<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Animal>
 */
class AnimalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number' => $this->faker->randomNumber(3),
            'species' => $this->faker->randomElement(['Cow', 'Sheep', 'Goat', 'Pig', 'Chicken', 'Turkey']),
            'age' => $this->faker->numberBetween(1, 10),
        ];
    }
}
