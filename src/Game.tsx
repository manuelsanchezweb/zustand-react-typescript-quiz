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

const Question = ({ info }: { info: QuestionType }) => {
  return (
    <Card variant="outlined" sx={{ my: 6, p: 4, textAlign: 'left' }}>
      <Typography variant="h5">{info.question}</Typography>
      <Typography variant="body1">{info.hint}</Typography>

      <List sx={{ my: 4, bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton>
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
