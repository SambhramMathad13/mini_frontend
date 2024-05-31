import React from 'react'
import {useRef,useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../Utils/Axios';
import Navbar from "../Components/Navbar"
import { Link } from 'react-router-dom'
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/Components/ui/card";
  import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

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
    {/* <h1>Login page</h1>
    <br />
    <br />

    <form onSubmit={submit} ref={form}>
    <h3>{msg}</h3> <br />
    <input type="text" placeholder='Username' name='user'/> <br />
    <input type="text" placeholder='Password' name='pass'/> <br />
    <Button type="submit">Submit</Button>
    </form>
    <br />
    <Link to="/forgotpassword">Forgotpassword ?</Link> */}

<Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} ref={form}>
          <div className="grid w-full items-center gap-4">
            <h3>{msg}</h3>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user">Username</Label>
              <Input id="user" name="user" placeholder="Username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pass">Password</Label>
              <Input id="pass" name="pass" type="password" placeholder="Password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to="/forgotpassword" className="text-blue-500">Forgot password?</Link>
        <Button type="submit" onClick={submit}>Submit</Button>
      </CardFooter>
    </Card>
    </>
  )
  )
}

export default Login