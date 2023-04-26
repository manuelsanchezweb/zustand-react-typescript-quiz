// Get the current URL with the questions
const currentURL = new URL(window.location.href)
currentURL.pathname = 'data.json'
export const DATA_URL = currentURL.toString()

// Set a limit of questionst that will show up
export const QUESTIONS_LIMIT: number = 10
