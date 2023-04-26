import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types'

// es mejor dejar esta función fuera porque así solo se renderiza una vez y no una vez por cada pregunta
const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswerIndex, correctAnswerIndex } = info

  // usuario no ha seleccionado ninguna respuesta
  if (userSelectedAnswerIndex == null) return 'transparent'

  // preguntas que no son las seleccionadas por el usuario y que no son la correcta
  if (index !== correctAnswerIndex && index !== userSelectedAnswerIndex)
    return 'transparent'

  // usuario ha seleccionado una respuesta, y es correcta
  if (index === correctAnswerIndex) return 'green'

  // si esta es la seleccion del usuario pero no es la correcta
  if (index === userSelectedAnswerIndex) return 'red'

  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant="outlined" sx={{ my: 6, p: 4, textAlign: 'left' }}>
      <Typography variant="h5">{info.question}</Typography>
      <Typography variant="body1">{info.hint}</Typography>

      <List sx={{ my: 4, bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswerIndex != null}
              sx={{
                bgcolor: getBackgroundColor(info, index),
              }}
              onClick={createHandleClick(index)}
            >
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestionIndex = useQuestionsStore(
    (state) => state.currentQuestionIndex
  )

  const questionInfo = questions[currentQuestionIndex]

  return (
    <div>
      <Question info={questionInfo} />
    </div>
  )
}
