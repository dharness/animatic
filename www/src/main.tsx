import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Normalize } from 'styled-normalize'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Normalize />
    <App />
  </React.StrictMode>,
)
