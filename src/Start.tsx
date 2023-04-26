import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'

const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(2)
  }

  return (
    <Button variant="contained" onClick={handleClick}>
      Empezamos
    </Button>
  )
}

export default Start
