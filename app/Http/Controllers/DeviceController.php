<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterDeviceRequest;
use App\Models\AdminActivityLog;
use App\Models\Device;
use Illuminate\Http\RedirectResponse;

class DeviceController extends Controller
{
    /**
     * Register a new simulated iPad device.
     */
    public function store(RegisterDeviceRequest $request): RedirectResponse
    {
        $device = $request->user()->devices()->create($request->validated() + [
            'os_version' => 'iPadOS 17.5.1',
            'status' => 'active',
        ]);

        AdminActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'REGISTER_DEVICE',
            'target_name' => $device->name,
            'details' => "Admin mendaftarkan iPad baru: {$device->name} ({$device->model}) dengan UDID {$device->udid}.",
            'ip_address' => $request->ip(),
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

        $deviceName = $device->name;
        $deviceModel = $device->model;
        $device->delete();

        AdminActivityLog::create([
            'user_id' => auth()->id(),
            'action' => 'DELETE_DEVICE',
            'target_name' => $deviceName,
            'details' => "Admin menghapus iPad terdaftar: {$deviceName} ({$deviceModel}).",
            'ip_address' => request()->ip(),
        ]);

        return back()->with('status', 'iPad berhasil dihapus.');
    }
}
