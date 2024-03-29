import React, { useState } from "react";
import axios from "axios";
import styles from "./Register.module.css"

function Register() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
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
        "https://impossible-tuna-top-coat.cyclic.app/users/register",
        userDetails,
        { withCredentials: true },
     
      );
      console.log(userData);
      setUserDetails({
        userName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading}>Register user</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label htmlFor="userName">Enter your name</label>
        <input
          onChange={handleChange}
          type="text"
          name="userName"
          id="userName"
          value={userDetails.userName}
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
