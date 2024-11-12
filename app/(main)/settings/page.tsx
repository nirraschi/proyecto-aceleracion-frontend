'use client'

import { useState } from 'react'

export default function Settings() {
  const [teamMembers, setTeamMembers] = useState<string[]>([])
  const [newMember, setNewMember] = useState('')
  const [questions, setQuestions] = useState<string[]>([
    '¿Cuál es tu color favorito?',
    '¿Cuál es tu comida preferida?',
    '¿Cuál es tu película favorita?',
    '¿Qué salió bien en este sprint y debemos seguir haciendo?',
    '¿Qué desafíos enfrentamos y cómo los superamos?',
    '¿Qué fue lo más frustrante de este sprint y cómo podríamos evitarlo en el futuro?',
    '¿Qué aprendimos como equipo durante este sprint?',
    '¿Qué recursos o apoyo nos faltaron y habrían hecho la diferencia?',
    '¿Qué salió bien en este sprint y debemos seguir haciendo?',
    '¿Qué desafíos enfrentamos y cómo los superamos?',
    '¿Qué fue lo más frustrante de este sprint y cómo podríamos evitarlo en el futuro?',
    '¿Qué aprendimos como equipo durante este sprint?',
    '¿Qué recursos o apoyo nos faltaron y habrían hecho la diferencia?',
    
  ])
  const [newQuestion, setNewQuestion] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const addMember = () => {
    if (newMember.trim() !== '') {
      setTeamMembers([...teamMembers, newMember.trim()])
      setNewMember('')
    }
  }

  const removeMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index))
  }

  const addQuestion = () => {
    if (newQuestion.trim() !== '') {
      setQuestions([...questions, newQuestion.trim()])
      setNewQuestion('')
    }
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setNewQuestion(questions[index])
  }

  const saveEdit = () => {
    if (editingIndex !== null && newQuestion.trim() !== '') {
      const updatedQuestions = [...questions]
      updatedQuestions[editingIndex] = newQuestion.trim()
      setQuestions(updatedQuestions)
      setEditingIndex(null)
      setNewQuestion('')
    }
  }

  const saveSettings = () => {
    console.log('Team Members:', teamMembers)
    console.log('Questions:', questions)
    // Aquí puedes implementar la lógica para guardar los ajustes
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Miembros del equipo</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Nombre del miembro"
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addMember}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Agregar miembro
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
            <span>{member}</span>
            <button
              onClick={() => removeMember(index)}
              className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Lista de preguntas</h2>
      <div className="mb-8">
        {questions.map((question, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="text-sm flex-grow ">{question}</span>
            <button
              onClick={() => startEditing(index)}
              className="text-sm px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 mr-2"
            >
              Editar
            </button>
            <button
              onClick={() => removeQuestion(index)}
              className="text-sm px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder={editingIndex !== null ? "Editar pregunta" : "Nueva pregunta"}
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={editingIndex !== null ? saveEdit : addQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {editingIndex !== null ? "Guardar edición" : "Agregar pregunta"}
        </button>
      </div>

      <button
        onClick={saveSettings}
        className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Guardar
      </button>
    </div>
  )
}