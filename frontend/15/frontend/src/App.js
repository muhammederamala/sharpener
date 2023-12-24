import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import SignupPage from "./pages/signup/SignUpPage";
import LoginPage from "./pages/Login/LoginPage";
import SendMailPage from "./pages/SendMail/SendMailPage";
import InboxPage from "./pages/inbox/InboxPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<InboxPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/send-mail" element={<SendMailPage />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
