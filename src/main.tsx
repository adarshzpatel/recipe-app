import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/Homepage.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout.tsx'
import Homepage from './pages/Homepage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ExploreRecipesPage from './pages/ExploreRecipesPage.tsx'
import RecipePage from './pages/RecipePage.tsx'
import CreateNewRecipePage from './pages/CreateNewRecipePage.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/recipes",
    element: <ExploreRecipesPage />
  },
  {
    path: "/recipes/:recipeId",
    element: <RecipePage />
  },
  {
    path: "/create",
    element: <CreateNewRecipePage />
  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
