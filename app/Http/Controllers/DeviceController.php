<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterDeviceRequest;
use App\Models\Device;
use Illuminate\Http\RedirectResponse;

class DeviceController extends Controller
{
    /**
     * Register a new simulated iPad device.
     */
    public function store(RegisterDeviceRequest $request): RedirectResponse
    {
        $request->user()->devices()->create($request->validated() + [
            'os_version' => 'iPadOS 17.5.1',
            'status' => 'active',
        ]);

        return back()->with('status', 'iPad berhasil terdaftar.');
    }

    /**
     * Remove a registered device.
     */
    public function destroy(Device $device): RedirectResponse
    {
        if ($device->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $device->delete();

        return back()->with('status', 'iPad berhasil dihapus.');
    }
}

