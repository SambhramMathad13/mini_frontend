import React from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import api from '../Utils/Axios';
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Skeleton } from '@/Components/ui/skeleton';

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

  return (
    load ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-4" />
          </CardContent>
        </Card>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">Email Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-center text-lg mb-4">{msg}</h3>
            {msg === "" ? (
              <form onSubmit={submit} className="space-y-6">
                <Button type="submit" className="w-full">Verify</Button>
              </form>
            ) : (
              <div className="mt-4 text-center">
                <Link to="/login" className="text-blue-600 dark:text-blue-400 underline">Login</Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  );
}

export default Email_verification