<?php

namespace App\Http\Controllers;

use App\Models\App;
use App\Models\Device;
use App\Models\InstalledApp;
use App\Models\SimulationLog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class InstallationController extends Controller
{
    /**
     * Start the simulated installation.
     */
    public function install(Request $request): JsonResponse
    {
        $request->validate([
            'device_id' => ['required', 'exists:devices,id'],
            'app_id' => ['required', 'exists:apps,id'],
            'mode' => ['required', 'in:ad-hoc,mdm'],
        ]);

        $device = Device::findOrFail($request->device_id);
        $app = App::findOrFail($request->app_id);
        $mode = $request->mode;

        // Ensure device belongs to user
        if ($device->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Delete any existing failed/deleted record
        InstalledApp::where('device_id', $device->id)
            ->where('app_id', $app->id)
            ->delete();

        // Create new installation record
        $installedApp = InstalledApp::create([
            'device_id' => $device->id,
            'app_id' => $app->id,
            'installed_version' => '0.0.0', // Not fully active yet
            'status' => 'installing',
            'progress' => 0,
            'distribution_mode' => $mode,
        ]);

        // Wipe old logs for this device/app to keep it clean
        SimulationLog::where('device_id', $device->id)
            ->where('app_id', $app->id)
            ->delete();

        // Generate the first log based on mode
        $message = '';
        if ($mode === 'ad-hoc') {
            $message = "Ad-Hoc: Memeriksa registrasi UDID device ({$device->udid}) di Apple Developer Member Center... Terdaftar (slot 14/100 digunakan).";
        } else {
            $message = "MDM: Server MDM memeriksa pendaftaran perangkat {$device->name} ({$device->udid})... Perangkat online.";
        }

        SimulationLog::create([
            'device_id' => $device->id,
            'app_id' => $app->id,
            'installed_app_id' => $installedApp->id,
            'step_name' => 'init_check',
            'message' => $message,
            'type' => 'info',
        ]);

        return response()->json([
            'installed_app' => $installedApp,
            'status' => 'success',
        ]);
    }

    /**
     * Increment installation progress and log corresponding developer steps.
     */
    public function progress(Request $request): JsonResponse
    {
        $request->validate([
            'installed_app_id' => ['required', 'exists:installed_apps,id'],
            'progress' => ['required', 'integer', 'between:0,100'],
        ]);

        $installedApp = InstalledApp::with(['device', 'app'])->findOrFail($request->installed_app_id);
        $device = $installedApp->device;
        $app = $installedApp->app;
        $mode = $installedApp->distribution_mode;
        $progress = $request->progress;

        if ($device->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Update progress
        $installedApp->update(['progress' => $progress]);

        // Generate logs based on progress and mode
        $logMessage = null;
        $stepName = "tick_" . $progress;
        $logType = 'info';

        if ($progress == 20) {
            if ($mode === 'ad-hoc') {
                $logMessage = "Ad-Hoc: Mengunduh Provisioning Profile (.mobileprovision) terbaru dari portal developer yang menyertakan UDID perangkat ini...";
            } else {
                $logMessage = "MDM: Mengirim perintah APNs (Apple Push Notification service) 'InstallApplication' ke perangkat via server APNs Apple...";
            }
        } elseif ($progress == 40) {
            if ($mode === 'ad-hoc') {
                $logMessage = "Ad-Hoc: Menandatangani ulang (re-signing) file binary {$app->bundle_id}.ipa menggunakan sertifikat distribusi Apple Developer Program...";
            } else {
                $logMessage = "MDM: Perangkat menerima sinyal push. Perangkat membalas dengan status 'Acknowledged' dan meminta rincian manifest aplikasi...";
            }
        } elseif ($progress == 60) {
            if ($mode === 'ad-hoc') {
                $logMessage = "OTA Portal: Membuat manifes instalasi XML (manifest.plist) yang berisi tautan aman (HTTPS) file IPA dan ikon aplikasi...";
            } else {
                $logMessage = "MDM VPP: Server memvalidasi lisensi aplikasi melalui Apple Business Manager (Volume Purchase Program)... Lisensi aman.";
            }
        } elseif ($progress == 80) {
            if ($mode === 'ad-hoc') {
                $logMessage = "OTA Portal: Memicu protokol instalasi bawaan iOS melalui URL scheme 'itms-services://?action=download-manifest&url=https://ruangapp.com/manifests/{$app->bundle_id}.plist'...";
            } else {
                $logMessage = "MDM: Perangkat mulai mengunduh file IPA sebesar 48.2 MB secara aman menggunakan token enkripsi khusus...";
            }
        } elseif ($progress == 100) {
            $logMessage = "iOS System: Instalasi selesai! Aplikasi {$app->name} (v{$app->latest_version}) berhasil dipasang pada {$device->name} dan siap digunakan.";
            $logType = 'success';
            
            // Set installed app active
            $installedApp->update([
                'status' => 'active',
                'installed_version' => $app->latest_version,
            ]);
        }


        if ($logMessage) {
            SimulationLog::create([
                'device_id' => $device->id,
                'app_id' => $app->id,
                'installed_app_id' => $installedApp->id,
                'step_name' => $stepName,
                'message' => $logMessage,
                'type' => $logType,
            ]);
        }

        return response()->json([
            'installed_app' => $installedApp,
            'status' => 'success',
        ]);
    }

    /**
     * Start update process.
     */
    public function updateApp(Request $request): JsonResponse
    {
        $request->validate([
            'device_id' => ['required', 'exists:devices,id'],
            'app_id' => ['required', 'exists:apps,id'],
        ]);

        $installedApp = InstalledApp::where('device_id', $request->device_id)
            ->where('app_id', $request->app_id)
            ->firstOrFail();

        $device = $installedApp->device;
        $app = $installedApp->app;

        if ($device->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $installedApp->update([
            'status' => 'updating',
            'progress' => 0,
        ]);

        SimulationLog::create([
            'device_id' => $device->id,
            'app_id' => $app->id,
            'installed_app_id' => $installedApp->id,
            'step_name' => 'update_init',
            'message' => "Update: Memulai pembaruan aplikasi {$app->name} ke versi terbaru v{$app->latest_version}. Memeriksa file diferensial...",
            'type' => 'info',
        ]);

        return response()->json([
            'installed_app' => $installedApp,
            'status' => 'success',
        ]);
    }

    /**
     * Delete the app from the device.
     */
    public function deleteApp(Request $request): JsonResponse
    {
        $request->validate([
            'device_id' => ['required', 'exists:devices,id'],
            'app_id' => ['required', 'exists:apps,id'],
        ]);

        $installedApp = InstalledApp::where('device_id', $request->device_id)
            ->where('app_id', $request->app_id)
            ->firstOrFail();

        $device = $installedApp->device;
        $app = $installedApp->app;

        if ($device->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Set state to deleting
        $installedApp->update([
            'status' => 'deleting',
            'progress' => 50,
        ]);

        // Write deletion logs
        SimulationLog::create([
            'device_id' => $device->id,
            'app_id' => $app->id,
            'installed_app_id' => $installedApp->id,
            'step_name' => 'delete_init',
            'message' => "iOS System: Menerima perintah penghapusan aplikasi {$app->name} dari perangkat {$device->name}...",
            'type' => 'warning',
        ]);

        SimulationLog::create([
            'device_id' => $device->id,
            'app_id' => $app->id,
            'installed_app_id' => $installedApp->id,
            'step_name' => 'delete_cleanup',
            'message' => "iOS System: Menghapus file binary .app, data lokal dalam sandbox, dan membersihkan preferensi pengguna... Selesai.",
            'type' => 'warning',
        ]);

        // Delete the installation record
        $installedApp->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Aplikasi berhasil dihapus dari perangkat.',
        ]);
    }
}
