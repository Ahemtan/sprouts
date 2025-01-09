import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Context bridge is not available in this process')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    saveNotes: async (title: string, status: string): Promise<string> => {
      return ipcRenderer.invoke('saveNotes', { title, status })
    },
    loadNotes: async (): Promise<string> => {
      return ipcRenderer.invoke('loadNotes')
    }
  })
} catch (error) {
  console.error('Failed to expose API:', error)
}