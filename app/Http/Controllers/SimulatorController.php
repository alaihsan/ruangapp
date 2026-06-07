<?php

namespace App\Http\Controllers;

use App\Models\App;
use App\Models\InstalledApp;
use App\Models\SimulationLog;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class SimulatorController extends Controller
{
    /**
     * Release a new version of an app to simulate the update flow.
     */
    public function releaseUpdate(Request $request): RedirectResponse
    {
        $request->validate([
            'app_id' => ['required', 'exists:apps,id'],
            'version' => ['nullable', 'string', 'max:20'],
        ]);

        $app = App::findOrFail($request->app_id);
        $oldVersion = $app->latest_version;

        if ($request->filled('version')) {
            $newVersion = $request->version;
        } else {
            // Auto-increment the last digit of the version (e.g. 1.0.5 -> 1.0.6)
            $parts = explode('.', $oldVersion);
            if (count($parts) === 3 && is_numeric($parts[2])) {
                $parts[2] = ((int)$parts[2]) + 1;
                $newVersion = implode('.', $parts);
            } else {
                $newVersion = $oldVersion . '.1';
            }
        }

        $app->update(['latest_version' => $newVersion]);

        return back()->with('status', "Versi baru v{$newVersion} untuk {$app->name} berhasil dirilis!");
    }

    /**
     * Reset all installation states and simulation logs for the current user.
     */
    public function resetSimulation(Request $request): RedirectResponse
    {
        $user = $request->user();
        $deviceIds = $user->devices()->pluck('id');

        InstalledApp::whereIn('device_id', $deviceIds)->delete();
        SimulationLog::whereIn('device_id', $deviceIds)->delete();

        return back()->with('status', 'Semua simulasi instalasi dan log perangkat Anda telah di-reset.');
    }
}
