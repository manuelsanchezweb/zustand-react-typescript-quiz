import { Container, Stack, Typography, useMediaQuery } from '@mui/material'
import Logo from './Logo'
import Start from './Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './Game'
import { theme } from './constants/constants'

const Quiz = () => {
  const isBiggerThanSM = useMediaQuery(theme.breakpoints.up('sm'))
  const questions = useQuestionsStore((state) => state.questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ my: 4 }}
        >
          <Typography variant={isBiggerThanSM ? 'h2' : 'h5'} component="h1">
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
