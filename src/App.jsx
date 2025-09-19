import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';



export default function App() {

  return (

    <ThemeProvider>
      <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-50'>

        <AppRoutes />

      </div>
    </ThemeProvider>

  )
}


