import { contextBridge, ipcRenderer } from 'electron'
import { todoProps } from '../main/lib'

if (!process.contextIsolated) {
  throw new Error('Context bridge is not available in this process')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    saveNotes: async (todos: todoProps[]): Promise<string> => {
      return ipcRenderer.invoke('saveNotes', todos)
    }
  })
} catch (error) {
  console.error('Failed to expose API:', error)
}