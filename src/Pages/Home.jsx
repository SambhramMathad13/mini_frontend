import React from 'react'
import Navbar from "../Components/Navbar"
import { useState, } from 'react';


function Home() {

  const [load, setload] = useState(false)

  return (load ? (<h1>Loading...</h1>) : (
    <>
      <Navbar isauth={true} />

      <br />
      <br />
      <br />
      <br />
      <h1>Welcome to home page you made it...</h1>
      
    </>
  )
  );
}

export default Home