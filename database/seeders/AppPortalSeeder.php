<?php

namespace Database\Seeders;

use App\Models\AdminActivityLog;
use App\Models\App;
use App\Models\AppleId;
use App\Models\Device;
use App\Models\InstalledApp;
use App\Models\SimulationLog;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class AppPortalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Get or create primary user
        $user = User::first() ?? User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // 2. Link a simulated Apple ID
        AppleId::firstOrCreate(
            ['email' => 'developer@ruangapp.com'],
            [
                'user_id' => $user->id,
                'account_type' => 'Apple Developer Program ($99/year)',
                'status' => 'active',
            ]
        );

        // 3. Register 400 mock iPads
        Schema::disableForeignKeyConstraints();
        Device::truncate();
        InstalledApp::truncate();
        SimulationLog::truncate();
        AdminActivityLog::truncate();
        Schema::enableForeignKeyConstraints();

        $models = [
            'iPad (10th Generation)',
            'iPad (9th Generation)',
            'iPad Air (5th Generation)',
            'iPad Air (11-inch, M2)',
            'iPad Pro (11-inch, M4)',
        ];
        $osVersions = ['iPadOS 17.4', 'iPadOS 17.5.1', 'iPadOS 18.0', 'iPadOS 18.1'];

        $devicesToInsert = [];
        for ($i = 1; $i <= 400; $i++) {
            $model = $models[$i % count($models)];
            $os = $osVersions[$i % count($osVersions)];
            $udid = sha1("device-student-{$i}");

            $devicesToInsert[] = [
                'user_id' => $user->id,
                'name' => 'iPad Murid '.str_pad($i, 3, '0', STR_PAD_LEFT),
                'model' => $model,
                'udid' => $udid,
                'os_version' => $os,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        Device::insert($devicesToInsert);

        // 4. Create the suite of mock iPadOS applications
        $apps = [
            [
                'name' => 'RuangApp POS',
                'bundle_id' => 'com.ruangapp.pos',
                'description' => 'Sistem kasir digital terintegrasi untuk bisnis ritel dan F&B. Mendukung pembayaran QRIS, pencetakan struk nirkabel, dan manajemen inventori real-time langsung dari iPad Anda.',
                'icon' => json_encode(['bg' => 'from-blue-600 to-indigo-600', 'symbol' => 'POS', 'iconName' => 'CreditCard']),
                'category' => 'Operations',
                'latest_version' => '2.4.1',
                'developer_name' => 'RuangApp Tech',
            ],
            [
                'name' => 'Logistics Scanner',
                'bundle_id' => 'com.ruangapp.scanner',
                'description' => 'Aplikasi pemindaian barcode dan QR code cepat untuk melacak inventori pergudangan, penerimaan barang, dan pengiriman barang terintegrasi dengan ERP perusahaan.',
                'icon' => json_encode(['bg' => 'from-amber-500 to-orange-600', 'symbol' => 'SCAN', 'iconName' => 'QrCode']),
                'category' => 'Utilities',
                'latest_version' => '1.0.5',
                'developer_name' => 'RuangApp Logistics',
            ],
            [
                'name' => 'Student Portal',
                'bundle_id' => 'com.ruangapp.student',
                'description' => 'Portal akademik interaktif untuk siswa. Akses jadwal kelas, nilai ujian, materi pelajaran, dan absensi harian langsung di perangkat iPadOS.',
                'icon' => json_encode(['bg' => 'from-emerald-500 to-teal-600', 'symbol' => 'EDU', 'iconName' => 'GraduationCap']),
                'category' => 'Education',
                'latest_version' => '3.0.0',
                'developer_name' => 'RuangApp Education',
            ],
            [
                'name' => 'Field Report Tool',
                'bundle_id' => 'com.ruangapp.fieldreport',
                'description' => 'Pencatatan laporan lapangan instan untuk tim teknisi dan sales lapangan. Ambil foto kendala, tambahkan catatan, tandatangani berkas langsung secara digital.',
                'icon' => json_encode(['bg' => 'from-purple-500 to-pink-600', 'symbol' => 'REP', 'iconName' => 'ClipboardList']),
                'category' => 'Productivity',
                'latest_version' => '1.2.0',
                'developer_name' => 'RuangApp Operations',
            ],
            [
                'name' => 'Dashboard Analitik',
                'bundle_id' => 'com.ruangapp.analytics',
                'description' => 'Pantau kinerja bisnis Anda secara real-time dengan grafik penjualan, retensi pelanggan, serta laporan keuangan yang diperbarui secara langsung setiap detik.',
                'icon' => json_encode(['bg' => 'from-cyan-500 to-blue-500', 'symbol' => 'ANL', 'iconName' => 'TrendingUp']),
                'category' => 'Finance',
                'latest_version' => '1.5.2',
                'developer_name' => 'RuangApp Finance',
            ],
        ];

        foreach ($apps as $appData) {
            App::updateOrCreate(
                ['bundle_id' => $appData['bundle_id']],
                $appData
            );
        }

        // 5. Seed some mock Admin Activity Logs
        $activities = [
            [
                'user_id' => $user->id,
                'action' => 'LINK_APPLE_ID',
                'target_name' => 'developer@ruangapp.com',
                'details' => 'Admin berhasil menautkan Apple Developer Account developer@ruangapp.com.',
                'ip_address' => '192.168.1.100',
                'created_at' => now()->subHours(5),
                'updated_at' => now()->subHours(5),
            ],
            [
                'user_id' => $user->id,
                'action' => 'SYNC_DEVICES',
                'target_name' => '400 iPad Murid',
                'details' => 'Admin melakukan sinkronisasi awal perangkat iPad Murid (400 unit) melalui integrasi Apple Business Manager.',
                'ip_address' => '192.168.1.100',
                'created_at' => now()->subHours(4),
                'updated_at' => now()->subHours(4),
            ],
            [
                'user_id' => $user->id,
                'action' => 'ADD_APP',
                'target_name' => 'RuangApp POS',
                'details' => 'Admin mengunggah aplikasi RuangApp POS (v2.4.1) ke server lokal.',
                'ip_address' => '192.168.1.100',
                'created_at' => now()->subHours(3),
                'updated_at' => now()->subHours(3),
            ],
            [
                'user_id' => $user->id,
                'action' => 'ADD_APP',
                'target_name' => 'Student Portal',
                'details' => 'Admin mengunggah aplikasi Student Portal (v3.0.0) ke server lokal.',
                'ip_address' => '192.168.1.100',
                'created_at' => now()->subHours(3),
                'updated_at' => now()->subHours(3),
            ],
            [
                'user_id' => $user->id,
                'action' => 'INSTALL_APP',
                'target_name' => 'iPad Murid 001',
                'details' => 'Admin menginisiasi pemasangan RuangApp POS pada iPad Murid 001 via server MDM.',
                'ip_address' => '192.168.1.100',
                'created_at' => now()->subMinutes(30),
                'updated_at' => now()->subMinutes(30),
            ],
        ];
        AdminActivityLog::insert($activities);
    }
}
