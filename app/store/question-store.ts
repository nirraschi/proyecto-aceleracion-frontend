import { create } from 'zustand'
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from "@/app/lib/firebase"
import axios from 'axios'

interface Question {
    id: string
    text: string
}

interface TeamMember {
    id: string
    name: string
}

interface QuestionStore {
    questions: Question[]
    teamMembers: TeamMember[]
    fetchQuestions: () => Promise<void>
    fetchTeamMembers: () => Promise<void>
    addQuestion: (text: string) => Promise<void>
    updateQuestion: (id: string, text: string) => Promise<void>
    deleteQuestion: (id: string) => Promise<void>
    addTeamMember: (name: string) => Promise<void>
    deleteTeamMember: (id: string) => Promise<void>
}

export const createQuestionStore = () => create<QuestionStore>((set) => ({
    questions: [],
    teamMembers: [],

    fetchQuestions: async () => {
        const response = await axios.get('/api/questions')
        set({ questions: response.data })
    },

    fetchTeamMembers: async () => {
        const response = await axios.get('/api/members')
        set({ teamMembers: response.data })

    },

    addQuestion: async (text: string) => {
        const response = await axios.post('/api/questions', { text })
        set(state => ({
            questions: [...state.questions, response.data]
        }))
    },

    updateQuestion: async (id: string, text: string) => {
        await updateDoc(doc(db, 'questions', id), { text })
        set(state => ({
            questions: state.questions.map(q => q.id === id ? { ...q, text } : q)
        }))
    },

    deleteQuestion: async (id: string) => {
        await deleteDoc(doc(db, 'questions', id))
        set(state => ({
            questions: state.questions.filter(q => q.id !== id)
        }))
    },

    addTeamMember: async (name: string) => {
        const docRef = await addDoc(collection(db, 'teamMembers'), { name })
        const newMember = { id: docRef.id, name }
        set(state => ({ teamMembers: [...state.teamMembers, newMember] }))
    },

    deleteTeamMember: async (id: string) => {
        await deleteDoc(doc(db, 'teamMembers', id))
        set(state => ({
            teamMembers: state.teamMembers.filter(m => m.id !== id)
        }))
    },
}))