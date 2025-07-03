<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Animal;

class MaxAnimalsPerFarm implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $count = Animal::where('farm_id', $value)->count();

        if ($count >= 3) {
            $fail("Each farm can only have 3 animals.");
        }
    }
}
