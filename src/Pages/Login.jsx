import React from 'react'
import {useRef,useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../Utils/Axios';
import Navbar from "../Components/Navbar"
import { Link } from 'react-router-dom'

function Login() {
    const form=useRef()
    const [load, setload] = useState(false)
    const [msg, setmsg] = useState('')
    const navigate = useNavigate();

    async function submit(event) {
        setload(true)
        event.preventDefault();
        const username = form.current.user.value;
        const password = form.current.pass.value;
        try {
            const res = await api.post('/api/gettoken', { username, password });
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            navigate("/home", { state: { userData: username } });

        } catch (error) {
            if (error.response && error.response.status === 401) {
                setmsg("Invalid username or password")
            }
        } finally {
            setload(false);
        }
        // console.log(user, pass)
    }
    
  return (load ? (<h1>Loading...</h1>) : (
    <>
    <Navbar isauth={false}/>
    <h1>Login page</h1>
    <br />
    <br />

    <form onSubmit={submit} ref={form}>
    <h3>{msg}</h3> <br />
    <input type="text" placeholder='Username' name='user'/> <br />
    <input type="text" placeholder='Password' name='pass'/> <br />
    <button type="submit"> <br />
        Submit
    </button>
    </form>
    <br />
    <Link to="/forgotpassword">Forgotpassword ?</Link>
    </>
  )
  )
}

export default Login