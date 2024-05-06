import React, { useState } from 'react'
import { useRef } from 'react'
import api from '../Utils/Axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"

function Register() {
    const form = useRef()
    const [load, setload] = useState(false)
    const [msg, setmsg] = useState('')
  
    
    async function submit(event) {
        setload(true);
        event.preventDefault();
        const user = form.current.user.value;
        const pass = form.current.pass.value;
        const email = form.current.email.value;
        try {
            const res = await api.post('/api/createuser', { username: user,email:email, password: pass });
            // console.log(res.data.username)
            setmsg("An account verification link has been sent to your given email address.")

        } catch (error) {
            // console.error('Error submitting data:', error);

            if (error.response && error.response.status === 400) {
                const usermsg=error.response.data.username[0]
                setmsg(usermsg)
            }
        } finally {
            setload(false);
        }
    }
    
    return (load ? (<h1>Loading...</h1>) : (
        <>
            <Navbar isauth={false}/>
            <h1>Register page</h1 >
            <br />
            <br />

            <form onSubmit={submit} ref={form}>
                <h3>{msg}</h3> <br />

                <input type="text" placeholder='Username' name='user' /> <br />
                <input type="text" placeholder='Email' name='email' /> <br />
                <input type="text" placeholder='Password' name='pass' /> <br />
                <button type="submit">
                    Submit
                </button>
            </form>
        </>)
    )
}

export default Register