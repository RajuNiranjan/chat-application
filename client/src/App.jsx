import Home from "./pages/home";
import Login from "./pages/login/index";
import Register from "./pages/register";

const App = () => {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {/* <Login />
      <Register /> */}
      <Home />
    </div>
  );
};

export default App;
