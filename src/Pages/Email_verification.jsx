import React from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import api from '../Utils/Axios';
import { ThemeProvider } from "@/Components/theme-provider"
import {ModeToggle} from "@/Components/mode-toggle"

function Email_verification() {
  const { uid, token } = useParams();
  const [load, setload] = useState(false)
  const [msg, setmsg] = useState("")

  async function submit(e) {
    setload(true)
    e.preventDefault();


    try {
      const res = await api.get(`api/av/${uid}/${token}`);
      setmsg(res.data.msg)
    } catch (error) {
      setmsg("Invalid url or token expiration")
    } finally {
      setload(false);

    }

  }

  return (load ? (<h1>Loading...</h1>) : (
    <>
     
      <h3>{msg}</h3>

      <br />
      {msg === "" ? (
        <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
          <form onSubmit={submit}>
            <br />
            <button type="submit">Verify</button>
          </form>
          </ThemeProvider>
        </>
      ) : (<> <br />
        <Link to="/login">Login</Link></>)
        }
        
    </>)

  )
}

export default Email_verification