import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { QUESTIONS_LIMIT } from './constants/constants'

const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(QUESTIONS_LIMIT)
  }

  return (
    <Button variant="contained" onClick={handleClick}>
      Empezamos
    </Button>
  )
}

export default Start
