import { create } from 'zustand'
import { type Question } from '../types'
import { DATA_URL } from '../constants/constants'
import confetti from 'canvas-confetti'
import { persist, devtools } from 'zustand/middleware'
// Devtools es una herramienta para ver el estado en el navegador
// We are using Redux Chrome Extension to see the state in the browser
// Adding false + the name of the event, we can see the state in the browser

interface State {
  questions: Question[]
  currentQuestionIndex: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

const loggerMiddleware = (config: any) => (set: any, get: any, api: any) =>
  config(
    (...args: any) => {
      // console.log('  applying', args)
      set(...args)
      // console.log('  new state', get())
    },
    get,
    api
  )

// Aquí tendremos el store con el estado y con todas las formas de actualizar el estado
export const useQuestionsStore = create<State>()(
  persist(
    devtools(
      loggerMiddleware((set: any, get: any) => {
        return {
          questions: [] as Question[],
          currentQuestionIndex: 0,

          fetchQuestions: async (limit: number) => {
            const res = await fetch(DATA_URL)
            const json = await res.json()

            // Aquí podemos hacer el random de las preguntas y poner un max dependiendo del limit
            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit)
            set({ questions }, false, 'FETCH_QUESTIONS')
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

            set({ questions: newQuestions }, false, 'SELECT_ANSWER')
          },

          goNextQuestion: () => {
            const { currentQuestionIndex, questions } = get()
            const nextQuestionIndex = currentQuestionIndex + 1

            if (nextQuestionIndex < questions.length) {
              set(
                { currentQuestionIndex: nextQuestionIndex },
                false,
                'GO TO NEXT QUESTION'
              )
            }
          },

          goPrevQuestion: () => {
            const { currentQuestionIndex } = get()
            const prevQuestionIndex = currentQuestionIndex - 1

            if (prevQuestionIndex >= 0) {
              set(
                { currentQuestionIndex: prevQuestionIndex },
                false,
                'GO TO PREVIOUS QUESTION'
              )
            }
          },

          reset: () => {
            set(
              { currentQuestionIndex: 0, questions: [] },
              false,
              'RESET THE APP'
            )
          },
        }
      }),
      { name: 'questions' }
    ),
    {
      name: 'questions',
    }
  )
)
