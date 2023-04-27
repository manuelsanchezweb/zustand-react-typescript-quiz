import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { QUESTIONS_LIMIT } from './constants/constants'
import { useUserStore } from './store/user'

const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)
  const name = useUserStore((state) => state.name)
  const setUserName = useUserStore((state) => state.setUserName)
  const setUserId = useUserStore((state) => state.setUserId)

  // const handleStartGame = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   fetchQuestions(QUESTIONS_LIMIT)
  // }

  const handleClick = () => {
    fetchQuestions(QUESTIONS_LIMIT)
    setUserId(crypto.randomUUID())
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    setUserName(name)
  }

  return (
    <>
      <Typography variant="body1" sx={{ marginBottom: 6 }}>
        ¡Demuestra tus conocimientos meliceneros en este divertido test! Te lo
        advierto, aquí se demuestra quién ha pasado aquí un par de días y quién
        ha pasado aquí toda su vida.
      </Typography>
      {/* <form onSubmit={handleStartGame}> */}
      <Stack spacing={2} sx={{ maxWidth: 'fit-content', mx: 'auto' }}>
        <FormControl>
          <InputLabel htmlFor="name">Introduce tu nombre aquí</InputLabel>
          <Input
            id="name"
            placeholder="Patricio Pozo Pérez"
            aria-describedby="texto-ayuda"
            onChange={handleNameChange}
          />
          <FormHelperText id="texto-ayuda">
            Nos gusta darte un trato personal.
          </FormHelperText>
        </FormControl>
        <Button
          onClick={handleClick}
          disabled={name.length < 3}
          variant="contained"
        >
          Empezamos
        </Button>
      </Stack>
      {/* </form> */}
    </>
  )
}

export default Start
