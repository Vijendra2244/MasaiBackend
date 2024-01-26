import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [blogData, setBlogData] = useState([]);

  const getAllBlogFromApi = async () => {
    try {
      const response = await axios.get(
        `https://impossible-tuna-top-coat.cyclic.app/blogs/`,
        { withCredentials: true }
      );
      console.log(response.data.data);
      setBlogData(response);

    } catch (error) {
      console.error("Error fetching blog data:", error.response);
    }
  };

  useEffect(() => {
    getAllBlogFromApi();
  }, []);

  return (
    <>
      {blogData.map((item) => (
        <div key={item.id}>
          <li>{item.blogTitle}</li>
          <p>{item.blogDescription}</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ))}
    </>
  );
}

export default Dashboard;
