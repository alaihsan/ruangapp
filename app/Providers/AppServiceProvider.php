<?php

namespace App\Providers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->ensureSqliteDatabase();
    }

    /**
     * Ensure SQLite database exists and is migrated/seeded.
     * This handles ephemeral containers (e.g. Laravel Cloud) where
     * the SQLite file is not persisted between deployments.
     */
    private function ensureSqliteDatabase(): void
    {
        // Skip during console commands (composer scripts, package:discover, artisan)
        // Only auto-init on HTTP requests to avoid issues during build phase
        if ($this->app->runningInConsole()) {
            return;
        }

        if (config('database.default') !== 'sqlite') {
            return;
        }

        $database = config('database.connections.sqlite.database');

        if (! $database || $database === ':memory:') {
            return;
        }

        // If the SQLite file doesn't exist, create it and run migrations + seed
        if (! file_exists($database)) {
            // Ensure directory exists
            $dir = dirname($database);
            if (! is_dir($dir)) {
                mkdir($dir, 0755, true);
            }

            touch($database);

            Artisan::call('migrate', ['--force' => true]);
            Artisan::call('db:seed', ['--force' => true]);

            return;
        }

        // If the file exists but has no tables yet, run migrations + seed
        try {
            if (! Schema::hasTable('users')) {
                Artisan::call('migrate', ['--force' => true]);
                Artisan::call('db:seed', ['--force' => true]);
            }
        } catch (\Exception $e) {
            // Database file might be empty/corrupt — re-initialize
            Artisan::call('migrate', ['--force' => true]);
            Artisan::call('db:seed', ['--force' => true]);
        }
    }
}
