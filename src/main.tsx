import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ExploreRecipesPage from "./pages/ExploreRecipesPage.tsx";
import RecipePage from "./pages/RecipePage.tsx";
import CreateNewRecipePage from "./pages/CreateNewRecipePage.tsx";
import { UserProvider } from "./components/contexts/UserContext.tsx";
import { Toaster } from "react-hot-toast";
import { DashboardPage } from "./pages/DashboardPage.tsx";
import EditRecipePage from "./pages/EditRecipe.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/recipes",
    element: <ExploreRecipesPage />,
  },
  {
    path: "/recipes/:recipeId",
    element: <RecipePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/edit/:recipeId",
    element: <EditRecipePage />,
  },
  {
    path: "/create",
    element: <CreateNewRecipePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster position="top-center" />
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
