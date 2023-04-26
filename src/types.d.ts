export interface Question {
  id: number
  question: string
  hint: string
  answers: string[]
  correctAnswerIndex: number
  userSelectedAnswerIndex?: number
  isCorrectUserAnswer?: boolean
}
