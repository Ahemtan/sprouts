import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/128x128.png?asset'
import { addTodo, deleteTodo, editTodo, loadTodos } from './lib'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'resources/icon.ico'), // Icon path
    width: 900,
    height: 670,
    show: false, // Prevent window from showing immediately
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // Preload script path
      sandbox: false,
      contextIsolation: true // Enable context isolation for security
    },
  })

  // Show window once ready
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // Open external links in the default browser
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' } // Deny internal link navigation
  })

  // Load appropriate URL based on environment (dev or prod)
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron is ready
app.whenReady().then(() => {
  // Set the app user model ID for Windows
  electronApp.setAppUserModelId('com.electron')

  // Enable window shortcuts
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Handle 'ping' IPC test
  ipcMain.on('ping', () => {
    console.log('pong') // Logging the 'pong' message in the console
  })

  ipcMain.handle('saveNotes', async (_, args) => {

    const { title, status} = args;
    
    try {
      await addTodo(title, status)
      return 'Successfully saved todos!'
    } catch (error) {
      console.log(error)
      return 'Failed to save todos~'
    }
  })

  ipcMain.handle('loadNotes', (_) => {
    const todos = loadTodos()
    return todos
  })

  ipcMain.handle('deleteNotes', async (_, id) => {
    try {
      await deleteTodo(id)
      return 'Successfully deleted todo!'
    } catch (error) {
      console.log(error)
      return 'Failed to delete todo~'
    }
  })

  ipcMain.handle('editNotes', async (_, args) => {
    const { id, title, status } = args;
    try {
      await editTodo(id, title, status)
      return 'Successfully edited todo!'
    } catch (error) {
      console.log(error)
      return 'Failed to edit todo~'
    }
  })

  // Create the main window
  createWindow()

  // Handle app activation on macOS
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit app when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
