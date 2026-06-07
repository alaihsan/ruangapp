import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Smartphone, Shield, Cpu, RefreshCw } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: AuthLayoutProps) {
    const { name } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden font-sans">
            
            {/* Left Column: Premium Interactive Illustration */}
            <div className="relative hidden h-full flex-col p-10 lg:flex justify-between border-r border-neutral-200 dark:border-slate-900 bg-white dark:bg-slate-950 overflow-hidden select-none">
                {/* 1. Light/Dark responsive ambient mesh grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 dark:opacity-30" />
                
                {/* 2. Soft Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/5 dark:bg-indigo-600/10 blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-cyan-500/5 dark:bg-cyan-600/10 blur-[90px]" />

                {/* 3. Branding */}
                <div className="relative z-20 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 p-0.5 flex items-center justify-center shadow-md">
                        <AppLogoIcon className="size-6 text-white dark:text-slate-950 fill-current" />
                    </div>
                    <div>
                        <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:via-indigo-100 dark:to-slate-400 bg-clip-text text-transparent">{name || 'Ruang App iPad'}</span>
                        <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-mono tracking-widest uppercase block -mt-1 font-bold">DISTRIBUTION PORTAL</span>
                    </div>
                </div>

                {/* 4. Centerpiece: Premium CSS iPad Frame & App Mockup */}
                <div className="relative z-20 flex flex-col items-center justify-center grow">
                    {/* Simulated iPad Bezel */}
                    <div className="relative w-[340px] h-[250px] bg-neutral-100 dark:bg-slate-900 rounded-[28px] p-3 border-[6px] border-neutral-150 dark:border-slate-900 ring-1 ring-neutral-250 dark:ring-slate-800 shadow-[0_20px_40px_-15px_rgba(99,102,241,0.1)] dark:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.2)]">
                        {/* Camera Notch */}
                        <div className="absolute top-1/2 left-1.5 -translate-y-1/2 w-1 h-3 bg-neutral-300 dark:bg-slate-950 rounded-full"></div>
                        
                        {/* Screen */}
                        <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-950 border border-neutral-200 dark:border-slate-900 p-4 flex flex-col justify-between overflow-hidden relative shadow-inner">
                            {/* Inner ambient glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-2xl"></div>

                            {/* Status bar */}
                            <div className="flex justify-between items-center text-[7px] text-neutral-400 dark:text-slate-400 font-semibold z-10">
                                <span>17:35</span>
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-slate-500"></span>
                                    <span className="w-2.5 h-1.5 rounded-sm bg-neutral-300 dark:bg-slate-500"></span>
                                </div>
                            </div>

                            {/* Grid preview of installing app */}
                            <div className="flex-1 flex items-center justify-center gap-4 z-10">
                                {/* App Icon mock */}
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md relative overflow-hidden">
                                        <Cpu className="w-5 h-5 text-white animate-pulse" />
                                        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    </div>
                                    <span className="text-[8px] text-neutral-500 dark:text-slate-400 font-medium tracking-tight">Installing...</span>
                                </div>

                                <div className="flex flex-col gap-1 max-w-[140px]">
                                    <span className="font-bold text-xs text-neutral-800 dark:text-white">App Store Sync</span>
                                    <p className="text-[8px] text-neutral-500 dark:text-slate-450 font-light leading-normal">Simulasi pemindaian UDID perangkat dan penandatanganan sertifikat pengembang otomatis.</p>
                                </div>
                            </div>

                            {/* Home Indicator */}
                            <div className="w-16 h-0.5 bg-neutral-200 dark:bg-slate-800 rounded-full mx-auto z-10"></div>
                        </div>
                    </div>
                </div>

                {/* 5. Taglines / Footer Info */}
                <div className="relative z-20 space-y-2">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">Portal Distribusi iPadOS iPad murid</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs font-light max-w-sm leading-relaxed">
                        Kelola dan instal aplikasi iPadOS internal secara aman menggunakan integrasi Apple Developer Program dan simulasi MDM.
                    </p>
                    <div className="flex gap-4 pt-3 border-t border-neutral-200 dark:border-slate-900/60 mt-4 text-[10px] text-neutral-400 dark:text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-indigo-500" /> Ad-Hoc & MDM</span>
                        <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3 text-cyan-500" /> MDM Sync Enabled</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Form Container */}
            <div className="w-full h-full flex items-center justify-center p-8 bg-neutral-50 dark:bg-slate-950">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] bg-white dark:bg-neutral-900/40 p-8 rounded-2xl border border-neutral-200 dark:border-slate-850 shadow-sm dark:shadow-xl backdrop-blur-md relative z-10">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-50 to-cyan-50 p-0.5 flex items-center justify-center">
                            <AppLogoIcon className="h-6 text-white dark:text-slate-950 fill-current" />
                        </div>
                        <span className="text-lg font-bold text-neutral-900 dark:text-white">{name}</span>
                    </Link>
                    <div className="flex flex-col items-start gap-1 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">{title}</h1>
                        <p className="text-neutral-500 dark:text-slate-400 text-xs font-light">{description}</p>
                    </div>
                    {children}
                </div>
            </div>

            
        </div>
    );
}

