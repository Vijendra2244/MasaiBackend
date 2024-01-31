import React from "react";
import axios from "axios"
import styles from "./Login.module.css"

function Logout() {
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const userData = await axios.post(
        "https://impossible-tuna-top-coat.cyclic.app/users/logout",
        { withCredentials: true }
      );
      console.log(userData);
    } catch (error) {
      console.log(error);

    }
  };
  return (
    <div>
      <button className={styles.btn} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
