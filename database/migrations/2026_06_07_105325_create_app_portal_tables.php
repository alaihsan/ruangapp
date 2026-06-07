<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('apple_ids', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('email');
            $table->string('account_type')->default('Personal Developer');
            $table->string('status')->default('active');
            $table->timestamps();
        });

        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('udid')->unique();
            $table->string('model');
            $table->string('os_version')->default('iPadOS 17.5');
            $table->string('status')->default('active');
            $table->timestamps();
        });

        Schema::create('apps', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('bundle_id')->unique();
            $table->text('description');
            $table->text('icon'); // Stores inline SVG paths or icon identifier
            $table->string('category');
            $table->string('latest_version');
            $table->string('developer_name');
            $table->timestamps();
        });

        Schema::create('installed_apps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('device_id')->constrained()->cascadeOnDelete();
            $table->foreignId('app_id')->constrained()->cascadeOnDelete();
            $table->string('installed_version');
            $table->string('status'); // installing, active, updating, deleting, failed
            $table->integer('progress')->default(0);
            $table->string('distribution_mode')->default('ad-hoc'); // ad-hoc, enterprise, mdm
            $table->timestamps();

            $table->unique(['device_id', 'app_id']);
        });

        Schema::create('simulation_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('device_id')->constrained()->cascadeOnDelete();
            $table->foreignId('app_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('installed_app_id')->nullable();
            $table->string('step_name');
            $table->text('message');
            $table->string('type')->default('info'); // info, success, warning, error
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simulation_logs');
        Schema::dropIfExists('installed_apps');
        Schema::dropIfExists('apps');
        Schema::dropIfExists('devices');
        Schema::dropIfExists('apple_ids');
    }
};

