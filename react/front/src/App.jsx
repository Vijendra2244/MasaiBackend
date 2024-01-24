import SignUp from "./pages/signup/Signup";
import { Link } from "react-router-dom";
import AllRoute from "./route/AllRoute";

function App() {
  return (
    <>
      <Link to="/users/register">Register page</Link>
      <Link to="/">home-page</Link>
      <AllRoute />
    </>
  );
}

export default App;
