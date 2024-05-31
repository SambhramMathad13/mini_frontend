import React, { useState } from "react";
import { useRef } from "react";
import api from "../Utils/Axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
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

function Register() {
  const form = useRef();
  const [load, setload] = useState(false);
  const [msg, setmsg] = useState("");

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
      <Navbar isauth={false} />
      {/* <h1>Register page</h1>

      <form onSubmit={submit} ref={form}>
                <h3>{msg}</h3> <br />

                <input type="text" placeholder='Username' name='user' /> <br />
                <input type="text" placeholder='Email' name='email' /> <br />
                <input type="text" placeholder='Password' name='pass' /> <br />
                <button type="submit">
                    Submit
                </button>
            </form> */}

<Card className="w-[350px] mx-auto mt-10">
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
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" onClick={submit}>Submit</Button>
      </CardFooter>
    </Card>
    </>
  );
}

export default Register;
