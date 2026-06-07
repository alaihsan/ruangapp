<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class App extends Model
{
    protected $fillable = [
        'name',
        'bundle_id',
        'description',
        'icon',
        'category',
        'latest_version',
        'developer_name',
    ];

    /**
     * Get the installations of this app.
     *
     * @return HasMany<InstalledApp, $this>
     */
    public function installedApps(): HasMany
    {
        return $this->hasMany(InstalledApp::class);
    }
}

