<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFarmRequest extends FormRequest
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
            'name' => 'required|max:100',
            'email' => 'email',
            'website' => 'nullable|url|max:100'
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
            'name.required' => 'Name is required',
            'name.max' => 'Only 100 characters allowed',
            'email.email' => 'Invalid email format',
            'email.max' => 'Only 100 characters allowed',
            'website.url' => 'Invalid URL. It must start with http:// or https:// and be a valid web address',
            'website.max' => 'Only 100 characters allowed',
        ];
    }
}
