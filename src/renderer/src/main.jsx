import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

import App from './App'
import ErrorPage from './error-page'
import AddNewFeeds from './routes/AddNewFeeds'
import HomeFeeds from './routes/HomeFeeds'
import About from './routes/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomeFeeds />
      },
      {
        path: '/add-new-feed',
        element: <AddNewFeeds />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>
)
