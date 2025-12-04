<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Contact extends Model
{
    protected $fillable = [
        'name',
        'email',
    ];

    public function campaign_recipients(): HasMany
    {
        return $this->hasMany(CampaignRecipient::class);
    }
}
