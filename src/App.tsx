import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/register";
import LogIn from "./pages/login";
import PrivateRoutes from "./components/privateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route element={<PrivateRoutes />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
