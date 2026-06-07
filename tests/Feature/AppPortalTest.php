<?php

use App\Models\App;
use App\Models\AppleId;
use App\Models\Device;
use App\Models\InstalledApp;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    
    // Seed an app (renamed to avoid overwriting the Laravel container at $this->app)
    $this->portalApp = App::create([
        'name' => 'Test POS',
        'bundle_id' => 'com.test.pos',
        'description' => 'Test App',
        'icon' => json_encode(['bg' => 'from-blue-600 to-indigo-600', 'symbol' => 'POS', 'iconName' => 'CreditCard']),
        'category' => 'Operations',
        'latest_version' => '1.0.0',
        'developer_name' => 'Test Dev',
    ]);
});

test('guests are redirected to login', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated user can view portal dashboard', function () {
    $this->actingAs($this->user)
        ->get('/dashboard')
        ->assertRedirect('/dashboard?tab=today');

    $this->actingAs($this->user)
        ->get('/dashboard?tab=today')
        ->assertOk();
});


test('user can link Apple ID', function () {
    $this->actingAs($this->user)
        ->post('/apple-id', [
            'email' => 'dev@apple.com',
            'account_type' => 'Apple Developer Program ($99/year)',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('apple_ids', [
        'user_id' => $this->user->id,
        'email' => 'dev@apple.com',
    ]);
});

test('user can unlink Apple ID', function () {
    $appleId = AppleId::create([
        'user_id' => $this->user->id,
        'email' => 'dev@apple.com',
        'account_type' => 'Apple Developer Program ($99/year)',
    ]);

    $this->actingAs($this->user)
        ->delete("/apple-id/{$appleId->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('apple_ids', ['id' => $appleId->id]);
});

test('user can register a device with valid UDID', function () {
    $udid = '1a2b3c4d5e6f7a8b9c0d1a2b3c4d5e6f7a8b9c0d'; // 40 hex chars
    $this->actingAs($this->user)
        ->post('/devices', [
            'name' => 'My Test iPad',
            'model' => 'iPad Pro',
            'udid' => $udid,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('devices', [
        'user_id' => $this->user->id,
        'name' => 'My Test iPad',
        'udid' => $udid,
    ]);
});

test('device registration fails with invalid UDID', function () {
    $this->actingAs($this->user)
        ->post('/devices', [
            'name' => 'Invalid iPad',
            'model' => 'iPad Pro',
            'udid' => 'not-hex-and-too-short',
        ])
        ->assertSessionHasErrors(['udid']);
});

test('user can delete a registered device', function () {
    $device = Device::create([
        'user_id' => $this->user->id,
        'name' => 'iPad Air',
        'model' => 'iPad Air 5',
        'udid' => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    ]);

    $this->actingAs($this->user)
        ->delete("/devices/{$device->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('devices', ['id' => $device->id]);
});

test('user can start simulated app installation', function () {
    $device = Device::create([
        'user_id' => $this->user->id,
        'name' => 'iPad Air',
        'model' => 'iPad Air 5',
        'udid' => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    ]);

    $this->actingAs($this->user)
        ->postJson('/portal/install', [
            'device_id' => $device->id,
            'app_id' => $this->portalApp->id,
            'mode' => 'ad-hoc',
        ])
        ->assertOk()
        ->assertJson([
            'status' => 'success',
        ]);

    $this->assertDatabaseHas('installed_apps', [
        'device_id' => $device->id,
        'app_id' => $this->portalApp->id,
        'status' => 'installing',
        'progress' => 0,
    ]);
});

test('user can update simulated installation progress', function () {
    $device = Device::create([
        'user_id' => $this->user->id,
        'name' => 'iPad Air',
        'model' => 'iPad Air 5',
        'udid' => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    ]);

    $installedApp = InstalledApp::create([
        'device_id' => $device->id,
        'app_id' => $this->portalApp->id,
        'installed_version' => '0.0.0',
        'status' => 'installing',
        'progress' => 0,
        'distribution_mode' => 'ad-hoc',
    ]);

    $this->actingAs($this->user)
        ->postJson('/portal/progress', [
            'installed_app_id' => $installedApp->id,
            'progress' => 40,
        ])
        ->assertOk();

    $this->assertDatabaseHas('installed_apps', [
        'id' => $installedApp->id,
        'progress' => 40,
    ]);
});

test('installation is set active at 100% progress', function () {
    $device = Device::create([
        'user_id' => $this->user->id,
        'name' => 'iPad Air',
        'model' => 'iPad Air 5',
        'udid' => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    ]);

    $installedApp = InstalledApp::create([
        'device_id' => $device->id,
        'app_id' => $this->portalApp->id,
        'installed_version' => '0.0.0',
        'status' => 'installing',
        'progress' => 80,
        'distribution_mode' => 'ad-hoc',
    ]);

    $this->actingAs($this->user)
        ->postJson('/portal/progress', [
            'installed_app_id' => $installedApp->id,
            'progress' => 100,
        ])
        ->assertOk();

    $this->assertDatabaseHas('installed_apps', [
        'id' => $installedApp->id,
        'status' => 'active',
        'progress' => 100,
        'installed_version' => $this->portalApp->latest_version,
    ]);
});

test('user can delete an installed app', function () {
    $device = Device::create([
        'user_id' => $this->user->id,
        'name' => 'iPad Air',
        'model' => 'iPad Air 5',
        'udid' => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    ]);

    $installedApp = InstalledApp::create([
        'device_id' => $device->id,
        'app_id' => $this->portalApp->id,
        'installed_version' => '1.0.0',
        'status' => 'active',
        'progress' => 100,
        'distribution_mode' => 'ad-hoc',
    ]);

    $this->actingAs($this->user)
        ->postJson('/portal/delete', [
            'device_id' => $device->id,
            'app_id' => $this->portalApp->id,
        ])
        ->assertOk();

    $this->assertDatabaseMissing('installed_apps', ['id' => $installedApp->id]);
});

test('admin can release version update', function () {
    $this->actingAs($this->user)
        ->post('/simulator/update', [
            'app_id' => $this->portalApp->id,
            'version' => '1.1.0',
        ])
        ->assertRedirect();

    $this->assertEquals('1.1.0', $this->portalApp->fresh()->latest_version);
});

test('user can reset all simulations', function () {
    $device = Device::create([
        'user_id' => $this->user->id,
        'name' => 'iPad Air',
        'model' => 'iPad Air 5',
        'udid' => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    ]);

    InstalledApp::create([
        'device_id' => $device->id,
        'app_id' => $this->portalApp->id,
        'installed_version' => '1.0.0',
        'status' => 'active',
        'progress' => 100,
        'distribution_mode' => 'ad-hoc',
    ]);

    $this->actingAs($this->user)
        ->post('/simulator/reset')
        ->assertRedirect();

    $this->assertDatabaseMissing('installed_apps', [
        'device_id' => $device->id,
    ]);
});


