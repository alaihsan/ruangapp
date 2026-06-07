<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Device extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'udid',
        'model',
        'os_version',
        'status',
    ];

    /**
     * Get the user that owns this device.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the app installations on this device.
     *
     * @return HasMany<InstalledApp, $this>
     */
    public function installedApps(): HasMany
    {
        return $this->hasMany(InstalledApp::class);
    }
}

