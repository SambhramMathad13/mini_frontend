import React from 'react'
import { useState } from 'react'
import api from '../Utils/Axios';

function ChangePassword() {
    const [old_password, setpass1] = useState('')
    const [new_password, setpass2] = useState('')
    const [c_password, setpass3] = useState('')
    const [load, setload] = useState(false)
    const [msg, setmsg] = useState("")


  async function submit(e) {
    setload(true)
    console.log(c_password,new_password,old_password)
    e.preventDefault();
    if (new_password !== c_password) {
      setload(false);
      setmsg("Password mismatch");
    }
    else {
      try {
        const res = await api.post(`/api/changepassword`, { old_password, new_password });
        // console.log(res.data)
        setmsg(res.data.msg)

      } catch (error) {
        // console.log(error)
        setmsg("Please enter correct old password")
      } finally {
        setload(false);
      }
    }

  }

  return (load ? (<h1>Loading...</h1>) : (
    <>
      <h1>ChangePassword</h1>
      <br />
      <br />
      <h3>{msg}</h3>

      <br />
      {msg === "" && (
        <>
          <form onSubmit={submit}>
            <input
              type="text"
              value={old_password}
              onChange={(e) => setpass1(e.target.value)}
              placeholder="Old Password" required
            />
            <input
              type="text"
              value={new_password}
              onChange={(e) => setpass2(e.target.value)}
              placeholder="New password" required
            />
            <br />
            <input
              type="text"
              value={c_password}
              onChange={(e) => setpass3(e.target.value)}
              placeholder="C_password" required
            />
            <br />
            <button type="submit">Change</button>
          </form>
          <br />
        </>
      )}

    </>)

  )
}

export default ChangePassword