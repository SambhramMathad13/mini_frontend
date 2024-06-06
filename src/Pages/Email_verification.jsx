import React from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import api from '../Utils/Axios';
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

function Email_verification() {
  const { uid, token } = useParams();
  const [load, setload] = useState(false)
  const [msg, setmsg] = useState("")

  async function submit(e) {
    setload(true)
    e.preventDefault();


    try {
      const res = await api.get(`api/av/${uid}/${token}`);
      setmsg(res.data.msg)
    } catch (error) {
      setmsg("Invalid url or token expiration")
    } finally {
      setload(false);

    }

  }

  return load ? (
    <h1 className="text-center text-2xl">Loading...</h1>
) : (
    <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Password Reset Form</h1>
        <h3 className="mb-4">{msg}</h3>
        {msg === "" ? (
            <form onSubmit={submit} className="flex flex-col space-y-4">
                <Input
                    type="password"
                    value={password1}
                    onChange={(e) => setpass1(e.target.value)}
                    placeholder="Password"
                    required
                />
                <Input
                    type="password"
                    value={password2}
                    onChange={(e) => setpass2(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <Button type="submit" className="mt-4">
                    Reset
                </Button>
            </form>
        ) : (
            <div className="mt-4">
                <Link to="/login" className="text-blue-600 underline">
                    Login
                </Link>
            </div>
        )}
    </div>
);
}

export default Email_verification