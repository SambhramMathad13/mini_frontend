import React from "react";
import { useState } from "react";
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
    <div className="mt-24">
   
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
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Enter your email" required minLength="13"
                maxLength="30"
                />
              </div>
            </div>
            <CardFooter className="flex flex-col space-y-3 mt-6">
              <div className="flex justify-between w-full">
                <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                {msg === "" && <Button type="submit">Submit</Button>}
              </div>
            </CardFooter>
          </form>
        )}
      </CardContent>
    </Card>
    </div>
  );
}

export default ForgotPassword;
