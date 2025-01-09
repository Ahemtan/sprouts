import { writeFileSync, readFileSync } from 'fs'
import { homedir } from 'os'
import path from 'path'
import { ensureFile } from 'fs-extra'
import { todoProps } from '@shared/types'

const todosFilePath = path.join(homedir(), '/sprouts/todo/todos.json')

// Function to ensure the todos file exists
const ensureTodosFile = async (): Promise<void> => {
  try {
    await ensureFile(todosFilePath)
  } catch (error) {
    console.error('Error ensuring file exists:', error)
    throw error
  }
}

// Function to load todos from the file
export const loadTodosFromFile = async (): Promise<todoProps[]> => {
  await ensureTodosFile() // Ensure the file exists

  try {
    const data = readFileSync(todosFilePath, 'utf-8')

    if (data) {
      return JSON.parse(data) as todoProps[]
    }

    return []
  } catch (error) {
    console.error('Failed to read or parse todos file:', error)
    throw error
  }
}

// Function to save todos to the file
export const saveTodosToFile = async (todos: todoProps[]): Promise<void> => {
  try {
    const todosJson = JSON.stringify(todos, null, 2)
    await ensureTodosFile()

    writeFileSync(todosFilePath, todosJson)
  } catch (error) {
    console.error('Failed to save todos to file:', error)
    throw error
  }
}

// Function to add a new todo to the todos file
export const addTodo = async (title: string, status: string): Promise<todoProps[]> => {
  try {
    const todos = await loadTodosFromFile()

    const newTodo: todoProps = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      status,
      date: new Date().toISOString()
    }

    todos.push(newTodo)

    await saveTodosToFile(todos)

    return todos
  } catch (error) {
    console.error('Failed to add todo:', error)
    throw error
  }
}

// Function to edit a todo
export const editTodo = async (
  id: string,
  updatedTitle: string,
  updatedStatus: string
): Promise<todoProps[]> => {
  try {
    const todos = await loadTodosFromFile()

    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex === -1) {
      throw new Error('Todo not found')
    }

    todos[todoIndex].title = updatedTitle
    todos[todoIndex].status = updatedStatus

    await saveTodosToFile(todos)

    return todos
  } catch (error) {
    console.error('Failed to edit todo:', error)
    throw error
  }
}

// Function to delete a todo
export const deleteTodo = async (id: string): Promise<todoProps[]> => {
  try {
    const todos = await loadTodosFromFile()
    const updatedTodos = todos.filter((todo) => todo.id !== id)

    if (updatedTodos.length === todos.length) {
      throw new Error('Todo not found')
    }

    await saveTodosToFile(updatedTodos)

    return updatedTodos
  } catch (error) {
    console.error('Failed to delete todo:', error)
    throw error
  }
}

export const loadTodos = async (): Promise<todoProps[]> => {
  try {
    return await loadTodosFromFile()
  } catch (error) {
    console.error('Failed to load todos:', error)
    throw error
  }
}
