import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../Utils/Axios";
import { useNavigate } from "react-router-dom";
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
import { ThemeProvider } from "@/Components/theme-provider"
import {ModeToggle} from "@/Components/mode-toggle"


function ForgotPassword() {
  const [email, setemail] = useState("");
  const [load, setload] = useState(false);
  const [msg, setmsg] = useState("");
  const navigate = useNavigate();
  async function submit(e) {
    setload(true);
    e.preventDefault();
    try {
      const res = await api.post("/api/forgotpassword", { email });
      // console.log(res.data.msg)
      setmsg(res.data.msg);
    } catch (error) {
      console.log(error);
    } finally {
      setload(false);
    }
  }
  return load ? (
    <h1>Loading...</h1>
  ) : (
    <>
      {/* <h1>ForgotPassword</h1>
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
            <Link to="/login">Login</Link> */}
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
<div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
<Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-red-500">{msg}</h3>
        {msg === "" && (
          <form onSubmit={submit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        {/* <Link to="/login" className="text-blue-500 self-end">Back to Login</Link> */}
        <div className="flex justify-between w-full">
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
          {msg === "" && <Button type="submit" onClick={submit}>Submit</Button>}
        </div>
      </CardFooter>
    </Card>
    </ThemeProvider>
    </>
  );
}

export default ForgotPassword;
