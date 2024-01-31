import React, { useContext, useState } from "react";
import styles from "./EditPortal.module.css";
import ReactDOM from "react-dom";
import { PortalContext } from "./context/PortalContext";
import axios from "axios";

function EditPortal() {
  const [title, setTitle] = useState("");
  const { portal, setPortal } = useContext(PortalContext);
  const modalClose = () => {
    setPortal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "https://impossible-tuna-top-coat.cyclic.app/blogs/update/:${_id}",
        {
          blogTitle: title,
        }
      );
      console.log(`Response updated ${response.data}`);
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.main}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Edit your blog title"
        />
        <button type="submit" className={styles.ok} >
          Ok
        </button>
      </form>
    </div>,
    document.getElementById("root")
  );
}

export default EditPortal;
