import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
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

function ViewPost() {
    const { state } = useLocation();
    const post = state?.ele;
    const from = state?.from;
    const searchKey = state?.searchKey;
    const navigate = useNavigate();


    if (!post) {
        return <div className="container mt-5">Post not found</div>;
    }
    const goBack = () => {
        navigate('/search', { state: { searchKey } });
    };
    return (
        <div className="flex justify-center mt-10">
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
        <CardFooter className="flex justify-end">
          {from === "search" ? (
            <Button variant="outline" onClick={goBack}>Back</Button>
          ) : (
            <Link to="/">
              <Button variant="outline">Back</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
    );
}

export default ViewPost;


