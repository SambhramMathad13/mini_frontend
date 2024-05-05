import React from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import api from '../Utils/Axios';
function ForgotP_recovery() {
  const { uid, token } = useParams();
  const [password1, setpass1] = useState('')
  const [password2, setpass2] = useState('')
  const [load, setload] = useState(false)
  const [msg, setmsg] = useState("")

  async function submit(e) {
    setload(true)
    e.preventDefault();
    if (password1 !== password2) {
      setload(false);
      setmsg("Password mismatch");
    }
    else {
      try {
        const res = await api.post(`api/forgotpasswordrecovery/${uid}/${token}`, { password1, password2 });
        setmsg(res.data.msg)

      } catch (error) {
        setmsg("Invalid url or token expiration")
      } finally {
        setload(false);
      }
    }

  }

  return (load ? (<h1>Loading...</h1>) : (
    <>
      <h1>Password Reset Form</h1>
      <br />
      <br />
      <h3>{msg}</h3>

      <br />
      {msg === "" ? (
        <>
          <form onSubmit={submit}>
            <input
              type="text"
              value={password1}
              onChange={(e) => setpass1(e.target.value)}
              placeholder="Password" required
            />
            <input
              type="text"
              value={password2}
              onChange={(e) => setpass2(e.target.value)}
              placeholder="C_password" required
            />
            <br />
            <button type="submit">Reset</button>
          </form>
          <br />
        </>
      ) : (<> <br />
        <Link to="/login">Login</Link></>)}

    </>)

  )
}

export default ForgotP_recovery