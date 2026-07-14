import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/./components/theme-provider'

const BASENAME = (import.meta.env.VITE_FRONTEND_BASE_PATH || '/').replace(/\/+$/, '');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <BrowserRouter basename={BASENAME}>
          <Toaster position="top-center" reverseOrder={false} />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
