"use client";
import { usePathname } from 'next/navigation';
import { Iconify } from '../components/iconify';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const navItems = [
        { href: '/start', label: 'Empezar', icon: <Iconify icon="iconoir:star" width={25} className='mr-3'/> },
        { href: '/settings', label: 'Configurar', icon: <Iconify icon="carbon:settings" width={25} className='mr-3'/> },
        { href: '/export', label: 'Exportar',icon: <Iconify icon="material-symbols:file-export-outline" width={25} className='mr-3'/> },
    ];

    const handleLogoutClick = () => {
        setShowLogoutDialog(true);
    };

    const handleLogoutConfirm = () => {
        // Aquí irá la lógica de cierre de sesión
        setShowLogoutDialog(false);
    };

    const handleLogoutCancel = () => {
        setShowLogoutDialog(false);
    };

    return (
            <div className="flex min-h-screen bg-slate-100">
                {/* Sidebar */}
                <aside className="w-64 border-r bg-white">
                    <nav className="flex h-full flex-col gap-4 p-6">
                        <h1 className='text-xl font-semibold mb-4'>LookBack</h1>
                        <div className="space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center px-4 py-2 text-sm rounded  ${
                                        pathname === item.href
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        {/* Botón de Cerrar Sesión */}
                        <button
                            onClick={handleLogoutClick}
                            className="flex items-center px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-100 mt-20"
                        >
                            <Iconify icon="material-symbols:logout" width={25} className='mr-3'/>
                            Cerrar Sesión
                        </button>
                        {/* Espaciador flexible */}
                        <div className="flex-1"></div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="mx-auto max-w-2xl">
                        {children}
                    </div>
                </main>

            {/* Diálogo de confirmación de cierre de sesión */}
            <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                            ¿Está seguro de que quiere cerrar su sesión?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600">
                            Los cambios no guardados se perderán al cerrar la sesión. ¿Desea continuar?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel 
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                            onClick={handleLogoutCancel}
                        >
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={handleLogoutConfirm}
                        >
                            Cerrar Sesión
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}