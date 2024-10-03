import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/home/index";
import LogIn from "./pages/login/index";
import Register from "./pages/register/index";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { fetchUser, authSuccess } from "./redux/reducers/auth.reducer";
import { AppDispatch, RootState } from "./redux/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(authSuccess(token));
      dispatch(fetchUser(storedToken));
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <LogIn /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
