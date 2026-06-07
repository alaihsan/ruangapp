import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { 
    AppWindow, 
    Smartphone, 
    User as UserIcon, 
    Terminal, 
    Sliders, 
    Search, 
    Download, 
    RefreshCw, 
    Trash2, 
    Plus, 
    Check, 
    AlertCircle, 
    Info, 
    X,
    TrendingUp,
    CreditCard,
    QrCode,
    GraduationCap,
    ClipboardList,
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
    Star,
    Share2,
    Clock,
    Users
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Portal iPadOS',
        href: '/dashboard',
    },
];

interface AppIcon {
    bg: string;
    symbol: string;
    iconName: string;
}

interface AppItem {
    id: number;
    name: string;
    bundle_id: string;
    description: string;
    icon_data: AppIcon | null;
    category: string;
    latest_version: string;
    developer_name: string;
}

interface DeviceItem {
    id: number;
    name: string;
    model: string;
    udid: string;
    os_version: string;
    status: string;
}

interface AppleIdItem {
    id: number;
    email: string;
    account_type: string;
    status: string;
}

interface InstalledAppItem {
    id: number;
    device_id: number;
    app_id: number;
    installed_version: string;
    status: 'installing' | 'active' | 'updating' | 'deleting' | 'failed';
    progress: number;
    distribution_mode: 'ad-hoc' | 'mdm';
}

interface LogItem {
    id: number;
    device_id: number;
    app_id: number;
    step_name: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    created_at: string;
    app?: AppItem;
    device?: DeviceItem;
}

interface AdminLogItem {
    id: number;
    user_id: number;
    action: string;
    target_name: string;
    details: string;
    ip_address: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    apps: AppItem[];
    devices: DeviceItem[];
    appleIds: AppleIdItem[];
    installedApps: InstalledAppItem[];
    logs: LogItem[];
    adminLogs: AdminLogItem[];
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

const MockScreenshots = ({ bundleId }: { bundleId: string }) => {
    const renderScreen = (index: number) => {
        switch (bundleId) {
            case 'com.ruangapp.pos':
                if (index === 1) {
                    return (
                        <div className="w-full h-full p-2 flex flex-col justify-between text-[6px] bg-slate-50 dark:bg-zinc-900 select-none">
                            <div className="flex justify-between border-b pb-0.5 border-neutral-200 dark:border-neutral-800">
                                <span className="font-bold text-neutral-800 dark:text-neutral-200">RuangPOS</span>
                                <span className="text-indigo-600 font-bold">Rp 350.000</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1 my-1 grow">
                                <div className="bg-blue-100/60 dark:bg-blue-950/40 p-1 rounded flex flex-col justify-between border border-blue-200/30"><div className="w-2.5 h-2.5 rounded bg-blue-500"></div><span className="scale-90 origin-left">Espresso</span></div>
                                <div className="bg-amber-100/60 dark:bg-amber-950/40 p-1 rounded flex flex-col justify-between border border-amber-200/30"><div className="w-2.5 h-2.5 rounded bg-amber-500"></div><span className="scale-90 origin-left">Croissant</span></div>
                                <div className="bg-emerald-100/60 dark:bg-emerald-950/40 p-1 rounded flex flex-col justify-between border border-emerald-200/30"><div className="w-2.5 h-2.5 rounded bg-emerald-500"></div><span className="scale-90 origin-left">Matcha</span></div>
                            </div>
                            <button className="w-full bg-indigo-600 text-white rounded-md py-0.5 font-bold text-[5px] text-center scale-95 origin-center">BAYAR SEKARANG</button>
                        </div>
                    );
                } else {
                    return (
                        <div className="w-full h-full p-2 flex flex-col items-center justify-center text-center text-[6px] bg-slate-50 dark:bg-zinc-900 space-y-1 select-none">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center border border-emerald-200/30 shadow-xs">
                                <span className="text-emerald-500 font-bold scale-120 font-mono">✓</span>
                            </div>
                            <span className="font-bold text-emerald-600">Pembayaran Sukses</span>
                            <span className="text-[5px] text-neutral-400">Order #TRX-9482</span>
                            <div className="w-full bg-neutral-100 dark:bg-neutral-950 border border-dashed border-neutral-350 dark:border-neutral-800 p-0.5 rounded text-[5px] scale-90">Struk Dicetak via Bluetooth</div>
                        </div>
                    );
                }
            case 'com.ruangapp.scanner':
                if (index === 1) {
                    return (
                        <div className="w-full h-full bg-black relative flex flex-col justify-between p-1.5 text-[5px] text-white select-none">
                            <div className="border border-neutral-800 bg-neutral-900/60 rounded p-1 flex justify-between items-center opacity-80 scale-95 origin-center">
                                <span>Laser Scan Mode</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                            </div>
                            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-red-500/80 shadow-[0_0_4px_rgba(239,68,68,0.8)] animate-pulse"></div>
                            <div className="text-center opacity-65 text-[4px] -mt-2">Arahkan kamera ke barcode</div>
                            <div className="bg-neutral-950/90 border border-neutral-800 p-1 rounded text-[5px] z-10 scale-90 origin-bottom">
                                Scanned: 8b7c6d5e4f3a...
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="w-full h-full p-2 flex flex-col justify-between text-[6px] bg-slate-50 dark:bg-zinc-900 select-none">
                            <span className="font-bold border-b pb-0.5 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">Inventori Masuk</span>
                            <div className="space-y-0.5 grow my-1">
                                <div className="flex justify-between items-center bg-white dark:bg-neutral-950 p-0.5 rounded border border-neutral-200/30">
                                    <span>BOX-A (12 Pcs)</span>
                                    <span className="text-emerald-500 font-bold scale-90">OK</span>
                                </div>
                                <div className="flex justify-between items-center bg-white dark:bg-neutral-950 p-0.5 rounded border border-neutral-200/30">
                                    <span>BOX-B (40 Pcs)</span>
                                    <span className="text-emerald-500 font-bold scale-90">OK</span>
                                </div>
                            </div>
                            <div className="w-full bg-orange-600 text-white rounded text-[5px] py-0.5 text-center font-bold">SYNC KE ERP CLOUD</div>
                        </div>
                    );
                }
            case 'com.ruangapp.student':
                if (index === 1) {
                    return (
                        <div className="w-full h-full p-2 flex flex-col justify-between text-[6px] bg-slate-50 dark:bg-zinc-900 select-none">
                            <span className="font-bold block border-b pb-0.5 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">Jadwal Hari Ini</span>
                            <div className="space-y-1 my-1 grow">
                                <div className="border-l-2 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 p-1 rounded-r border-t border-b border-r border-indigo-150/20">
                                    <span className="font-bold block text-neutral-800 dark:text-neutral-100 scale-95 origin-left">Matematika Aljabar</span>
                                    <span className="text-neutral-400 scale-90 origin-left block">08:00 - R.402</span>
                                </div>
                                <div className="border-l-2 border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 p-1 rounded-r border-t border-b border-r border-purple-150/20">
                                    <span className="font-bold block text-neutral-800 dark:text-neutral-100 scale-95 origin-left">Fisika Dasar</span>
                                    <span className="text-neutral-400 scale-90 origin-left block">10:00 - Lab Fisika</span>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="w-full h-full p-2 flex flex-col justify-between text-[6px] bg-slate-50 dark:bg-zinc-900 select-none">
                            <span className="font-bold block border-b pb-0.5 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">Nilai Ujian</span>
                            <div className="space-y-0.5 my-1">
                                <div className="flex justify-between items-center">
                                    <span>Matematika</span>
                                    <strong className="text-emerald-500">92/100 (A)</strong>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Fisika</span>
                                    <strong className="text-emerald-500">88/100 (A-)</strong>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>English</span>
                                    <strong className="text-indigo-500">95/100 (A+)</strong>
                                </div>
                            </div>
                            <span className="text-center text-[5px] text-neutral-400 block border-t pt-0.5 border-neutral-200 dark:border-neutral-850">IPK Semester: 3.82</span>
                        </div>
                    );
                }
            case 'com.ruangapp.fieldreport':
                if (index === 1) {
                    return (
                        <div className="w-full h-full p-2 flex flex-col justify-between text-[6px] bg-slate-50 dark:bg-zinc-900 select-none">
                            <span className="font-bold border-b pb-0.5 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">Laporan Lapangan</span>
                            <div className="space-y-0.5 my-1 grow">
                                <div className="flex items-center gap-1">
                                    <span className="text-emerald-500">✔</span>
                                    <span className="truncate">Cek Listrik Utama</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-emerald-500">✔</span>
                                    <span className="truncate">Genset Cadangan</span>
                                </div>
                                <div className="flex items-center gap-1 opacity-50">
                                    <span>☐</span>
                                    <span className="truncate">Pompa Pemadam</span>
                                </div>
                            </div>
                            <span className="text-[4px] text-amber-600 font-semibold bg-amber-50 dark:bg-amber-950/20 px-1 py-0.5 rounded block text-center scale-95">Butuh Tindak Lanjut</span>
                        </div>
                    );
                } else {
                    return (
                        <div className="w-full h-full p-2 flex flex-col justify-between text-[6px] bg-slate-50 dark:bg-zinc-900 select-none">
                            <span className="font-bold block border-b pb-0.5 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">Tanda Tangan Digital</span>
                            <div className="border border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 rounded my-1 h-9 relative flex items-center justify-center overflow-hidden scale-95 origin-center">
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50">
                                    <path d="M 10 30 Q 30 10 50 30 T 90 20" fill="none" stroke="#4f46e5" strokeWidth="2" />
                                </svg>
                                <span className="absolute bottom-0.5 right-0.5 text-[3.5px] text-neutral-400">Ahmad S.</span>
                            </div>
                            <button className="w-full bg-purple-600 text-white rounded py-0.5 text-[5px] text-center font-bold">KIRIM LAPORAN</button>
                        </div>
                    );
                }
            case 'com.ruangapp.analytics':
                if (index === 1) {
                    return (
                        <div className="w-full h-full p-2 flex flex-col justify-between text-[6px] bg-slate-50 dark:bg-zinc-900 select-none">
                            <span className="font-bold block border-b pb-0.5 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">Omset Penjualan</span>
                            <div className="grid grid-cols-2 gap-0.5 my-0.5">
                                <div className="bg-white dark:bg-neutral-950 border p-0.5 rounded">
                                    <span className="text-neutral-400 block scale-75 origin-left">Harian</span>
                                    <strong className="text-neutral-800 dark:text-neutral-200">Rp 12.4M</strong>
                                </div>
                                <div className="bg-white dark:bg-neutral-950 border p-0.5 rounded">
                                    <span className="text-neutral-400 block scale-75 origin-left">Transaksi</span>
                                    <strong className="text-neutral-800 dark:text-neutral-200">4,829</strong>
                                </div>
                            </div>
                            <div className="flex items-end gap-1 h-5 justify-center mt-1">
                                <div className="w-1.5 h-3 bg-indigo-400 rounded-t"></div>
                                <div className="w-1.5 h-4 bg-indigo-500 rounded-t"></div>
                                <div className="w-1.5 h-5 bg-indigo-600 rounded-t"></div>
                                <div className="w-1.5 h-2.5 bg-indigo-300 rounded-t"></div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="w-full h-full p-2 flex flex-col justify-between text-[6px] bg-slate-50 dark:bg-zinc-900 select-none">
                            <span className="font-bold block border-b pb-0.5 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">Analisis Pelanggan</span>
                            <div className="flex items-center justify-between my-1 grow">
                                <div className="space-y-0.5">
                                    <div>
                                        <span className="text-neutral-400 block scale-90 origin-left">Baru</span>
                                        <strong className="text-indigo-600">64.2%</strong>
                                    </div>
                                    <div>
                                        <span className="text-neutral-400 block scale-90 origin-left">Loyal</span>
                                        <strong className="text-emerald-500">35.8%</strong>
                                    </div>
                                </div>
                                <div className="w-7 h-7 rounded-full border-2 border-indigo-500 border-t-emerald-500 flex items-center justify-center scale-90">
                                    <span className="text-[4.5px] font-bold">1.2K</span>
                                </div>
                            </div>
                            <span className="text-[4px] text-indigo-600 font-semibold block text-center">Tren +12% Minggu Ini</span>
                        </div>
                    );
                }
            default:
                return (
                    <div className="w-full h-full flex items-center justify-center p-2 text-center text-neutral-400 text-[6px]">
                        Preview Tidak Tersedia
                    </div>
                );
        }
    };

    return (
        <div className="flex gap-4 overflow-x-auto py-2 pr-2 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
            <div className="w-[180px] h-[130px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden relative shadow-md shrink-0 flex items-center justify-center p-1 group">
                <div className="w-full h-full rounded-lg border border-neutral-150 dark:border-neutral-950 bg-white dark:bg-neutral-950 overflow-hidden select-none">
                    {renderScreen(1)}
                </div>
            </div>
            <div className="w-[180px] h-[130px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden relative shadow-md shrink-0 flex items-center justify-center p-1 group">
                <div className="w-full h-full rounded-lg border border-neutral-150 dark:border-neutral-950 bg-white dark:bg-neutral-950 overflow-hidden select-none">
                    {renderScreen(2)}
                </div>
            </div>
        </div>
    );
};

export default function AppStorePortal() {
    const { apps, devices, appleIds, installedApps, logs, adminLogs } = usePage<any>().props as unknown as PageProps;
    
    // Resolve activeTab directly from URL query parameters (controlled by left sidebar)
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const activeTab = (urlParams?.get('tab') || 'today') as 'today' | 'apps' | 'devices' | 'activity-logs' | 'apple-id' | 'logs' | 'simulator';

    // UI state management
    const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
    const [selectedDevice, setSelectedDevice] = useState<DeviceItem | null>(devices[0] || null);
    const [activeInstallMode, setActiveInstallMode] = useState<'ad-hoc' | 'mdm'>('mdm');
    const [installingAppId, setInstallingAppId] = useState<number | null>(null);
    const [localLogs, setLocalLogs] = useState<LogItem[]>(logs);
    const [iosAlert, setIosAlert] = useState<{title: string, message: string} | null>(null);
    
    // Target Selection Modal states
    const [installTargetModalOpen, setInstallTargetModalOpen] = useState(false);
    const [appToInstall, setAppToInstall] = useState<AppItem | null>(null);
    const [selectedTargetIds, setSelectedTargetIds] = useState<number[]>([]);
    const [targetSearchText, setTargetSearchText] = useState('');
    const [installOption, setInstallOption] = useState<'active' | 'all' | 'custom'>('active');
    
    // Sliders & Filters states
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchText, setSearchText] = useState('');
    const [deviceSearchText, setDeviceSearchText] = useState('');
    const [devicePage, setDevicePage] = useState(1);
    const devicesPerPage = 10;

    // Featured slides mock content
    const featuredSlides = [
        {
            id: 1,
            title: "RuangApp POS v2.4.1",
            subtitle: "Revolusi Transaksi Kasir Bisnis Anda",
            category: "Operations",
            bg: "from-blue-600 via-indigo-700 to-purple-800",
            buttonText: "Simulasi POS",
            tagline: "Sistem kasir digital terintegrasi untuk bisnis ritel dan F&B dengan dukungan pencetakan struk dan QRIS.",
            bundleId: "com.ruangapp.pos",
            icon: "CreditCard"
        },
        {
            id: 2,
            title: "Logistics Scanner v1.0.5",
            subtitle: "Scan Cepat & Pantau Gudang Real-time",
            category: "Utilities",
            bg: "from-amber-500 via-orange-600 to-rose-700",
            buttonText: "Pelajari Sistem Scan",
            tagline: "Lacak inventori pergudangan secara instan menggunakan kamera iPad. Terkoneksi otomatis ke cloud ERP.",
            bundleId: "com.ruangapp.scanner",
            icon: "QrCode"
        },
        {
            id: 3,
            title: "Student Portal v3.0.0",
            subtitle: "Interaksi Belajar Mengajar Lebih Dekat",
            category: "Education",
            bg: "from-emerald-500 via-teal-600 to-cyan-700",
            buttonText: "Coba Portal Siswa",
            tagline: "Akses jadwal kelas, nilai ujian, absensi, dan modul pelajaran interaktif dengan performa optimal.",
            bundleId: "com.ruangapp.student",
            icon: "GraduationCap"
        }
    ];

    // Auto rotate slides
    useEffect(() => {
        if (activeTab !== 'today') return;
        const interval = setInterval(() => {
            setActiveSlideIndex(prev => (prev + 1) % featuredSlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [activeTab]);

    // Form inputs
    const [newDevice, setNewDevice] = useState({ name: '', model: 'iPad Pro 12.9-inch (M4)', udid: '' });
    const [newAppleId, setNewAppleId] = useState({ email: '', account_type: 'Apple Developer Program ($99/year)' });
    const [newAppVersion, setNewAppVersion] = useState<{ [key: number]: string }>({});

    // Sync logs when backend updates
    useEffect(() => {
        setLocalLogs(logs);
    }, [logs]);

    // UDID generator helper
    const generateMockUdid = () => {
        let result = '';
        const chars = '0123456789abcdef';
        for (let i = 0; i < 40; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        setNewDevice({ ...newDevice, udid: result });
    };

    // Find installation state for selected app and active device
    const getInstallState = (appId: number) => {
        if (!selectedDevice) return null;
        return installedApps.find(ia => ia.device_id === selectedDevice.id && ia.app_id === appId) || null;
    };

    // Trigger installation flow
    const handleInstallClick = (app: AppItem, mode: 'ad-hoc' | 'mdm') => {
        if (!selectedDevice) {
            setIosAlert({
                title: 'Perangkat Diperlukan',
                message: 'Silakan daftarkan atau pilih iPad tujuan sebelum melakukan instalasi aplikasi.'
            });
            return;
        }

        // Intercept MDM installations to prompt for targets
        if (mode === 'mdm') {
            setAppToInstall(app);
            setSelectedTargetIds([selectedDevice.id]);
            setInstallOption('active');
            setInstallTargetModalOpen(true);
            return;
        }

        // Validate Ad-Hoc Prerequisites
        if (mode === 'ad-hoc') {
            const hasAppleId = appleIds.some(id => id.account_type.includes('Developer') || id.account_type.includes('Company'));
            if (!hasAppleId) {
                setIosAlert({
                    title: 'Pendaftaran Gagal (Ad-Hoc)',
                    message: 'Distribusi Ad-Hoc membutuhkan Akun Apple Developer terhubung. Tautkan Akun Developer Anda di tab Apple ID.'
                });
                return;
            }
        }

        setSelectedApp(null);
        setInstallingAppId(app.id);

        fetch(route('portal.install'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
            },
            body: JSON.stringify({
                device_id: selectedDevice.id,
                app_id: app.id,
                mode: mode
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                simulateProgress(data.installed_app.id, 20);
            } else {
                setIosAlert({ title: 'Error', message: data.error || 'Gagal memulai simulasi.' });
                setInstallingAppId(null);
            }
        })
        .catch(err => {
            console.error(err);
            setInstallingAppId(null);
        });
    };

    // Execute MDM App Installation for chosen targets (single/bulk)
    const handleExecuteMdmInstall = () => {
        if (!appToInstall || selectedTargetIds.length === 0) return;

        setInstallTargetModalOpen(false);
        setInstallingAppId(appToInstall.id);
        setSelectedApp(null);

        fetch(route('portal.install'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
            },
            body: JSON.stringify({
                device_ids: selectedTargetIds,
                app_id: appToInstall.id,
                mode: 'mdm'
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                if (data.is_bulk) {
                    setInstallingAppId(null);
                    setIosAlert({
                        title: 'Push MDM Massal Berhasil',
                        message: `Perintah push 'InstallApplication' untuk ${appToInstall.name} berhasil disinkronkan ke server Mosyle MDM untuk ${selectedTargetIds.length} perangkat murid.\n\nInstalasi massal ini akan diproses di latar belakang secara otomatis.`
                    });
                    router.reload({ only: ['installedApps', 'logs', 'adminLogs'] });
                } else {
                    // Small number of targets, simulate progress for each
                    data.installed_apps.forEach((ia: any) => {
                        simulateProgress(ia.id, 20);
                    });
                }
            } else {
                setIosAlert({ title: 'Error', message: data.error || 'Gagal memulai simulasi.' });
                setInstallingAppId(null);
            }
        })
        .catch(err => {
            console.error(err);
            setInstallingAppId(null);
        });
    };

    // Recursive progressive ticks to simulate OTA installation steps
    const simulateProgress = (installedAppId: number, nextProgress: number) => {
        if (nextProgress > 100) {
            setInstallingAppId(null);
            router.reload({ only: ['installedApps', 'logs', 'adminLogs'] });
            return;
        }

        setTimeout(() => {
            fetch(route('portal.progress'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
                },
                body: JSON.stringify({
                    installed_app_id: installedAppId,
                    progress: nextProgress
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    router.reload({ 
                        only: ['installedApps', 'logs', 'adminLogs'],
                        onSuccess: () => {
                            simulateProgress(installedAppId, nextProgress + 20);
                        }
                    });
                }
            })
            .catch(err => {
                console.error(err);
                setInstallingAppId(null);
            });
        }, 1500);
    };

    // Trigger app update simulation
    const handleUpdateClick = (app: AppItem) => {
        if (!selectedDevice) return;
        
        fetch(route('portal.update'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
            },
            body: JSON.stringify({
                device_id: selectedDevice.id,
                app_id: app.id
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                simulateProgress(data.installed_app.id, 20);
            }
        })
        .catch(err => console.error(err));
    };

    // Trigger app deletion
    const handleDeleteClick = (app: AppItem) => {
        if (!selectedDevice) return;
        
        fetch(route('portal.delete'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
            },
            body: JSON.stringify({
                device_id: selectedDevice.id,
                app_id: app.id
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                router.reload({ only: ['installedApps', 'logs'] });
            }
        })
        .catch(err => console.error(err));
    };

    // Register a new device UDID
    const handleAddDevice = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('devices.store'), newDevice, {
            onSuccess: () => {
                setNewDevice({ name: '', model: 'iPad Pro 12.9-inch (M4)', udid: '' });
                router.reload({ only: ['devices'] });
            },
            onError: (err: any) => {
                setIosAlert({
                    title: 'Validasi Gagal',
                    message: Object.values(err).join('\n')
                });
            }
        });
    };

    // Link an Apple ID
    const handleAddAppleId = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('apple-id.store'), newAppleId, {
            onSuccess: () => {
                setNewAppleId({ email: '', account_type: 'Apple Developer Program ($99/year)' });
                router.reload({ only: ['appleIds'] });
            },
            onError: (err: any) => {
                setIosAlert({
                    title: 'Validasi Gagal',
                    message: Object.values(err).join('\n')
                });
            }
        });
    };

    // Trigger admin version update
    const handleReleaseUpdate = (appId: number) => {
        router.post(route('simulator.update'), {
            app_id: appId,
            version: newAppVersion[appId] || null
        }, {
            onSuccess: () => {
                setNewAppVersion({ ...newAppVersion, [appId]: '' });
                router.reload({ only: ['apps'] });
            }
        });
    };

    // Reset simulator
    const handleResetSimulator = () => {
        router.post(route('simulator.reset'), {}, {
            onSuccess: () => {
                router.reload({ only: ['installedApps', 'logs'] });
            }
        });
    };

    // Icons mapper
    const getAppIconName = (name: string) => {
        switch (name) {
            case 'CreditCard': return <CreditCard className="w-8 h-8 text-white" />;
            case 'QrCode': return <QrCode className="w-8 h-8 text-white" />;
            case 'GraduationCap': return <GraduationCap className="w-8 h-8 text-white" />;
            case 'ClipboardList': return <ClipboardList className="w-8 h-8 text-white" />;
            default: return <AppWindow className="w-8 h-8 text-white" />;
        }
    };

    const getSmallAppIcon = (name: string) => {
        switch (name) {
            case 'CreditCard': return <CreditCard className="w-5 h-5 text-white" />;
            case 'QrCode': return <QrCode className="w-5 h-5 text-white" />;
            case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-white" />;
            case 'ClipboardList': return <ClipboardList className="w-5 h-5 text-white" />;
            default: return <AppWindow className="w-5 h-5 text-white" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="App Store Portal Simulation" />
            
            <div className="flex flex-col gap-6 p-4 w-full h-full text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
                
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col bg-white dark:bg-neutral-900/60 backdrop-blur-md rounded-2xl border border-neutral-200 dark:border-neutral-800/80 overflow-hidden shadow-sm dark:shadow-2xl">
                    
                    {/* Active Device Ribbon */}
                    {selectedDevice && (
                        <div className="bg-neutral-100 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800/50 px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Perangkat iPad Aktif: <strong className="text-neutral-800 dark:text-neutral-200">{selectedDevice.name} ({selectedDevice.model})</strong>
                            </div>
                            <div className="flex items-center gap-3 justify-between sm:justify-end">
                                <span>UDID: <code className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 px-1.5 py-0.5 rounded font-mono text-[10px]">{selectedDevice.udid.substring(0, 16)}...</code></span>
                                <select 
                                    value={selectedDevice.id} 
                                    onChange={(e) => {
                                        const dev = devices.find(d => d.id === Number(e.target.value)) || null;
                                        setSelectedDevice(dev);
                                    }}
                                    className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 rounded px-2 py-1 text-[11px] outline-none shadow-xs"
                                >
                                    {devices.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Tab Contents */}
                    <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
                        
                        {/* A. TODAY TAB */}
                        {activeTab === 'today' && (
                            <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto w-full">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                                    <div>
                                        <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">MINGGU, 7 JUNI 2026</span>
                                        <h2 className="text-4xl font-black tracking-tight mt-0.5">Today</h2>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 px-3 py-1.5 rounded-full text-xs text-emerald-600 dark:text-emerald-400 font-bold shadow-xs">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        MDM Distribusi Aktif
                                    </div>
                                </div>

                                {/* Dynamic explainer banner */}
                                <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-4 flex gap-4 text-xs leading-relaxed text-indigo-800 dark:text-indigo-200 shadow-xs">
                                    <Info className="w-5 h-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                                    <div>
                                        <span className="font-semibold text-indigo-950 dark:text-white block mb-0.5">Mekanisme Distribusi Aktif: ABM / MDM</span>
                                        Mekanisme Apple Business Manager (ABM) + MDM adalah standar pengelolaan perangkat institusi sekolah. Aplikasi didistribusikan secara privat langsung dari server MDM secara otomatis tanpa batasan UDID Ad-Hoc dan tanpa login Apple ID manual pada 400+ iPad murid.
                                    </div>
                                </div>

                                {/* Interactive curating slider */}
                                <div className="relative group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800/80 shadow-md">
                                    <div className={`p-8 bg-gradient-to-br ${featuredSlides[activeSlideIndex].bg} text-white min-h-[220px] flex flex-col justify-between transition-all duration-500`}>
                                        <div className="space-y-2 max-w-xl">
                                            <span className="text-[9px] font-bold tracking-widest bg-white/20 px-2 py-0.5 rounded-full uppercase inline-block text-white">SOROTAN PORTAL</span>
                                            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-white">{featuredSlides[activeSlideIndex].title}</h3>
                                            <p className="text-white/85 text-xs font-light leading-relaxed">{featuredSlides[activeSlideIndex].tagline}</p>
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
                                            <span className="text-sm font-semibold text-white/90">{featuredSlides[activeSlideIndex].subtitle}</span>
                                            <button 
                                                onClick={() => {
                                                    const target = apps.find(a => a.bundle_id === featuredSlides[activeSlideIndex].bundleId);
                                                    if (target) setSelectedApp(target);
                                                }}
                                                className="bg-white hover:bg-neutral-100 text-neutral-900 font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow-lg active:scale-95 shrink-0"
                                            >
                                                {featuredSlides[activeSlideIndex].buttonText}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Slider navigation chevrons */}
                                    <button 
                                        onClick={() => setActiveSlideIndex(prev => (prev - 1 + featuredSlides.length) % featuredSlides.length)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => setActiveSlideIndex(prev => (prev + 1) % featuredSlides.length)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>

                                    {/* Dots indicators */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                        {featuredSlides.map((_, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => setActiveSlideIndex(idx)}
                                                className={`w-2 h-2 rounded-full transition-all ${idx === activeSlideIndex ? 'bg-white scale-120' : 'bg-white/40 hover:bg-white/60'}`}
                                            ></button>
                                        ))}
                                    </div>
                                </div>

                                {/* Curated Editorial Hero Card ("Big Picture") */}
                                {apps[0] && (
                                    <div className="space-y-3 pt-2">
                                        <h4 className="text-sm font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider">APP OF THE DAY</h4>
                                        <div 
                                            onClick={() => setSelectedApp(apps[0])}
                                            className="relative overflow-hidden rounded-3xl bg-neutral-900 dark:bg-black text-white aspect-[16/9] md:aspect-[2.4/1] w-full border border-neutral-250 dark:border-neutral-850 shadow-xl cursor-pointer group"
                                        >
                                            {/* Editorial mock vector graphics */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-neutral-950/80 to-slate-900 opacity-90 z-0"></div>
                                            <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl animate-pulse"></div>
                                            <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
                                            
                                            {/* Pattern grids */}
                                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>

                                            {/* Main layout contents */}
                                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                                <div className="space-y-1">
                                                    <span className="text-[9px] font-bold text-indigo-400 tracking-widest uppercase">PILIHAN UTAMA</span>
                                                    <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-md text-white drop-shadow-md">
                                                        Ubah iPad Anda Menjadi Mesin Kasir POS Utama
                                                    </h3>
                                                    <p className="text-neutral-400 text-[11px] font-light max-w-sm hidden sm:block">
                                                        Lihat simulasi lengkap penginstalan aplikasi POS internal kami menggunakan penandatanganan profil aman.
                                                    </p>
                                                </div>

                                                {/* Bottom Glassmorphic Card Overlay */}
                                                <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/15 dark:border-white/5 p-4 rounded-2xl flex items-center justify-between gap-4 w-full max-w-md shadow-lg" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${apps[0].icon_data?.bg || 'from-indigo-600 to-indigo-800'} flex items-center justify-center shadow-md shrink-0`}>
                                                            {getSmallAppIcon(apps[0].icon_data?.iconName || 'AppWindow')}
                                                        </div>
                                                        <div className="text-left">
                                                            <span className="font-semibold text-xs text-white block leading-none mb-1">{apps[0].name}</span>
                                                            <span className="text-[10px] text-neutral-350 block">{apps[0].developer_name} • {apps[0].category}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    {(() => {
                                                        const inst = getInstallState(apps[0].id);
                                                        if (inst && inst.status === 'installing') {
                                                            return (
                                                                <span className="text-[10px] text-white bg-indigo-600 px-3.5 py-1.5 rounded-full font-bold animate-pulse">
                                                                    {inst.progress}%
                                                                </span>
                                                            );
                                                        }
                                                        if (inst && inst.status === 'active') {
                                                            return (
                                                                <span className="text-[10px] text-white bg-emerald-600/80 px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1">
                                                                    <Check className="w-3 h-3" /> AKTIF
                                                                </span>
                                                            );
                                                        }
                                                        return (
                                                            <button 
                                                                onClick={() => handleInstallClick(apps[0], activeInstallMode)}
                                                                className="bg-white hover:bg-neutral-100 text-neutral-900 font-bold px-4 py-1.5 rounded-full text-[10px] transition-all transform active:scale-95"
                                                            >
                                                                PASANG
                                                            </button>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Horizontal Apps List ("Aplikasi Baru & Diperbarui") */}
                                <div className="space-y-3 pt-2">
                                    <h4 className="text-sm font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider">APLIKASI BARU & DIPERBARUI</h4>
                                    <div className="flex gap-4 overflow-x-auto pb-3 -mx-2 px-2 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
                                        {apps.map(app => {
                                            const inst = getInstallState(app.id);
                                            return (
                                                <div 
                                                    key={app.id} 
                                                    onClick={() => setSelectedApp(app)}
                                                    className="w-[260px] bg-white dark:bg-neutral-900/50 border border-neutral-250 dark:border-neutral-850 p-4 rounded-2xl flex flex-col justify-between shrink-0 hover:border-indigo-500/20 hover:bg-neutral-50/20 cursor-pointer shadow-xs transition-all"
                                                >
                                                    <div className="flex gap-3">
                                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.icon_data?.bg || 'from-indigo-600 to-indigo-800'} flex items-center justify-center shadow-md shrink-0`}>
                                                            {getSmallAppIcon(app.icon_data?.iconName || 'AppWindow')}
                                                        </div>
                                                        <div className="text-left overflow-hidden">
                                                            <span className="font-semibold text-sm block truncate leading-tight mb-0.5">{app.name}</span>
                                                            <span className="text-[10px] text-neutral-400 block truncate">{app.developer_name}</span>
                                                            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">{app.category}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between border-t border-neutral-150 dark:border-neutral-800/40 mt-4 pt-3" onClick={(e) => e.stopPropagation()}>
                                                        <span className="text-[9px] text-neutral-400 font-mono">v{app.latest_version}</span>
                                                        
                                                        {(() => {
                                                            if (inst && inst.status === 'installing') {
                                                                return (
                                                                    <span className="text-[9px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full font-bold border border-indigo-100 dark:border-indigo-900/20 animate-pulse">
                                                                        {inst.progress}%
                                                                    </span>
                                                                );
                                                            }
                                                            if (inst && inst.status === 'active') {
                                                                return (
                                                                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/10 px-3 py-1 rounded-full font-bold flex items-center gap-0.5">
                                                                        <Check className="w-2.5 h-2.5" /> AKTIF
                                                                    </span>
                                                                );
                                                            }
                                                            return (
                                                                <button 
                                                                    onClick={() => handleInstallClick(app, activeInstallMode)}
                                                                    className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-indigo-600 dark:text-indigo-400 font-bold px-3 py-1 rounded-full text-[10px] shadow-xs active:scale-95"
                                                                >
                                                                    PASANG
                                                                </button>
                                                            );
                                                        })()}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}                        {/* B. APPS TAB */}
                        {activeTab === 'apps' && (() => {
                            const filteredApps = apps.filter(app => {
                                const matchCat = selectedCategory === 'All' || app.category === selectedCategory;
                                const matchSearch = app.name.toLowerCase().includes(searchText.toLowerCase());
                                return matchCat && matchSearch;
                            });

                            return (
                                <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto w-full">
                                    {/* Curated Grid Banner */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div 
                                            onClick={() => setSelectedApp(apps[0])}
                                            className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white flex flex-col justify-between min-h-[140px] shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-99"
                                        >
                                            <div className="space-y-1">
                                                <span className="text-[9px] font-bold text-purple-100 tracking-wider uppercase">KOLEKSI PILIHAN</span>
                                                <h3 className="text-xl font-bold">Aplikasi Bisnis Unggulan</h3>
                                                <p className="text-purple-100/90 text-xs font-light leading-relaxed">Kumpulan aplikasi untuk mempercepat alur transaksi ritel dan pergudangan.</p>
                                            </div>
                                            <span className="text-[10px] text-purple-200 font-semibold mt-4">Jelajahi Detail POS & Scanner →</span>
                                        </div>
                                        <div 
                                            onClick={() => setSelectedApp(apps[2])}
                                            className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white flex flex-col justify-between min-h-[140px] shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-99"
                                        >
                                            <div className="space-y-1">
                                                <span className="text-[9px] font-bold text-emerald-100 tracking-wider uppercase">KATEGORI POPULER</span>
                                                <h3 className="text-xl font-bold">Pendidikan & Produktivitas</h3>
                                                <p className="text-emerald-100/90 text-xs font-light leading-relaxed">Tingkatkan efisiensi kerja tim lapangan dan portal akademik interaktif.</p>
                                            </div>
                                            <span className="text-[10px] text-emerald-200 font-semibold mt-4">Jelajahi Detail Portal & Report →</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-t border-neutral-200 dark:border-neutral-800/60 pt-4">
                                        <h2 className="text-2xl font-bold tracking-tight">Katalog Aplikasi</h2>
                                        <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50 px-3 py-2 rounded-lg w-full sm:w-64 text-xs shadow-xs">
                                            <Search className="w-4 h-4 text-neutral-400" />
                                            <input 
                                                type="text" 
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                placeholder="Cari nama aplikasi..." 
                                                className="bg-transparent border-none outline-none text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 w-full"
                                            />
                                            {searchText && <X className="w-4 h-4 text-neutral-450 cursor-pointer hover:text-neutral-600 dark:hover:text-white" onClick={() => setSearchText('')} />}
                                        </div>
                                    </div>

                                    {/* Category Pill badges */}
                                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                                        {['All', 'Operations', 'Utilities', 'Education', 'Productivity', 'Finance'].map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${selectedCategory === cat ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-850'}`}
                                            >
                                                {cat === 'All' ? 'Semua Kategori' : cat}
                                            </button>
                                        ))}
                                    </div>

                                    {/* App Store style row listing */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {filteredApps.length === 0 ? (
                                            <div className="col-span-2 text-center py-12 text-xs text-neutral-500 font-light">Tidak ada aplikasi yang cocok.</div>
                                        ) : (
                                            filteredApps.map((app, index) => {
                                                const inst = getInstallState(app.id);
                                                return (
                                                    <div 
                                                        key={app.id}
                                                        onClick={() => setSelectedApp(app)}
                                                        className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-850 p-4 rounded-2xl flex items-center justify-between hover:bg-neutral-50/20 dark:hover:bg-neutral-800/10 hover:border-indigo-500/20 cursor-pointer transition-all shadow-xs"
                                                    >
                                                        <div className="flex gap-3.5 items-center overflow-hidden">
                                                            {/* Ranking Number */}
                                                            <span className="font-black text-neutral-300 dark:text-neutral-750 text-base w-4 text-center shrink-0">
                                                                {index + 1}
                                                            </span>
                                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.icon_data?.bg || 'from-indigo-600 to-indigo-800'} flex items-center justify-center shadow-md shrink-0 border border-white/5`}>
                                                                {getSmallAppIcon(app.icon_data?.iconName || 'AppWindow')}
                                                            </div>
                                                            <div className="text-left overflow-hidden">
                                                                <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white truncate leading-snug">{app.name}</h4>
                                                                <span className="text-[10px] text-neutral-450 block truncate">{app.developer_name}</span>
                                                                <span className="inline-block bg-neutral-100 dark:bg-neutral-800 text-[9px] font-bold text-neutral-500 dark:text-neutral-400 px-1.5 py-0.5 rounded mt-1.5">{app.category}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                                                            {inst && inst.status === 'installing' && (
                                                                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full font-bold border border-indigo-100 dark:border-indigo-900/20 animate-pulse">
                                                                    {inst.progress}%
                                                                </span>
                                                            )}
                                                            {inst && inst.status === 'updating' && (
                                                                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full font-bold border border-indigo-100 dark:border-indigo-900/20 animate-pulse">
                                                                    {inst.progress}%
                                                                </span>
                                                            )}
                                                            {inst && inst.installed_version !== app.latest_version && (
                                                                <button 
                                                                    onClick={() => handleUpdateClick(app)}
                                                                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3.5 py-1.5 rounded-full text-[10px]"
                                                                >
                                                                    UPDATE
                                                                </button>
                                                            )}
                                                            {inst && inst.status === 'active' && (
                                                                <div className="flex gap-2">
                                                                    <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-0.5">
                                                                        <Check className="w-3.5 h-3.5 animate-in fade-in" /> AKTIF
                                                                    </div>
                                                                    <button 
                                                                        onClick={() => handleDeleteClick(app)}
                                                                        className="bg-neutral-100 dark:bg-neutral-800 hover:text-red-500 p-2 rounded-full transition-all"
                                                                    >
                                                                        <Trash2 className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                            {(!inst || inst.status === 'failed') && (
                                                                <button 
                                                                    onClick={() => handleInstallClick(app, activeInstallMode)}
                                                                    className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-indigo-600 dark:text-indigo-400 font-bold px-4 py-1.5 rounded-full text-[10px] shadow-xs active:scale-95 transition-transform"
                                                                >
                                                                    DAPATKAN
                                                                </button>
                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* C. DEVICES TAB */}
                        {activeTab === 'devices' && (() => {
                            const filteredDevices = devices.filter(dev => {
                                const term = deviceSearchText.toLowerCase();
                                return dev.name.toLowerCase().includes(term) || 
                                       dev.model.toLowerCase().includes(term) || 
                                       dev.udid.toLowerCase().includes(term);
                            });

                            const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);
                            const displayedDevices = filteredDevices.slice((devicePage - 1) * devicesPerPage, devicePage * devicesPerPage);

                            return (
                                <div className="space-y-6 max-w-5xl mx-auto w-full">
                                    <h2 className="text-2xl font-bold tracking-tight">Daftar iPad Murid Terkelola</h2>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed font-light">
                                        Portal ini mengelola seluruh perangkat iPad milik 400+ murid yang terdaftar. Penambahan dan sinkronisasi lisensi aplikasi dilakukan secara otomatis melalui sinkronisasi token Apple Business Manager (ABM) dan server Mosyle MDM tanpa batasan UDID.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        
                                        {/* List registered devices */}
                                        <div className="bg-white dark:bg-neutral-900/30 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 shadow-xs flex flex-col justify-between">
                                            <div className="space-y-3">
                                                <div className="flex flex-col gap-2">
                                                    <h4 className="text-sm font-bold tracking-wide">Daftar iPad Terdaftar ({devices.length})</h4>
                                                    
                                                    {/* Search box for iPads */}
                                                    <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50 px-2 py-1.5 rounded-lg text-xs w-full shadow-xs">
                                                        <Search className="w-3.5 h-3.5 text-neutral-400" />
                                                        <input 
                                                            type="text" 
                                                            value={deviceSearchText}
                                                            onChange={(e) => {
                                                                setDeviceSearchText(e.target.value);
                                                                setDevicePage(1); // Reset page on search
                                                            }}
                                                            placeholder="Cari iPad murid (nama, model, UDID)..." 
                                                            className="bg-transparent border-none outline-none text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 w-full"
                                                        />
                                                        {deviceSearchText && <X className="w-3.5 h-3.5 text-neutral-450 cursor-pointer" onClick={() => { setDeviceSearchText(''); setDevicePage(1); }} />}
                                                    </div>
                                                </div>

                                                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                                                    {displayedDevices.length === 0 ? (
                                                        <div className="text-center py-12 text-xs text-neutral-500 font-light">Tidak ada iPad yang cocok.</div>
                                                    ) : (
                                                        displayedDevices.map(dev => (
                                                            <div 
                                                                key={dev.id} 
                                                                onClick={() => setSelectedDevice(dev)}
                                                                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${selectedDevice?.id === dev.id ? 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-500' : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-850 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30'}`}
                                                            >
                                                                <div className="flex gap-3 items-center">
                                                                    <Smartphone className={`w-5 h-5 ${selectedDevice?.id === dev.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400'}`} />
                                                                    <div>
                                                                        <strong className="text-sm block">{dev.name}</strong>
                                                                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">{dev.model} • {dev.os_version}</span>
                                                                        <code className="text-[9px] text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded mt-1 inline-block">{dev.udid.substring(0, 16)}...</code>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>


                                            {/* Pagination Controls */}
                                            {totalPages > 1 && (
                                                <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-800/60 pt-3 mt-3 text-xs text-neutral-500">
                                                    <span>Halaman {devicePage} dari {totalPages}</span>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            disabled={devicePage === 1}
                                                            onClick={() => setDevicePage(prev => Math.max(prev - 1, 1))}
                                                            className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-850 hover:bg-neutral-200 dark:hover:bg-neutral-750 disabled:opacity-40 rounded"
                                                        >
                                                            Prev
                                                        </button>
                                                        <button 
                                                            disabled={devicePage === totalPages}
                                                            onClick={() => setDevicePage(prev => Math.min(prev + 1, totalPages))}
                                                            className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-850 hover:bg-neutral-200 dark:hover:bg-neutral-750 disabled:opacity-40 rounded"
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Add new device form */}
                                        <form onSubmit={handleAddDevice} className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/60 p-5 rounded-2xl space-y-4 shadow-xs">
                                            <h4 className="text-sm font-bold">Daftarkan iPad Baru</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Nama iPad</label>
                                                    <input 
                                                        type="text" 
                                                        value={newDevice.name}
                                                        onChange={e => setNewDevice({...newDevice, name: e.target.value})}
                                                        placeholder="Contoh: iPad Gudang Barat"
                                                        className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Model Perangkat</label>
                                                    <select 
                                                        value={newDevice.model}
                                                        onChange={e => setNewDevice({...newDevice, model: e.target.value})}
                                                        className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500"
                                                    >
                                                        <option>iPad Pro 12.9-inch (M4)</option>
                                                        <option>iPad Air (5th Generation)</option>
                                                        <option>iPad mini (6th Generation)</option>
                                                        <option>iPad (10th Generation)</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">UDID (40 Karakter Hex)</label>
                                                    <div className="flex gap-2">
                                                        <input 
                                                            type="text" 
                                                            value={newDevice.udid}
                                                            onChange={e => setNewDevice({...newDevice, udid: e.target.value})}
                                                            placeholder="40-digit heksadesimal"
                                                            className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-indigo-500"
                                                            required
                                                        />
                                                        <button 
                                                            type="button"
                                                            onClick={generateMockUdid}
                                                            className="bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 px-3.5 rounded-lg text-xs shrink-0"
                                                        >
                                                            Generate
                                                        </button>
                                                    </div>
                                                </div>
                                                <button 
                                                    type="submit"
                                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg text-xs mt-3 flex items-center justify-center gap-1.5"
                                                >
                                                    <Plus className="w-4 h-4" /> Daftarkan Device
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            );
                        })()}

                        {/* D. APPLE ID TAB */}
                        {activeTab === 'apple-id' && (
                            <div className="space-y-6 max-w-5xl mx-auto w-full">
                                <h2 className="text-2xl font-bold tracking-tight">Integrasi Akun Apple Developer</h2>
                                <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed font-light">
                                    Hubungkan akun program pengembang Apple. Akun ini menyuplai Sertifikat Distribusi digital yang diotorisasi oleh Apple untuk menandatangani *binary package* (.ipa) sebelum didorong ke iPad.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    
                                    {/* Linked profiles */}
                                    <div className="space-y-3 bg-white dark:bg-neutral-900/30 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 shadow-xs">
                                        <h4 className="text-sm font-bold">Akun Terhubung ({appleIds.length})</h4>
                                        <div className="space-y-3">
                                            {appleIds.length === 0 ? (
                                                <div className="text-center py-8 text-xs text-neutral-500">Belum ada akun Apple ID yang ditautkan.</div>
                                            ) : (
                                                appleIds.map(id => (
                                                    <div 
                                                        key={id.id}
                                                        className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 p-4 rounded-xl flex items-center justify-between"
                                                    >
                                                        <div>
                                                            <strong className="text-sm">{id.email}</strong>
                                                            <span className="inline-block bg-indigo-50 dark:bg-indigo-950/40 text-[10px] text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 px-2 py-0.5 rounded mt-1.5">{id.account_type}</span>
                                                        </div>
                                                        <button 
                                                            onClick={() => router.delete(route('apple-id.destroy', id.id))}
                                                            className="text-neutral-400 hover:text-red-500 p-2 rounded-lg"
                                                            title="Lepas Penautan"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Add profile form */}
                                    <form onSubmit={handleAddAppleId} className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/60 p-5 rounded-2xl space-y-4 shadow-xs">
                                        <h4 className="text-sm font-bold">Hubungkan Apple Developer Account</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Email Apple ID</label>
                                                <input 
                                                    type="email" 
                                                    value={newAppleId.email}
                                                    onChange={e => setNewAppleId({...newAppleId, email: e.target.value})}
                                                    placeholder="Contoh: iosdev@ipadmurid.com"
                                                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Jenis Developer Program</label>
                                                <select 
                                                    value={newAppleId.account_type}
                                                    onChange={e => setNewAppleId({...newAppleId, account_type: e.target.value})}
                                                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-850 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500"
                                                    disabled
                                                >
                                                    <option>Apple Developer Program ($99/year)</option>
                                                </select>
                                            </div>
                                            <button 
                                                type="submit"
                                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg text-xs mt-3 flex items-center justify-center gap-1.5"
                                            >
                                                <Plus className="w-4 h-4" /> Tautkan Akun
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        )}

                        {/* E. DEVELOPER LOGS TAB */}
                        {activeTab === 'logs' && (
                            <div className="space-y-4 flex flex-col h-full max-w-5xl mx-auto w-full">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight">Konsol Log Portal Pengembang</h2>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light mt-0.5">Rincian tahapan integrasi sertifikat distribusi, pembuatan manifest xml, dan proses transfer file IPA.</p>
                                    </div>
                                    <button 
                                        onClick={() => router.reload({ only: ['logs'] })}
                                        className="bg-white dark:bg-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs border border-neutral-350 dark:border-neutral-700/60 px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-xs"
                                    >
                                        <RefreshCw className="w-3.5 h-3.5" /> Refresh Log
                                    </button>
                                </div>

                                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-neutral-300 overflow-y-auto h-[450px] space-y-2.5 scrollbar-thin">
                                    {localLogs.length === 0 ? (
                                        <div className="text-center py-16 text-neutral-500 font-sans">Belum ada log aktivitas. Silakan jalankan instalasi aplikasi untuk melihat log detail.</div>
                                    ) : (
                                        localLogs.map((log, idx) => {
                                            const time = new Date(log.created_at).toLocaleTimeString();
                                            let badgeBg = 'bg-neutral-800 text-neutral-400 border-neutral-700';
                                            if (log.type === 'success') badgeBg = 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30';
                                            if (log.type === 'warning') badgeBg = 'bg-amber-950/40 text-amber-400 border-amber-900/30';
                                            if (log.type === 'error') badgeBg = 'bg-red-950/40 text-red-400 border-red-900/30';

                                            return (
                                                <div key={log.id || idx} className="flex gap-2 border-b border-neutral-900/40 pb-2 align-top">
                                                    <span className="text-indigo-400 shrink-0 select-none">[{time}]</span>
                                                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase border shrink-0 h-fit ${badgeBg}`}>
                                                        {log.type}
                                                    </span>
                                                    <div>
                                                        <span className="text-white font-semibold">{log.app?.name || 'Portal'} ({log.device?.name || 'Global'}):</span>{' '}
                                                        <span className="text-neutral-300">{log.message}</span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        )}

                        {/* LOG AKTIVITAS (ADMIN AUDIT LOGS) TAB */}
                        {activeTab === 'activity-logs' && (
                            <div className="space-y-6 max-w-5xl mx-auto w-full animate-in fade-in duration-200">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight">Log Aktivitas Administrator</h2>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-450 font-light mt-0.5">
                                            Catatan audit resmi dari semua tindakan administratif yang dilakukan oleh admin di dalam portal Ruang App iPad.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => router.reload({ only: ['adminLogs'] })}
                                        className="bg-white dark:bg-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs border border-neutral-300 dark:border-neutral-750 px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                                    >
                                        <RefreshCw className="w-3.5 h-3.5" /> Refresh Log
                                    </button>
                                </div>

                                <div className="bg-white dark:bg-neutral-900 border border-neutral-250 dark:border-neutral-850 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse text-xs">
                                            <thead>
                                                <tr className="bg-neutral-50 dark:bg-neutral-950/40 border-b border-neutral-250 dark:border-neutral-800/60 text-neutral-500 font-semibold">
                                                    <th className="p-4 w-[180px]">Waktu</th>
                                                    <th className="p-4 w-[140px]">Aksi</th>
                                                    <th className="p-4 w-[180px]">Target</th>
                                                    <th className="p-4">Detail Aktivitas</th>
                                                    <th className="p-4 w-[120px] text-right">IP Address</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-850">
                                                {adminLogs.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={5} className="text-center py-16 text-neutral-400 font-light">
                                                            Belum ada riwayat aktivitas admin.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    adminLogs.map((log) => {
                                                        const date = new Date(log.created_at);
                                                        const formattedDate = date.toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        }) + ' ' + date.toLocaleTimeString('id-ID', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit'
                                                        });

                                                        let badgeBg = 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300';
                                                        if (log.action === 'INSTALL_APP') badgeBg = 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400';
                                                        if (log.action === 'DELETE_APP') badgeBg = 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400';
                                                        if (log.action === 'RELEASE_UPDATE') badgeBg = 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400';
                                                        if (log.action === 'SYNC_DEVICES' || log.action === 'REGISTER_DEVICE') badgeBg = 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400';
                                                        if (log.action === 'RESET_SIMULATOR') badgeBg = 'bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400';

                                                        return (
                                                            <tr key={log.id} className="hover:bg-neutral-50/40 dark:hover:bg-neutral-900/40 transition-colors">
                                                                <td className="p-4 font-mono text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
                                                                    {formattedDate}
                                                                </td>
                                                                <td className="p-4 whitespace-nowrap">
                                                                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${badgeBg}`}>
                                                                        {log.action.replace('_', ' ')}
                                                                    </span>
                                                                </td>
                                                                <td className="p-4 font-semibold text-neutral-800 dark:text-neutral-200">
                                                                    {log.target_name || '-'}
                                                                </td>
                                                                <td className="p-4 text-neutral-500 dark:text-neutral-400 leading-normal font-light">
                                                                    {log.details}
                                                                </td>
                                                                <td className="p-4 text-right font-mono text-neutral-400 dark:text-neutral-500">
                                                                    {log.ip_address || '127.0.0.1'}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* F. ADMIN CONTROLS TAB */}
                        {activeTab === 'simulator' && (
                            <div className="space-y-6 max-w-5xl mx-auto w-full">
                                <h2 className="text-2xl font-bold tracking-tight">Pengaturan Administrator</h2>
                                <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed font-light">
                                    Kontrol pengembang untuk memicu notifikasi pembaruan aplikasi (update) dan pembersihan basis data pengujian.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    
                                    {/* App Update Simulator list */}
                                    <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/60 p-5 rounded-2xl space-y-4 shadow-xs">
                                        <h4 className="text-sm font-bold">Simulasikan Pembaruan Aplikasi</h4>
                                        <div className="space-y-3">
                                            {apps.map(app => (
                                                <div key={app.id} className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-950/45 border border-neutral-200 dark:border-neutral-850 p-3 rounded-xl">
                                                    <div>
                                                        <span className="font-semibold text-xs block">{app.name}</span>
                                                        <span className="text-[10px] text-neutral-400 block mt-0.5">Versi Aktif: v{app.latest_version}</span>
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <input 
                                                            type="text" 
                                                            placeholder="v2.0.0"
                                                            value={newAppVersion[app.id] || ''}
                                                            onChange={e => setNewAppVersion({...newAppVersion, [app.id]: e.target.value})}
                                                            className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded px-2 py-1 text-[11px] w-20 text-neutral-800 dark:text-neutral-200 outline-none font-mono"
                                                        />
                                                        <button 
                                                            onClick={() => handleReleaseUpdate(app.id)}
                                                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-3 py-1.5 rounded text-[10px] flex items-center gap-1 shadow-xs"
                                                        >
                                                            <Plus className="w-3 h-3" /> Rilis
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Database Reset */}
                                    <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/60 p-5 rounded-2xl flex flex-col justify-between shadow-xs">
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-bold flex items-center gap-2 text-amber-500">
                                                <AlertTriangle className="w-4.5 h-4.5 animate-pulse" /> Reset Status Portal
                                            </h4>
                                            <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed font-light">
                                                Tindakan ini akan mengosongkan riwayat instalasi aplikasi di seluruh perangkat terdaftar dan membersihkan log portal pengembang Anda.
                                            </p>
                                        </div>
                                        <button 
                                            onClick={handleResetSimulator}
                                            className="w-full bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-semibold py-2.5 rounded-lg text-xs mt-6 transition-all"
                                        >
                                            Reset Semua Simulasi Perangkat & Log
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>

            {/* iOS Alert Modal */}
            {iosAlert && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999] backdrop-blur-sm">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-250 dark:border-neutral-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                        <div className="p-5 space-y-2 text-center">
                            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                            <h4 className="font-bold text-base leading-tight">{iosAlert.title}</h4>
                            <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed font-light whitespace-pre-line">{iosAlert.message}</p>
                        </div>
                        <div className="border-t border-neutral-200 dark:border-neutral-850 flex">
                            <button 
                                onClick={() => setIosAlert(null)}
                                className="w-full text-center py-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-neutral-50 dark:hover:bg-neutral-850 active:bg-neutral-100 dark:active:bg-neutral-800 transition-all outline-none"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Target Selection Modal (MDM App Distribution) */}
            {installTargetModalOpen && appToInstall && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999] backdrop-blur-sm">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-250 dark:border-neutral-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
                        
                        {/* Header */}
                        <div className="p-5 border-b border-neutral-100 dark:border-neutral-850 flex justify-between items-center bg-neutral-50 dark:bg-neutral-950/20">
                            <div>
                                <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white flex items-center gap-1.5">
                                    <Download className="w-4 h-4 text-emerald-500" /> Distribusi Aplikasi (MDM)
                                </h4>
                                <span className="text-[10px] text-neutral-400 block mt-0.5">Pilih target penerima untuk <strong>{appToInstall.name}</strong></span>
                            </div>
                            <button 
                                onClick={() => setInstallTargetModalOpen(false)}
                                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-full transition-all"
                            >
                                <X className="w-4.5 h-4.5" />
                            </button>
                        </div>

                        {/* Options */}
                        <div className="p-6 space-y-4 overflow-y-auto flex-1">
                            <div className="space-y-2.5">
                                <label className="text-xs font-bold text-neutral-500 dark:text-neutral-450 block uppercase tracking-wider">Opsi Sasaran Distribusi</label>
                                
                                <div className="grid gap-2">
                                    {/* Option 1: Selected Device */}
                                    {selectedDevice && (
                                        <div 
                                            onClick={() => {
                                                setInstallOption('active');
                                                setSelectedTargetIds([selectedDevice.id]);
                                            }}
                                            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${installOption === 'active' ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500' : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-850 hover:bg-neutral-100/30'}`}
                                        >
                                            <div className="flex gap-3 items-center">
                                                <div className={`p-2 rounded-lg ${installOption === 'active' ? 'bg-indigo-500 text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'}`}>
                                                    <Smartphone className="w-4 h-4" />
                                                </div>
                                                <div className="text-left">
                                                    <strong className="text-xs block text-neutral-900 dark:text-white">iPad Murid Aktif Saat Ini</strong>
                                                    <span className="text-[10px] text-neutral-400 block">{selectedDevice.name} • {selectedDevice.model}</span>
                                                </div>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${installOption === 'active' ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-neutral-300'}`}>
                                                {installOption === 'active' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                            </div>
                                        </div>
                                    )}

                                    {/* Option 2: All Devices */}
                                    <div 
                                        onClick={() => {
                                            setInstallOption('all');
                                            setSelectedTargetIds(devices.map(d => d.id));
                                        }}
                                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${installOption === 'all' ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500' : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-850 hover:bg-neutral-100/30'}`}
                                    >
                                        <div className="flex gap-3 items-center">
                                            <div className={`p-2 rounded-lg ${installOption === 'all' ? 'bg-indigo-500 text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'}`}>
                                                <Users className="w-4 h-4" />
                                            </div>
                                            <div className="text-left">
                                                <strong className="text-xs block text-neutral-900 dark:text-white">Semua iPad Murid Terkelola</strong>
                                                <span className="text-[10px] text-neutral-400 block">Kirim perintah push massal ke seluruh {devices.length} perangkat</span>
                                            </div>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${installOption === 'all' ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-neutral-300'}`}>
                                            {installOption === 'all' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                        </div>
                                    </div>

                                    {/* Option 3: Custom Devices Selection */}
                                    <div 
                                        onClick={() => {
                                            setInstallOption('custom');
                                            setSelectedTargetIds([]); // clear to let them pick
                                        }}
                                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${installOption === 'custom' ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500' : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-850 hover:bg-neutral-100/30'}`}
                                    >
                                        <div className="flex gap-3 items-center">
                                            <div className={`p-2 rounded-lg ${installOption === 'custom' ? 'bg-indigo-500 text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'}`}>
                                                <Search className="w-4 h-4" />
                                            </div>
                                            <div className="text-left">
                                                <strong className="text-xs block text-neutral-900 dark:text-white">Pilih iPad Tertentu (Multi-Select)</strong>
                                                <span className="text-[10px] text-neutral-400 block">Pilih satu per satu dengan pencarian dan filter</span>
                                            </div>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${installOption === 'custom' ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-neutral-300'}`}>
                                            {installOption === 'custom' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Custom Selection Area */}
                            {installOption === 'custom' && (
                                <div className="space-y-3 border-t border-neutral-100 dark:border-neutral-800/80 pt-4 animate-in fade-in duration-200">
                                    <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-850 px-2.5 py-2 rounded-xl text-xs shadow-xs">
                                        <Search className="w-4 h-4 text-neutral-400" />
                                        <input 
                                            type="text" 
                                            value={targetSearchText}
                                            onChange={(e) => setTargetSearchText(e.target.value)}
                                            placeholder="Cari nama, model, atau UDID murid..." 
                                            className="bg-transparent border-none outline-none text-neutral-800 dark:text-neutral-200 placeholder-neutral-450 w-full"
                                        />
                                        {targetSearchText && <X className="w-3.5 h-3.5 text-neutral-400 cursor-pointer" onClick={() => setTargetSearchText('')} />}
                                    </div>

                                    <div className="max-h-[160px] overflow-y-auto border border-neutral-200 dark:border-neutral-800/60 rounded-xl divide-y divide-neutral-100 dark:divide-neutral-850 bg-white dark:bg-neutral-900 shadow-sm p-1.5">
                                        {(() => {
                                            const targets = devices.filter(d => {
                                                const term = targetSearchText.toLowerCase();
                                                return d.name.toLowerCase().includes(term) ||
                                                       d.model.toLowerCase().includes(term) ||
                                                       d.udid.toLowerCase().includes(term);
                                            });

                                            if (targets.length === 0) {
                                                return <div className="text-center py-6 text-xs text-neutral-400 font-light">Tidak ada iPad yang cocok.</div>;
                                            }

                                            return targets.map(d => {
                                                const isChecked = selectedTargetIds.includes(d.id);
                                                return (
                                                    <label 
                                                        key={d.id}
                                                        className="flex items-center justify-between p-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-950 rounded-lg cursor-pointer transition-colors"
                                                    >
                                                        <div className="flex gap-2 items-center">
                                                            <Smartphone className="w-4 h-4 text-neutral-400" />
                                                            <div className="text-left">
                                                                <span className="text-xs font-semibold block text-neutral-800 dark:text-neutral-200">{d.name}</span>
                                                                <span className="text-[9px] text-neutral-400 block">{d.model} • {d.os_version}</span>
                                                            </div>
                                                        </div>
                                                        <input 
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={() => {
                                                                if (isChecked) {
                                                                    setSelectedTargetIds(prev => prev.filter(id => id !== d.id));
                                                                } else {
                                                                    setSelectedTargetIds(prev => [...prev, d.id]);
                                                                }
                                                            }}
                                                            className="w-3.5 h-3.5 accent-indigo-600 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                    </label>
                                                );
                                            });
                                        })()}
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-neutral-450">
                                        <span>Terpilih: <strong>{selectedTargetIds.length}</strong> perangkat</span>
                                        <button 
                                            type="button"
                                            onClick={() => setSelectedTargetIds(selectedTargetIds.length === devices.length ? [] : devices.map(d => d.id))}
                                            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                                        >
                                            {selectedTargetIds.length === devices.length ? 'Bersihkan Semua' : 'Pilih Semua'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-neutral-50 dark:bg-neutral-950/40 border-t border-neutral-100 dark:border-neutral-850 flex gap-3 justify-end">
                            <button 
                                type="button"
                                onClick={() => setInstallTargetModalOpen(false)}
                                className="px-4 py-2 border border-neutral-250 dark:border-neutral-850 text-neutral-600 dark:text-neutral-400 font-medium rounded-lg text-xs hover:bg-neutral-100 dark:hover:bg-neutral-850 transition-colors"
                            >
                                Batal
                            </button>
                            <button 
                                type="button"
                                onClick={handleExecuteMdmInstall}
                                disabled={selectedTargetIds.length === 0}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-lg text-xs transition-all active:scale-98 shadow-sm"
                            >
                                Mulai Pemasangan ({selectedTargetIds.length})
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* App Details Overlay (App Store Style Card slider) */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black/65 flex justify-end z-[999] backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-white dark:bg-neutral-900 border-l border-neutral-250 dark:border-neutral-800/80 p-8 h-full overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-250">
                        <div className="space-y-6">
                            
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-neutral-400 font-mono tracking-widest uppercase">Pratinjau Aplikasi</span>
                                <button 
                                    onClick={() => setSelectedApp(null)}
                                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full transition-all active:scale-90"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Header details */}
                            <div className="flex gap-5">
                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedApp.icon_data?.bg || 'from-indigo-600 to-indigo-800'} flex items-center justify-center shadow-xl border border-white/5 shrink-0`}>
                                    {getAppIconName(selectedApp.icon_data?.iconName || 'AppWindow')}
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none text-neutral-900 dark:text-white truncate">{selectedApp.name}</h3>
                                    <span className="text-xs text-indigo-600 dark:text-indigo-400 block font-semibold">{selectedApp.developer_name}</span>
                                    <span className="inline-block bg-neutral-150 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-355 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700/50">{selectedApp.category}</span>
                                </div>
                            </div>

                            {/* Actions / Prerequisite checks */}
                            <div className="bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-850 p-4 rounded-xl space-y-3.5 text-xs shadow-xs">
                                <span className="font-semibold block border-b border-neutral-200 dark:border-neutral-800 pb-1.5">Metode Distribusi</span>
                                
                                <div className="space-y-2.5">
                                    <button 
                                        onClick={() => handleInstallClick(selectedApp, 'mdm')}
                                        disabled={installingAppId !== null}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform disabled:opacity-50"
                                    >
                                        <Download className="w-4 h-4" /> Pasang via Server MDM
                                    </button>
                                </div>
                            </div>

                            {/* Apple style spec grid */}
                            <div className="grid grid-cols-4 border-y border-neutral-200 dark:border-neutral-800 py-3.5 text-center text-xs">
                                <div className="space-y-0.5 border-r border-neutral-200 dark:border-neutral-800">
                                    <span className="text-[9px] text-neutral-400 dark:text-neutral-500 uppercase block tracking-wider font-semibold">RATING</span>
                                    <strong className="text-base font-black text-neutral-800 dark:text-neutral-200">4.8 ★</strong>
                                    <span className="text-[9px] text-neutral-400 block font-light">12 Ulasan</span>
                                </div>
                                <div className="space-y-0.5 border-r border-neutral-200 dark:border-neutral-800">
                                    <span className="text-[9px] text-neutral-400 dark:text-neutral-500 uppercase block tracking-wider font-semibold">UMUR</span>
                                    <strong className="text-base font-black text-neutral-800 dark:text-neutral-200">4+</strong>
                                    <span className="text-[9px] text-neutral-400 block font-light">Tahun</span>
                                </div>
                                <div className="space-y-0.5 border-r border-neutral-200 dark:border-neutral-800">
                                    <span className="text-[9px] text-neutral-400 dark:text-neutral-500 uppercase block tracking-wider font-semibold">DEVELOPER</span>
                                    <strong className="text-base font-black text-neutral-800 dark:text-neutral-200">RA</strong>
                                    <span className="text-[9px] text-neutral-400 block font-light truncate px-1">RuangApp</span>
                                </div>
                                <div className="space-y-0.5">
                                    <span className="text-[9px] text-neutral-400 dark:text-neutral-500 uppercase block tracking-wider font-semibold">BAHASA</span>
                                    <strong className="text-base font-black text-neutral-800 dark:text-neutral-200">ID</strong>
                                    <span className="text-[9px] text-neutral-400 block font-light">+1 Lainnya</span>
                                </div>
                            </div>

                            {/* Simulated Screenshots Container */}
                            <div className="space-y-2">
                                <span className="font-semibold text-neutral-500 dark:text-neutral-400 text-xs block">Pratinjau Layar iPad</span>
                                <MockScreenshots bundleId={selectedApp.bundle_id} />
                            </div>

                            {/* App description */}
                            <div className="space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800/40 pt-4">
                                <span className="font-semibold text-neutral-500 dark:text-neutral-400 block">Deskripsi Aplikasi</span>
                                <p className="text-neutral-600 dark:text-neutral-350 font-light leading-relaxed whitespace-pre-line">{selectedApp.description}</p>
                            </div>

                            {/* Version history */}
                            <div className="space-y-2 text-xs border-t border-neutral-200 dark:border-neutral-800/40 pt-4">
                                <span className="font-semibold text-neutral-500 dark:text-neutral-400 block">Riwayat Versi</span>
                                <div className="flex justify-between items-center text-neutral-500 dark:text-neutral-400">
                                    <span>Versi Terbaru</span>
                                    <strong className="text-neutral-800 dark:text-neutral-200 font-mono">v{selectedApp.latest_version}</strong>
                                </div>
                                <div className="flex justify-between items-center text-neutral-500 dark:text-neutral-400 mt-1">
                                    <span>Bundle ID</span>
                                    <span className="text-neutral-800 dark:text-neutral-200 font-mono text-[10px] bg-neutral-100 dark:bg-neutral-950/40 px-1 py-0.5 rounded">{selectedApp.bundle_id}</span>
                                </div>
                            </div>

                        </div>
                        <div className="text-[10px] text-neutral-400 text-center font-mono mt-8 border-t border-neutral-100 dark:border-neutral-850/40 pt-4">
                            RuangApp OS Portal Simulation © 2026
                        </div>
                    </div>
                </div>
            )}

        </AppLayout>
    );
}
