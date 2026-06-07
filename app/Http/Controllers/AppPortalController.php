<?php

namespace App\Http\Controllers;

use App\Models\AdminActivityLog;
use App\Models\App;
use App\Models\InstalledApp;
use App\Models\SimulationLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AppPortalController extends Controller
{
    /**
     * Render the App Store Portal Dashboard.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        if (! $request->has('tab')) {
            return redirect()->route('dashboard', ['tab' => 'today']);
        }

        $user = $request->user();

        // Decode icons for React frontend
        $apps = App::all()->map(function ($app) {
            $app->icon_data = json_decode($app->icon);

            return $app;
        });

        $devices = $user->devices()->get();
        $appleIds = $user->appleIds()->get();

        $deviceIds = $devices->pluck('id');

        $installedApps = InstalledApp::whereIn('device_id', $deviceIds)->get();

        $logs = SimulationLog::whereIn('device_id', $deviceIds)
            ->with(['app', 'device'])
            ->latest()
            ->take(100)
            ->get();

        $adminLogs = AdminActivityLog::where('user_id', $user->id)
            ->latest()
            ->take(100)
            ->get();

        return Inertia::render('app-store/index', [
            'apps' => $apps,
            'devices' => $devices,
            'appleIds' => $appleIds,
            'installedApps' => $installedApps,
            'logs' => $logs,
            'adminLogs' => $adminLogs,
        ]);
    }
}
