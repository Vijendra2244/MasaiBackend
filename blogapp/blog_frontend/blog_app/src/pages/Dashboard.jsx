import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Login.module.css"
import { PortalContext } from "./context/PortalContext";
// import EditPortal from "./EditPortal";

function Dashboard() {
  const [blogData, setBlogData] = useState([]);
  const {portal, setPortal} = useContext(PortalContext)

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

  const modalOpen = ()=>{
    setPortal(true)
  }
  return (
    <>
      {blogData.map((item,index)=>(
        <div className={styles.mainBlog} key={index}>

          <h1 className={styles.blogTitle}>{item.blogTitle}</h1>
          <p className={styles.blogDesc}>{item.blogDescription}</p>
          <button onClick={modalOpen} className={styles.btn}>Edit</button>
          <button  className={styles.btn}>Delete</button>
        </div>
))}
 {/* {portal && <EditPortal/>} */}
    </>
  );
}

export default Dashboard;
