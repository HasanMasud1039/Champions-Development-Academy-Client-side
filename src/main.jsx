import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './Provider/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className='md:max-w-screen-xl overflow-x-hidden md:mx-auto  dark:bg-black'>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
)
