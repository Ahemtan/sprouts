import { create } from 'zustand'
import { todoProps } from '@shared/types'

interface todoTypes {
  todos: todoProps[]
  addTodo: (title: string, status: string) => void
  loadTodos: () => void
  deleteTodos: (id: string) => void
  editTodos: (id: string, title: string, status: string) => void
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
  },
  deleteTodos: async (id) => {
    try {
      await window.context.deleteNotes(id)
    } catch (error) {
      console.log(error)
    }
  },

  editTodos: async (id, title, status) => {
    try {
      await window.context.editNotes(id, title, status)

      const todos: todoProps[] = await window.context.loadNotes()
      set({ todos })
    } catch (error) {
      console.log(error)
    }
  },
}))
