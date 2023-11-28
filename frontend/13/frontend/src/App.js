import React from 'react'

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
