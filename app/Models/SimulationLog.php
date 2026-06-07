<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SimulationLog extends Model
{
    protected $fillable = [
        'device_id',
        'app_id',
        'installed_app_id',
        'step_name',
        'message',
        'type',
    ];

    /**
     * Get the device related to this log.
     *
     * @return BelongsTo<Device, $this>
     */
    public function device(): BelongsTo
    {
        return $this->belongsTo(Device::class);
    }

    /**
     * Get the app related to this log.
     *
     * @return BelongsTo<App, $this>
     */
    public function app(): BelongsTo
    {
        return $this->belongsTo(App::class);
    }

    /**
     * Get the installation record related to this log.
     *
     * @return BelongsTo<InstalledApp, $this>
     */
    public function installedApp(): BelongsTo
    {
        return $this->belongsTo(InstalledApp::class, 'installed_app_id');
    }
}

