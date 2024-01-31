import { Link } from "react-router-dom";
import AllRoutes from "./Routes/AllRoutes";
import styles from "../src/pages/Login.module.css"

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center", color: "white" }}>Blog application</h1>
      <div className={styles.main}>
 
        <Link className={styles.link} to="/register">Register</Link>
        <Link className={styles.link} to="/login">Login</Link>
        <Link className={styles.link} to="/dashboard">Dashboard</Link>
        <Link className={styles.link} to="/logout">Logout</Link>
      </div>
      <AllRoutes />
    </>
  );
}

export default App;
