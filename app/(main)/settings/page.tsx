'use client'
//el nuevo codigo agrega scroll y numeracion de preguntas

import { useState, useEffect } from 'react'
import { useQuestionStore } from '@/app/store/question-store'
import { Icon } from '@iconify/react'


export default function Settings() {
  const [newMember, setNewMember] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const {
    questions,
    teamMembers,
    fetchQuestions,
    fetchTeamMembers,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addTeamMember,
    deleteTeamMember
  } = useQuestionStore()

  useEffect(() => {
    fetchTeamMembers()
    fetchQuestions()
  }, [])

  const handleAddMember = async () => {
    if (newMember.trim() !== '') {
      await addTeamMember(newMember.trim())
      setNewMember('')
    }
  }

  const handleAddQuestion = async () => {
    if (newQuestion.trim() !== '') {
      await addQuestion(newQuestion.trim())
      setNewQuestion('')
    }
  }

  const handleStartEditing = (id: string, text: string) => {
    setEditingId(id)
    setNewQuestion(text)
  }

  const handleSaveEdit = async () => {
    if (editingId && newQuestion.trim() !== '') {
      await updateQuestion(editingId, newQuestion.trim())
      setEditingId(null)
      setNewQuestion('')
    }
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
          onClick={handleAddMember}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Agregar miembro
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
            <span>{member.name}</span>
            <button
              onClick={() => deleteTeamMember(member.id)}
              className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Lista de preguntas</h2>
      <div className="mb-8 border border-gray-300 rounded-md p-3 max-h-64 overflow-y-scroll">
        {questions.map((question, index) => (
          <div key={question.id} className="flex items-center mb-2">
            {/* numero de pregunta */}
            <span className="text-sm font-bold mr-2">{index + 1}.</span>
            {/* texto de pregunta */}
            <span className="text-sm flex-grow">{question.text}</span>
            {/* botones editar y borrar */}
            <button
              onClick={() => handleStartEditing(question.id, question.text)}
              className="text-sm px-2 py-1 text-white"
            >
              <Icon icon="mdi:pencil" className="text-slate-800 text-lg hover:text-yellow-600" />
            </button>
            <button
              onClick={() => deleteQuestion(question.id)}
              className="text-sm px-2 py-1  text-slate-800 rounded-sm hover:text-red-700 "
            >
              <Icon icon="mdi:delete" className="text-slate-800 text-lg hover:text-red-700" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder={editingId !== null ? "Editar pregunta" : "Nueva pregunta"}
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={editingId !== null ? handleSaveEdit : handleAddQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {editingId !== null ? "Guardar edición" : "Agregar pregunta"}
        </button>
      </div>
    </div>
  )
}