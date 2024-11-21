import { create } from 'zustand'
import axios from 'axios'

interface Answer {
    question: string,
    answer: string,
    member: string,
    date: string,
}

interface AnswerStore {
    answers: Answer[]
    addAnswer: (answer: Answer) => Promise<void>
    setAnswers: (answers: Answer[]) => void // Nueva función para establecer las respuestas desde la API
    fetchAnswersByDate: (date: string) => Promise<void> // Actualizada para hacer la consulta a la API
}

export const useAnswerStore = create<AnswerStore>((set, get) => ({
    answers: [],
    
    addAnswer: async (answer: Answer) => {
        try {
            await axios.post('/api/answers', answer);
            // Vuelve a consultar al backend para obtener las respuestas actualizadas
            const response = await axios.get('/api/answers', { params: { date: answer.date.slice(0, 7) } });
            const updatedAnswers = response.data;
            set({ answers: updatedAnswers });
        } catch (error) {
            console.error('Error al agregar la respuesta:', error);
        }
    },

    setAnswers: (answers: Answer[]) => {
        set({ answers });
    },

    fetchAnswersByDate: async (date: string) => {
        try {
            const response = await axios.get('/api/answers', { params: { date } });
            const answers = response.data; // Respuesta de la API
            get().setAnswers(answers); // Actualizar el estado con los datos obtenidos
        } catch (error) {
            console.error('Error al obtener las respuestas:', error);
            throw new Error('Error al obtener las respuestas');
        }
    }
}));
