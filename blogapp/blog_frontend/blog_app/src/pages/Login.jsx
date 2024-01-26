import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await axios.post(
        "http://localhost:8080/users/login",
        userDetails,
        { withCredentials: true }
      );
      console.log(userData);
      setUserDetails({
        email: "",
        password: "",
      });
      if (userDetails.email && userDetails.password) {
        alert("User login successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Register user</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email</label>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
          value={userDetails.email}
        />
        <label htmlFor="password">Enter your password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          value={userDetails.password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
