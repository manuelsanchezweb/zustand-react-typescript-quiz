import { Container, Stack, Typography } from '@mui/material'
import Logo from './Logo'
import Start from './Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './Game'

const Quiz = () => {
  const questions = useQuestionsStore((state) => state.questions)
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" component="h1">
            Melicena Quiz
          </Typography>

          <Logo />
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default Quiz
