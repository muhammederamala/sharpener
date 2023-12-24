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
import MailReader from "./pages/Mail/MailReader";
import SentPage from "./pages/outbox/SentPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<InboxPage />} />
      <Route path="/mail/:id" element={<MailReader />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/send-mail" element={<SendMailPage />} />
      <Route path="/sent" element={<SentPage />} />
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
