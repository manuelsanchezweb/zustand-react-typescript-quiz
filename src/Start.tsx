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
import { useRef, useState } from 'react'

const Start = ({ data }: { data: any }) => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)
  // const name = useUserStore((state) => state.name)
  const setUserName = useUserStore((state) => state.setUserName)
  const setUserId = useUserStore((state) => state.setUserId)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const [isDisabled, setIsDisabled] = useState(true)

  const handleClick = () => {
    setUserId(crypto.randomUUID())

    if (nameRef.current?.querySelector('input')) {
      const name = nameRef.current.querySelector('input')?.value
      if (name) setUserName(name)
    } else {
      setUserName('Anónimo')
    }

    fetchQuestions(QUESTIONS_LIMIT)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value

    // Check if the name exists in the database
    const nameExists = data.some(
      (item: { id: number; name: string; score: number }) => item.name === name
    )
    if (nameExists) {
      setErrorMessage('Este nombre ya está pillado, así que mejor busca otro.')
      setIsDisabled(true)
    } else {
      setErrorMessage(null)
      if (name?.length > 3) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }
  }

  return (
    <>
      <Typography variant="body1" sx={{ marginBottom: 6 }}>
        ¡Demuestra tus conocimientos meliceneros en este divertido test! Te lo
        advierto: aquí se demuestra quién ha pasado un par de días en el pueblo
        y quién ha pasado toda su vida ahí.
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 'fit-content', mx: 'auto' }}>
        <FormControl error={!!errorMessage}>
          <InputLabel htmlFor="name">Introduce tu nombre aquí</InputLabel>
          <Input
            ref={nameRef}
            id="name"
            placeholder="Patricio Pozo Pérez"
            aria-describedby="texto-ayuda"
            onChange={handleNameChange}
          />
          <FormHelperText id="texto-ayuda">
            {errorMessage ||
              'Ya sabes que a los de Melicena nos gusta dar un trato personal.'}
          </FormHelperText>
        </FormControl>
        <Button onClick={handleClick} disabled={isDisabled} variant="contained">
          Empezamos
        </Button>
      </Stack>
    </>
  )
}

export default Start
