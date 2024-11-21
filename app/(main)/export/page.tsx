'use client';

import { useState, useEffect } from 'react';
import DateSelector from '@/app/components/DateSelector/date-selector';
import { useAnswerStore } from '@/app/store/answers-store';

export default function ExportPage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { fetchAnswersByDate } = useAnswerStore();
    const questionData = useAnswerStore((state) => state.answers);

    // Cargar datos iniciales al montar la página
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                console.log('Cargando datos iniciales...');
                // Si no hay fecha seleccionada, trae todos los datos
                await fetchAnswersByDate('');
                console.log('Datos iniciales cargados:', questionData);
            } catch (error) {
                console.error('Error al cargar las respuestas iniciales:', error);
                setErrorMessage('No se pudieron cargar las respuestas.');
            }
        };

        loadInitialData();
    }, []); // Este efecto se ejecuta solo una vez, al montar la página

    // Manejar cambios de fecha
    const handleDateChange = (month: string, year: string) => {
        if (month && year) {
            const formattedDate = `${year}-${month}`;
            console.log('Fecha seleccionada:', formattedDate); // Verificar formato
            setSelectedDate(formattedDate);
            setErrorMessage('');
        } else {
            setSelectedDate('');
            setErrorMessage('Por favor, selecciona un mes y un año válidos.');
        }
    };

    // Buscar respuestas al hacer clic en el botón "Buscar"
    const handleSearch = async () => {
        if (selectedDate) {
            console.log('Consultando datos para la fecha:', selectedDate);
            try {
                await fetchAnswersByDate(selectedDate);
                console.log('Datos recibidos:', questionData); // Verificar estructura
                setErrorMessage('');
            } catch (error) {
                console.error('Error al buscar respuestas:', error);
                setErrorMessage('No se pudieron cargar las respuestas para la fecha seleccionada.');
            }
        } else {
            setErrorMessage('Por favor, selecciona una fecha válida.');
        }
    };

    // Calcular total de páginas y datos actuales
    const totalPages = Math.ceil(questionData.length / itemsPerPage);
    const currentData = questionData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            {/* Selector de fecha */}
            <div className="mb-6 flex items-center">
                <DateSelector onDateChange={handleDateChange} />
                <button
                    onClick={handleSearch}
                    className="ml-4 p-2 bg-blue-500 text-white rounded"
                >
                    Buscar
                </button>
            </div>
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

            {/* Tabla compacta para las preguntas y respuestas */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border">Miembro</th>
                            <th className="px-4 py-2 border">Pregunta</th>
                            <th className="px-4 py-2 border">Respuesta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100 text-gray-700">
                                    <td className="px-4 py-2 border text-gray-700">{item.member}</td>
                                    <td className="px-4 py-2 border text-gray-700">{item.question}</td>
                                    <td className="px-4 py-2 border text-gray-700">{item.answer}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-4 py-2 text-center text-gray-500"
                                >
                                    No hay datos disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Anterior
                </button>
                <span className="text-gray-700">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Siguiente
                </button>
            </div>

            {/* Botón de exportar a PDF */}
            <div className="flex w-full justify-center">
                <button
                    className="mt-4 p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    Exportar a PDF
                </button>
            </div>
        </div>
    );
}
