import React from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import api from '../Utils/Axios';
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

function ForgotP_recovery() {
  const { uid, token } = useParams();
  const [password1, setpass1] = useState('')
  const [password2, setpass2] = useState('')
  const [load, setload] = useState(false)
  const [msg, setmsg] = useState("")

  async function submit(e) {
    setload(true)
    e.preventDefault();
    if (password1 !== password2) {
      setload(false);
      setmsg("Password mismatch");
    }
    else {
      try {
        const res = await api.post(`api/forgotpasswordrecovery/${uid}/${token}`, { password1, password2 });
        setmsg(res.data.msg)

      } catch (error) {
        setmsg("Invalid url or token expiration")
      } finally {
        setload(false);
      }
    }

  }

  return load ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
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
            minLength="5"
            maxLength="12"
          />
          <Input
            type="password"
            value={password2}
            onChange={(e) => setpass2(e.target.value)}
            placeholder="Confirm Password"
            required
            minLength="5"
            maxLength="12"
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

export default ForgotP_recovery