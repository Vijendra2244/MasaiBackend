import { Link } from "react-router-dom";
import AllRoutes from "./Routes/AllRoutes";

function App() {
  return (
    <>
      <h1 style={{ "textAlign": "center" }}>Blog application</h1>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/logout">Logout</Link>
      <AllRoutes />
    </>
  );
}

export default App;
