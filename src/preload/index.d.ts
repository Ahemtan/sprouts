import { todoProps } from '@/types/todoTypes'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    context: {
      saveNotes: (title: string, status: string) => Promise<void>;
      loadNotes: () => Promise<todoProps[]>;
      deleteNotes: (id: string) => Promise<void>;
    }
  }
}
