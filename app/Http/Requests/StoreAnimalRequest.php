<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\MaxAnimalsPerFarm;

class StoreAnimalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'number' => 'required|max:100',
            'species' => 'required|max:100',
            'age' => 'nullable',
            'farm' => ['required', new MaxAnimalsPerFarm],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'number.required' => 'Animal number is required',
            'number.max' => 'Only 100 characters allowed',
            'species.required' => 'Species is required',
            'species.max' => 'Only 100 characters allowed',
            'farm_id.required' => 'Farm is required',
        ];
    }
}
