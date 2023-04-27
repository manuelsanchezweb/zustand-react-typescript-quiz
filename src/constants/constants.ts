import { createTheme } from '@mui/material'

// Get the current URL with the questions
const currentURL = new URL(window.location.href)
currentURL.pathname = 'data.json'
export const DATA_URL = currentURL.toString()

// Set a limit of questionst that will show up
export const QUESTIONS_LIMIT: number = 10

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})
