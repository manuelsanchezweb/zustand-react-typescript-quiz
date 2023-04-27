import { Button, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { QUESTIONS_LIMIT } from './constants/constants'

const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(QUESTIONS_LIMIT)
  }

  return (
    <>
      <Typography variant="body1" sx={{ marginBottom: 6 }}>
        ¡Demuestra tus conocimientos meliceneros en este divertido test! Te lo
        advierto, aquí se demuestra quién ha pasado aquí un par de días y quién
        ha pasado aquí toda su vida.
      </Typography>
      <Button variant="contained" onClick={handleClick}>
        Empezamos
      </Button>
    </>
  )
}

export default Start
