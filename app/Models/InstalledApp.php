<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InstalledApp extends Model
{
    protected $fillable = [
        'device_id',
        'app_id',
        'installed_version',
        'status',
        'progress',
        'distribution_mode',
    ];

    /**
     * Get the device on which the app is installed.
     *
     * @return BelongsTo<Device, $this>
     */
    public function device(): BelongsTo
    {
        return $this->belongsTo(Device::class);
    }

    /**
     * Get the app that is installed.
     *
     * @return BelongsTo<App, $this>
     */
    public function app(): BelongsTo
    {
        return $this->belongsTo(App::class);
    }

    /**
     * Get the simulation logs related to this installation.
     *
     * @return HasMany<SimulationLog, $this>
     */
    public function simulationLogs(): HasMany
    {
        return $this->hasMany(SimulationLog::class, 'installed_app_id');
    }
}

