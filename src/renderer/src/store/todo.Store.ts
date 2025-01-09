import { create } from 'zustand'
import { todoProps } from '@shared/types'

interface todoTypes {
  todos: todoProps[]
  addTodo: (title: string, status: string) => void
  loadTodos: () => void
}

export const useTodoStore = create<todoTypes>((set) => ({
  todos: [],
  addTodo: async (title, status) => {
    try {
      await window.context.saveNotes(title, status)

      const updatedTodos: todoProps[] = await window.context.loadNotes()

      set({ todos: updatedTodos })

    } catch (error) {
      console.log(error)
    }
  },

  loadTodos: async () => {
    try {
      const todos: todoProps[] = await window.context.loadNotes()

      set({ todos })
    } catch (error) {
      throw error
    }
  }
}))
