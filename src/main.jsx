import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { UserProvider } from './contexts/UserContext'
import { PropertyProvider } from './contexts/PropertyContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <PropertyProvider>
        <App />
      </PropertyProvider>
    </UserProvider>
  </React.StrictMode>
)
