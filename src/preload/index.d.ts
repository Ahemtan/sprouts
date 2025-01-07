import { todoProps } from '@/types/todoTypes'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    // electron: ElectronAPI
    // api: unknown
    context: {
      saveNotes: (todos: todoProps[]) => Promise<string>;
    }
  }
}
