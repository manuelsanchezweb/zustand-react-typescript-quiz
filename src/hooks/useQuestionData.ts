import { useQuestionsStore } from '../store/questions'

export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach((question) => {
    const { userSelectedAnswerIndex, correctAnswerIndex } = question
    if (userSelectedAnswerIndex == null) unanswered++
    else if (userSelectedAnswerIndex === correctAnswerIndex) correct++
    else incorrect++
  })

  unanswered = questions.length - correct - incorrect

  return { correct, incorrect, unanswered }
}
