import { Button } from '@mui/material'
import { useQuestionsData } from './hooks/useQuestionData'
import { useQuestionsStore } from './store/questions'

import ModalGame from './Modal'

export const Footer = () => {
  // Handle de las respuestas correctas, incorrectas y sin responder
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>Resetear juego</Button>
      </div>

      <ModalGame />
    </footer>
  )
}
