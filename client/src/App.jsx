import Home from "./pages/home";
import Login from "./pages/login/index";
import Register from "./pages/register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Router>
        <Routes>
          <Route
            path="/home"
            element={!authUser ? <Navigate to="/login" /> : <Home />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/home" /> : <Register />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
