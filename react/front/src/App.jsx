import { useState,useEffect } from 'react'
import './App.css'

function App() {
  
 const [arr,setArr] = useState([])
  useEffect(() => {
    fetch("http://localhost:8080/")
    .then((res)=>res.json())
    .then((data)=>setArr(data))
    .catch((err)=>console.log(err))
  })
  
  return (
    <>
      {
        arr.map((item)=>(
          <p>{item}</p>
        ))
      }
    </>
  )
}

export default App
