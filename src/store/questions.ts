import { create } from 'zustand'
import { type Question } from '../types'
import { DATA_URL } from '../constants/constants'
import confetti from 'canvas-confetti'

interface State {
  questions: Question[]
  currentQuestionIndex: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
}

// Aquí tendremos el store con el estado y con todas las formas de actualizar el estado
export const useQuestionsStore = create<State>((set, get) => {
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

    selectAnswer: (questionId: number, answerIndex: number) => {
      // usamos el get para acceder al estado
      // const questions = get().questions
      const { questions } = get()

      // usar el structure clone para clonar de formar profunda y solo cambiar la que necesites
      const newQuestions = structuredClone(questions)
      // const newQuestions = [...questions] // esto es superficial

      // encontramos el index de la pregunta
      const questionIndex = newQuestions.findIndex(
        (q: Question) => q.id === questionId
      )

      // obtenemos toda la info de la pregunta
      const questionInfo = newQuestions[questionIndex]

      const isCorrectUserAnswer =
        questionInfo.correctAnswerIndex === answerIndex
      if (isCorrectUserAnswer) confetti()

      // actualizar el estado
      newQuestions[questionIndex] = {
        ...questionInfo,
        userSelectedAnswerIndex: answerIndex,
        isCorrectUserAnswer,
      }

      set({ questions: newQuestions })
    },
  }
})
