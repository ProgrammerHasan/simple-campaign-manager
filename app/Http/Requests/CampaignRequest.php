<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CampaignRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'recipient_ids' => 'required|array|min:1',
            'recipient_ids.*' => 'exists:contacts,id',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
