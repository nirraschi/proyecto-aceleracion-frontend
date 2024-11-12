'use client'

import { useState } from 'react'

export default function StartPage() {
    const [selectedMonth, setSelectedMonth] = useState<string>('')
    const [randomQuestion, setRandomQuestion] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [randomName, setRandomName] = useState<string>('')

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

    const generateRandomQuestion = () => {
        const questions = [
            '¿Qué salió bien en este sprint y debemos seguir haciendo?',
            '¿Qué desafíos enfrentamos y cómo los superamos?',
            '¿Qué fue lo más frustrante de este sprint y cómo podríamos evitarlo en el futuro?',
            '¿Qué aprendimos como equipo durante este sprint?',
            '¿Qué recursos o apoyo nos faltaron y habrían hecho la diferencia?'
        ]
        const randomIndex = Math.floor(Math.random() * questions.length)
        setRandomQuestion(questions[randomIndex])
        generateRandomName()
    }

    const generateRandomName = () => {
        const names = ['Ana', 'Juan', 'María', 'Carlos', 'Laura', 'Pedro', 'Sofía', 'Miguel']
        const randomIndex = Math.floor(Math.random() * names.length)
        setRandomName(names[randomIndex])
    }

    const handleSubmit = () => {
        console.log('Mes seleccionado:', selectedMonth)
        console.log('Pregunta:', randomQuestion)
        console.log('Nombre:', randomName)
        console.log('Respuesta:', answer)
        // Aquí puedes agregar la lógica para enviar la respuesta
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Ver Historial
                </button>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Elegir mes</option>
                    {months.map((month) => (
                        <option key={month} value={month.toLowerCase()}>{month}</option>
                    ))}
                </select>
            </div>

            <button
                onClick={generateRandomQuestion}
                className="w-full p-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Generar pregunta aleatoria
            </button>

            <textarea
                value={randomQuestion}
                readOnly
                placeholder="La pregunta aparecerá aquí"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />

            <p className="mb-2">Nombre: <span className="font-bold">{randomName}</span></p>

            <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Escribe tu respuesta"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />

            <button
                onClick={handleSubmit}
                className="w-full p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
                Enviar respuesta
            </button>
        </div>
    )
}