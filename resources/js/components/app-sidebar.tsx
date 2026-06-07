import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Smartphone, User, Terminal, Sliders, TrendingUp, History } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Today',
        url: '/dashboard?tab=today',
        icon: TrendingUp,
    },
    {
        title: 'Apps',
        url: '/dashboard?tab=apps',
        icon: LayoutGrid,
    },
    {
        title: 'My iPads',
        url: '/dashboard?tab=devices',
        icon: Smartphone,
    },
    {
        title: 'Log Aktivitas',
        url: '/dashboard?tab=activity-logs',
        icon: History,
    },
    {
        title: 'Dev Logs',
        url: '/dashboard?tab=logs',
        icon: Terminal,
    },
    {
        title: 'Admin Controls',
        url: '/dashboard?tab=simulator',
        icon: Sliders,
    },
];


const footerNavItems: NavItem[] = [
    {
        title: 'Apple Business Manager',
        url: 'https://business.apple.com',
        icon: BookOpen,
    },
    {
        title: 'Mosyle MDM Console',
        url: 'https://manager.mosyle.com',
        icon: Sliders,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
