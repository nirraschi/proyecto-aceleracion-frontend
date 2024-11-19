'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createQuestionStore } from '@/app/store/question-store'

const useQuestionStore = createQuestionStore()

export default function StartPage() {
    const [selectedMonth, setSelectedMonth] = useState<string>('')
    const [randomQuestion, setRandomQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [randomName, setRandomName] = useState<string>('')


    const { questions, teamMembers, fetchQuestions, fetchTeamMembers } = useQuestionStore()

    useEffect(() => {
        fetchQuestions()
        fetchTeamMembers()
    }, [])

// agregar componente que permita seleccionar mes y año
// logica para guardar respuesta +  pregunta +  date + member

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

    const generateRandomQuestion = () => {
        if (questions.length > 0 && teamMembers.length > 0) {
            const randomQuestionIndex = Math.floor(Math.random() * questions.length)
            const randomTeamMemberIndex = Math.floor(Math.random() * teamMembers.length)
            setRandomQuestion(questions[randomQuestionIndex].text)
            setRandomName(teamMembers[randomTeamMemberIndex].name)
        } else {
            setRandomQuestion('No hay preguntas o miembros del equipo disponibles.')
            setRandomName('')
        }
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

        <p>date picker</p>
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