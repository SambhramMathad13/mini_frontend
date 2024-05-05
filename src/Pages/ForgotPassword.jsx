import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../Utils/Axios'
function ForgotPassword() {
    const [email, setemail] = useState("")
    const [load, setload] = useState(false)
    const [msg, setmsg] = useState("")
    async function submit(e) {
        setload(true)
        e.preventDefault();
        try {
            const res = await api.post('/api/forgotpassword', { email });
            // console.log(res.data.msg)
            setmsg(res.data.msg)

        } catch (error) {
           console.log(error)
        } finally {
            setload(false);
        }
    }
    return (load ? (<h1>Loading...</h1>) : (
        <>
            <h1>ForgotPassword</h1>
            <br />
            <br />
            <h3>{msg}</h3>
            <br />
            {msg === "" && (
        <>
            <form onSubmit={submit}>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email"
                /> 
                <br />
                <button type="submit">Submit</button>
            </form>
            <br />
        </>
    )}
            <br />
            <br />
            <Link to="/login">Login</Link>

        </>)
    )
}

export default ForgotPassword