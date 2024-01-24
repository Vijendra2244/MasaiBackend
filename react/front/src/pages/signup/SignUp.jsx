import React, { useEffect, useState } from "react";

function SignUp() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const fetchUserDetailsFromAnServer = async (userDetails) => {
    try {
      const userData = await fetch(
        "http://localhost:8080/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
        }
      );
      const res = await userData.json();
      console.log(res);
      //   setUserDetails(res);
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserDetailsFromAnServer(userDetails);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your name</label>
        <input
          type="text"
          name="userName"
          id="userName"
          value={userDetails.userName}
          onChange={handleChange}
        />
        <label htmlFor="email">Enter your email</label>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
          value={userDetails.email}
        />
        <label htmlFor="pass">Enter your password</label>
        <input
          onChange={handleChange}
          type="text"
          name="password"
          id="password"
          value={userDetails.password}
        />
        <input type="submit" value="Register" />
      </form>
    </>
  );
}

export default SignUp;
