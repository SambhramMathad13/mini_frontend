import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../Utils/Axios';
import { useQueryClient } from '@tanstack/react-query'
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"

function ViewUserPost() {
    const { state } = useLocation();
    const [load, setload] = useState(false)
    const post = state?.ele;
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    if (!post) {
        return <div className="container mt-5">Post not found</div>;
    }

    const navigateToUpdate = () => {
        navigate(`/updatepost`, { state: { ele: post } });
    };

    const deletee = async function () {
        setload(true)
        try {
          const res = await api.delete(`/api/uposts/${post.id}`);
        queryClient.setQueryData(['uposts'], (oldPosts) => {
            return oldPosts.filter(oldPost => oldPost.id !== post.id);
        });
        } catch (err) {
          console.log(err.response);
        } finally {
          setload(false)
          navigate('/home')
        }
      }

    return (load ? (<div className="loader-container">
      <div className="loader"></div>
  </div>) : (
        <div className="flex justify-center mt-20">
        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {post.author && post.image && (
                  <img
                    src={post.image}
                    alt={`${post.author.username} profile`}
                    className="rounded-full w-12 h-12 mr-3"
                  />
                )}
                <div>
                  <CardTitle>Company name: {post.company}</CardTitle>
                  {post.author && post.author.username && (
                    <CardDescription>by - {post.author.username}</CardDescription>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p><strong>Branch:</strong> {post.branch}</p>
            <p><strong>About Company:</strong> {post.about_company}</p>
            <p><strong>CTC:</strong> {post.ctc}</p>
            <p><strong>Eligibility:</strong> {post.eligiblity}</p>
            <p><strong>Rounds:</strong> {post.rounds}</p>
            <p><strong>Description:</strong> {post.desc}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link to="/home">
              <Button variant="outline">Back</Button>
            </Link>
            <div className="flex space-x-3">
              <Button onClick={navigateToUpdate}>Update</Button>
              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button>Delete</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your post.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={deletee}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

            </div>
          </CardFooter>
        </Card>
      </div>
    )
    );
}

export default ViewUserPost;


