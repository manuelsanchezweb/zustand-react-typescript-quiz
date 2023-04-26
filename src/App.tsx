import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import Logo from './Logo'
import Start from './Start'
import { useQuestionsStore } from './store/questions'

function App() {
  const questions = useQuestionsStore((state) => state.questions)
  console.log(questions)

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
        {questions.length > 0 && <p>Hay preguntas</p>}
      </Container>
    </main>
  )
}

export default App
