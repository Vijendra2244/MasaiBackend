import React from "react";
import axios from "axios"

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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
