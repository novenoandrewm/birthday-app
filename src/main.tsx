/**
 * React application entry point.
 * - Creates the React root and mounts <App /> into the #root element.
 * - Imports global CSS so base layout and overlay styling apply across the entire app.
 */

// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
