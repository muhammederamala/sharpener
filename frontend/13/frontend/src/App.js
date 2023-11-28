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
import Layout from './UI/Layout';
import Profile from './pages/Profile';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />} >
        <Route path='/' element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={<Profile/>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
