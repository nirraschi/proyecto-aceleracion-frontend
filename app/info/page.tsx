'use client'

import Link from 'next/link'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-500 text-white p-4">
                <h1 className="text-2xl font-bold">LookBack</h1>
            </header>

            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Conoce a Nuestro Equipo</h2>
                
                <p className="mb-4 text-gray-700">
                    LookBack nace de la visión de dos desarrolladoras apasionadas por mejorar los procesos ágiles y crear herramientas que fomenten la colaboración efectiva en equipos de desarrollo.
                </p>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Nuestras Desarrolladoras:</h3>
                    <div className="space-y-4 text-gray-700">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold">Nirvana Raschi</h4>
                            <p className="text-sm">Backend Developer & Scrum Master</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold">Yazmín Barrientos</h4>
                            <p className="text-sm">Frontend Developer & UX Designer</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Nuestros Objetivos:</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        <li className="pl-2">Facilitar retrospectivas más efectivas y significativas</li>
                        <li className="pl-2">Promover la comunicación abierta en equipos</li>
                        <li className="pl-2">Impulsar la mejora continua a través de la reflexión</li>
                        <li className="pl-2">Crear un espacio seguro para el feedback constructivo</li>
                    </ul>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-blue-500 hover:underline">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    )
}