import { create } from 'zustand'
import { Question } from '../types'

interface State {
  questions: Question[]
  currentQuestionIndex: number
  fetchQuestions: (limit: number) => Promise<void>
}

// Aquí tendremos el store con el estado y con todas las formas de actualizar el estado
export const useQuestionsStore = create<State>((set) => {
  return {
    questions: [],
    currentQuestionIndex: 0,

    fetchQuestions: async (limit) => {
      console.log(limit)
      set({
        questions: [
          {
            id: 1,
            question: '¿Cuándo ha sido la última reforma del paseo?',
            hint: 'Ya ha llovido un poco en vdd...',
            answers: ['2021', '2019', '2010', '2020'],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: '¿Cómo se llama el antiguo dueño de la tienda?',
            hint: 'Es un nombre muy común en España',
            answers: ['Taico', 'Juan', 'Ramón', 'Manolo'],
            correctAnswer: 1,
          },
        ],
      })
    },
  }
})
