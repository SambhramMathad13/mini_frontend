import React, { useState } from "react";
import { useRef } from "react";
import api from "../Utils/Axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom'
import { Button } from "@/Components/ui/button";
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
import {ModeToggle} from "@/Components/mode-toggle"

function Register() {
  const form = useRef();
  const [load, setload] = useState(false);
  const [msg, setmsg] = useState("");
  const navigate = useNavigate();

  async function submit(event) {
    setload(true);
    event.preventDefault();
    const user = form.current.user.value;
    const pass = form.current.pass.value;
    const email = form.current.email.value;
    try {
      const res = await api.post("/api/createuser", {
        username: user,
        email: email,
        password: pass,
      });
      // console.log(res.data.username)
      setmsg(
        "An account verification link has been sent to your given email address."
      );
    } catch (error) {
      // console.error('Error submitting data:', error);

      if (error.response && error.response.status === 400) {
        const usermsg = error.response.data.username[0];
        setmsg(usermsg);
      }
    } finally {
      setload(false);
    }
  }

  return load ? (
    <h1>Loading...</h1>
  ) : (
    <>
    <Navbar isauth={false}/>
      <div className="mt-12">
      <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
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
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pass">Password</Label>
              <Input id="pass" name="pass" type="password" placeholder="Password" />
            </div>
          </div>
          <CardFooter className="flex flex-col space-y-3 mt-6">
            <Link to="/login">Already have an account? <span className="text-blue-500">Login</span></Link>
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={() => navigate('/')}>Cancel</Button>
              <Button type="submit" onClick={submit}>Submit</Button>
            </div>
          </CardFooter>
        </form>
      </CardContent>
      
    </Card>
      </div>
    </>
  );
}

export default Register;
