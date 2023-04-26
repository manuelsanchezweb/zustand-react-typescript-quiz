import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import Logo from './Logo'
import Start from './Start'

function App() {
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
        <Start />
      </Container>
    </main>
  )
}

export default App
