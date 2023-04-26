import { create } from 'zustand'
import { Question } from '../types'
import { DATA_URL } from '../constants/constants'

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
      const res = await fetch(DATA_URL)
      const json = await res.json()

      // Aquí podemos hacer el random de las preguntas y poner un max dependiendo del limit
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },
  }
})
