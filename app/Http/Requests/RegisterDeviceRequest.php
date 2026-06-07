<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterDeviceRequest extends FormRequest
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
     * @return array<string, array<string>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'udid' => ['required', 'string', 'size:40', 'regex:/^[0-9a-fA-F]{40}$/', 'unique:devices,udid'],
        ];
    }

    /**
     * Custom messages for validation errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'udid.regex' => 'UDID harus berupa 40 karakter heksadesimal (0-9, a-f).',
            'udid.size' => 'UDID harus tepat 40 karakter.',
            'udid.unique' => 'UDID ini sudah terdaftar di sistem.',
        ];
    }
}

