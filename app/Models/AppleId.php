<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AppleId extends Model
{
    protected $fillable = [
        'user_id',
        'email',
        'account_type',
        'status',
    ];

    /**
     * Get the user that owns this Apple ID.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

