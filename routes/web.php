<?php

use App\Http\Controllers\AppPortalController;
use App\Http\Controllers\AppleIdController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\InstallationController;
use App\Http\Controllers\IpadManagementController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return Inertia::render('auth/login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
})->name('home');


Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [AppPortalController::class, 'index'])->name('dashboard');

    // Apple ID
    Route::post('apple-id', [AppleIdController::class, 'store'])->name('apple-id.store');
    Route::delete('apple-id/{appleId}', [AppleIdController::class, 'destroy'])->name('apple-id.destroy');

    // Devices
    Route::post('devices', [DeviceController::class, 'store'])->name('devices.store');
    Route::delete('devices/{device}', [DeviceController::class, 'destroy'])->name('devices.destroy');

    // Installation Simulation
    Route::post('portal/install', [InstallationController::class, 'install'])->name('portal.install');
    Route::post('portal/progress', [InstallationController::class, 'progress'])->name('portal.progress');
    Route::post('portal/update', [InstallationController::class, 'updateApp'])->name('portal.update');
    Route::post('portal/delete', [InstallationController::class, 'deleteApp'])->name('portal.delete');

    // Simulator Controls
    Route::post('simulator/update', [SimulatorController::class, 'releaseUpdate'])->name('simulator.update');
    Route::post('simulator/reset', [SimulatorController::class, 'resetSimulation'])->name('simulator.reset');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

