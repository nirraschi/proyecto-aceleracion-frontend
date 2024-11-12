"use client";
import { usePathname } from 'next/navigation';
import { Iconify } from '../components/iconify';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: '/start', label: 'Empezar', icon: <Iconify icon="iconoir:star" width={25} className='mr-3'/> },
        { href: '/settings', label: 'Configurar', icon: <Iconify icon="carbon:settings" width={25} className='mr-3'/> },
        { href: '/export', label: 'Exportar',icon: <Iconify icon="material-symbols:file-export-outline" width={25} className='mr-3'/> },
    ];

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-white">
                <nav className="flex h-full flex-col gap-4 p-6">
                    <h1 className='text-xl font-semibold mb-4'>LookBack</h1>
                    <div className="flex-1 space-y-4 ">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`flex items-center px-4 py-2 text-sm rounded-md  ${
                                    pathname === item.href
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {item.icon} {/* Ícono agregado antes del texto */}
                                {item.label}
                            </a>
                        ))}
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="mx-auto max-w-2xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
