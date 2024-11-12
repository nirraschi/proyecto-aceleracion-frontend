'use client';

import { useState } from 'react';

type QuestionData = {
    member: string;
    question: string;
    answer: string;
};

export default function ExportPage() {
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    // Datos de ejemplo
    const questionData: QuestionData[] = [
        { member: 'Juan Pérez', question: '¿Cuál fue el mayor desafío este mes?', answer: 'Coordinar el equipo remoto.' },
        { member: 'Ana López', question: '¿Qué aprendiste en este proyecto?', answer: 'Uso de nuevas herramientas.' },
        { member: 'Carlos García', question: '¿Qué mejorarías en el proceso?', answer: 'Mejorar la comunicación.' },
        { member: 'Lucía Torres', question: '¿Qué fue lo más satisfactorio?', answer: 'Ver el proyecto terminado.' },
        { member: 'Pablo Díaz', question: '¿Cómo podrías ser más eficiente?', answer: 'Organizando mejor mi tiempo.' },
        { member: 'Marta García', question: '¿Qué recursos adicionales necesitas?', answer: 'Más documentación.' },
        { member: 'Luis Gómez', question: '¿Cuál fue el mayor desafío técnico?', answer: 'Resolver problemas de compatibilidad.' },
        { member: 'Elena Ruiz', question: '¿Cómo te sientes en el equipo?', answer: 'Muy cómodo y motivado.' },
        { member: 'Sofía Hernández', question: '¿Qué mejorarías en el equipo?', answer: 'La organización de tareas.' },
        { member: 'Diego Fernández', question: '¿Qué aspecto fue el más difícil?', answer: 'Gestionar el tiempo en reuniones.' },
    ];

    // Calcular el total de páginas
    const totalPages = Math.ceil(questionData.length / itemsPerPage);

    // Obtener los datos para la página actual
    const currentData = questionData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold mb-4">Exportar respuestas mes:</h2>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Elegir mes</option>
                    {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month) => (
                        <option key={month} value={month.toLowerCase()}>{month}</option>
                    ))}
                </select>
            </div>

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
                        {currentData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border text-gray-700">{item.member}</td>
                                <td className="px-4 py-2 border text-gray-700">{item.question}</td>
                                <td className="px-4 py-2 border text-gray-700">{item.answer}</td>
                            </tr>
                        ))}
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
                    Siguienteee
                </button>
            </div>
        </div>
    );
}
