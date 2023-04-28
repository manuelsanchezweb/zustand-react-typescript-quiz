import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface UserState {
  id: string
  name: string
  finalScore: number
  getUser: (name: string) => void
  setUserName: (name: string) => void
  setUserId: (name: string) => void
  setFinalScore: (score: number) => void
}

export const useUserStore = create<UserState>()(
  persist(
    devtools(
      (set, get) => {
        return {
          id: '',
          name: '',
          finalScore: 0,
          getUser: () => {
            const { name } = get()
            return name // Not used yet
          },
          setUserName: (name: string) => {
            // For the moment in local storage
            set((state) => ({ ...state, name }), false, 'SET_USER')
          },
          setUserId: (id: string) => {
            set((state) => ({ ...state, id }), false, 'SET_ID')
          },
          setFinalScore: (score: number) => {
            set(
              (state) => ({ ...state, finalScore: score }),
              false,
              'SET_FINAL_SCORE'
            )
          },
        }
      },
      { name: 'user' }
    ),
    {
      name: 'user',
    }
  )
)
