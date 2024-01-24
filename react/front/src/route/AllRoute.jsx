import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/signup/Signup";
import Home from "../pages/signup/Home";

function AllRoute() {
  return (
    <>
      <Routes>
        <Route path="/users/register" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default AllRoute;
