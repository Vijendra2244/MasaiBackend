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
      console.log(response.data);
       setBlogData(response.data);

    } catch (error) {
      console.error("Error fetching blog data:", error.response);
    }
  };

  useEffect(() => {
    getAllBlogFromApi();
  }, []);

  return (
    <>
      {blogData.map((item,index)=>(
        <div key={index}>

          <h1>{item.blogTitle}</h1>
          <p>{item.blogDescription}</p>
        </div>
))}
    </>
  );
}

export default Dashboard;
