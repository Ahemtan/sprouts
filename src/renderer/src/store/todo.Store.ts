import { create } from 'zustand'
import { todoProps } from '@shared/types'

interface todoTypes {
  todos: todoProps[]
  addTodo: (todo: todoProps) => void
  loadTodos: () => void
}

export const useTodoStore = create<todoTypes>((set) => ({
  todos: [],
  addTodo: (todo) => {
    set((state) => {
      const updatedTodos = [...state.todos, todo]

      window.context.saveNotes(updatedTodos)

      return { todos: updatedTodos }
    })
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
