'use client';

import { useState, useEffect } from 'react';
import DateSelector from '@/app/components/DateSelector/date-selector';
import { useAnswerStore } from '@/app/store/answers-store';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '@/components/ui/table';
import { generatePDF } from '@/app/components/JsPDF/jsPdf';
import { useQuestionStore } from '@/app/store/question-store';


export default function ExportPage() {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { fetchAnswersByDate } = useAnswerStore();
    const questionData = useAnswerStore((state) => state.answers);
    const { generateAiReport } = useQuestionStore();
    const aiReport = useQuestionStore((state) => state.aiReport);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                console.log('Cargando datos iniciales...');
                await fetchAnswersByDate('');
                console.log('Datos iniciales cargados:', questionData);
            } catch (error) {
                console.error('Error al cargar las respuestas iniciales:', error);
                setErrorMessage('No se pudieron cargar las respuestas.');
            }
        };

        loadInitialData();
    }, []);

    useEffect(() => {
        if (questionData && questionData.length > 0) {
            try {
                const questionDataString = JSON.stringify(questionData);
                generateAiReport(questionDataString);
            } catch (error) {
                console.error("Error al convertir questionData a string:", error);
                setErrorMessage('Ocurrió un error al preparar los datos para el reporte AI.');
            }
        }
    }, [questionData]);

    useEffect(() => {
        console.log('aiReport:', aiReport)
    }, [aiReport])



    const handleDateChange = (month: string, year: string) => {
        if (month && year) {
            const formattedDate = `${year}-${month}`;
            setSelectedDate(formattedDate);
            setErrorMessage('');
        } else {
            setSelectedDate('');
            setErrorMessage('Por favor, selecciona un mes y un año válidos.');
        }
    };

    const handleSearch = async () => {
        if (selectedDate) {
            try {
                await fetchAnswersByDate(selectedDate);
                setErrorMessage('');
            } catch (error) {
                console.error('Error al buscar respuestas:', error);
                setErrorMessage('No se pudieron cargar las respuestas para la fecha seleccionada.');
            }
        } else {
            setErrorMessage('Por favor, selecciona una fecha válida.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <p className="text-lg mb-4">Selecciona la fecha de la retrospectiva a exportar:</p>
            <div className="my-6 flex items-center">
                <DateSelector onDateChange={handleDateChange} />
                <button
                    onClick={handleSearch}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Buscar
                </button>
            </div>
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

            {/* Tabla con scroll */}
            <div className="overflow-y-auto mt-6 max-h-[400px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Miembro</TableHead>
                            <TableHead>Pregunta</TableHead>
                            <TableHead>Respuesta</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {questionData.length > 0 ? (
                            questionData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.member}</TableCell>
                                    <TableCell>{item.question}</TableCell>
                                    <TableCell>{item.answer}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>No hay datos disponibles.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Botón para generar y descargar el PDF */}
            <div className="flex w-full justify-center mt-6">
                <button
                    onClick={() => generatePDF(questionData, selectedDate)}
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Descargar PDF
                </button>
            </div>
            {/* Reporte AI: */}
            
            <div>
                <h2 className="text-xl font-bold mb-4">Generar reporte AI</h2>
                <textarea
                    value={aiReport}
                    readOnly
                    className="w-full h-28 p-2 text-sm border-2 rounded-lg border-gray-300 mb-4"
                    placeholder="El reporte generado aparecerá aquí..."
                />
                <button
                    onClick={() => {
                        if (questionData && questionData.length > 0) {
                            try {
                                const questionDataString = JSON.stringify(questionData);
                                generateAiReport(questionDataString);
                            } catch (error) {
                                console.error("Error al generar el reporte AI:", error);
                                setErrorMessage("Ocurrió un error al generar el reporte AI.");
                            }
                        } else {
                            setErrorMessage("No hay datos disponibles para generar el reporte AI.");
                        }
                    }}
                    className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                    Generar Reporte AI
                </button>
                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            </div>

            

        </div>
    );
}
