import { useEffect, useState } from 'react'
import { useQuestionsData } from './hooks/useQuestionData'
import { Box, Button, Modal, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { getFinalResultByScore } from './utils/utils'
import { useUserStore } from './store/user'

const ModalGame = () => {
  // Handle del modal
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { correct, unanswered } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  const name = useUserStore((state) => state.name)
  const setFinalScore = useUserStore((state) => state.setFinalScore)
  const resultMessage = getFinalResultByScore(correct)

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  useEffect(() => {
    if (unanswered == 0) {
      handleOpen()
      setFinalScore(correct)
    }
  }, [unanswered])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Todo lo bueno llega a su fin, {name}...
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {resultMessage}
        </Typography>

        <div style={{ marginTop: '16px' }}>
          <Button onClick={() => reset()}>Hacer el test de nuevo</Button>
        </div>
      </Box>
    </Modal>
  )
}

export default ModalGame
