'use client'

import { useState, useEffect } from 'react'
import DateSelector from '../../components/DateSelector/date-selector'
import { createQuestionStore } from '@/app/store/question-store'
import { useAnswerStore } from '@/app/store/answers-store'

const useQuestionStore = createQuestionStore()

export default function StartPage() {
    const [randomQuestion, setRandomQuestion] = useState<string>('')
    const [answerMem, setAnswerMem] = useState<string>('')
    const [randomName, setRandomName] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<string>('') // Almacenamos la fecha como "YYYY-MM"
    const [errorMessage, setErrorMessage] = useState<string>('') // Estado para el mensaje de error

    const { addAnswer } = useAnswerStore()
    const { questions, teamMembers, fetchQuestions, fetchTeamMembers } = useQuestionStore()

    useEffect(() => {
        fetchQuestions()
        fetchTeamMembers()
    }, [])

    const handleDateChange = (month: string, year: string) => {
        if (month && year) {
            const formattedMonth = String(parseInt(month)).padStart(2, '0') // Asegurarse de que el mes sea de 2 dígitos
            const formattedDate = `${year}-${formattedMonth}` // Crea el formato "YYYY-MM"
            setSelectedDate(formattedDate)
            setErrorMessage('') // Limpia el mensaje de error
        } else {
            setSelectedDate('') // Resetea la fecha si falta información
        }
    }

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
        if (!selectedDate) {
            setErrorMessage('Por favor, selecciona el mes y el año antes de enviar.')
            return
        }

        if (randomQuestion && randomName && answerMem) {
            const answer = {
                question: randomQuestion,
                answer: answerMem,
                member: randomName,
                date: selectedDate,
            }

            addAnswer(answer)
                .then(() => {
                    setAnswerMem('')
                    setRandomQuestion('')
                    setRandomName('')
                    setSelectedDate('')
                    setErrorMessage('') // Limpia el mensaje de error al enviar correctamente
                })
                .catch((error) => {
                    console.error('Error al enviar la respuesta:', error)
                    setErrorMessage('Ocurrió un error al enviar la respuesta. Inténtalo de nuevo.')
                })
        } else {
            setErrorMessage('Por favor, completa todos los campos antes de enviar.')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6">
                <DateSelector onDateChange={handleDateChange} />
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
                value={answerMem}
                onChange={(e) => setAnswerMem(e.target.value)}
                placeholder="Escribe tu respuesta"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />

            <button
                onClick={handleSubmit}
                className="w-full p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
                Enviar respuesta
            </button>

            {errorMessage && (
                <p className="mt-2 text-red-500 text-sm">{errorMessage}</p>
            )}
        </div>
    )
}
