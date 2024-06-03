import React from 'react'
import { useState } from 'react'
import api from '../Utils/Axios';
import { Button } from "@/Components/ui/button";
import { useNavigate } from 'react-router-dom';
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

function ChangePassword() {
    const [old_password, setpass1] = useState('')
    const [new_password, setpass2] = useState('')
    const [c_password, setpass3] = useState('')
    const [load, setload] = useState(false)
    const [msg, setmsg] = useState("")
    const navigate=useNavigate()

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h3>{msg}</h3>
      <div className="absolute top-4 right-4">
          <ModeToggle />
    </div>
      {msg === "" && (
        <>
          <div className="flex justify-center">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="old_password">Old Password</Label>
                <Input
                  id="old_password"
                  name="old_password"
                  type="password"
                  value={old_password}
                  onChange={(e) => setpass1(e.target.value)}
                  placeholder="Old Password"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="new_password">New Password</Label>
                <Input
                  id="new_password"
                  name="new_password"
                  type="password"
                  value={new_password}
                  onChange={(e) => setpass2(e.target.value)}
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="c_password">Confirm Password</Label>
                <Input
                  id="c_password"
                  name="c_password"
                  type="password"
                  value={c_password}
                  onChange={(e) => setpass3(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
          <Button type="submit" onClick={submit}>Change</Button>
        </CardFooter>
      </Card>
    </div>
        </>
      )}
</ThemeProvider>
    </>
    )

  )
}

export default ChangePassword