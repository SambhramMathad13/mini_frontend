import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { Textarea } from '@/Components/ui/textarea';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

function UpdatePost() {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [load, setLoad] = useState(false);
    const post = location.state?.ele;

    const queryClient = useQueryClient();
    async function handleSubmit(event) {
        console.log("handleSubmit")
        event.preventDefault();
        setLoad(true);

        const formData = new FormData(formRef.current);
        const oldPosts = queryClient.getQueryData(['uposts']);
        try {
            const res = await api.patch(`/api/uposts/${post.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const updatedPosts = oldPosts.map(oldPost =>
                oldPost.id === post.id ? res.data : oldPost
            );
            
            queryClient.setQueryData(['uposts'], updatedPosts);

        } catch (err) {
            console.log(err.response);
        } finally {
            setLoad(false);
            navigate('/home');
        }
    };

    if (load) {
        return <div className="loader-container">
        <div className="loader"></div>
    </div>;
    }

    return (
        <div className="flex justify-center mt-10">
        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Update Post</CardTitle>
            <CardDescription>Fill in the details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="usn">USN</Label>
                  <Input id="usn" name="usn" defaultValue={post.usn} required />
                </div>
  
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="branch">Branch</Label>
                  <Input id="branch" name="branch" defaultValue={post.branch} required />
                </div>
  
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="link">Link (Google Drive link)</Label>
                  <Input id="link" name="link" type="url" defaultValue={post.link} />
                </div>
  
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="socialLink">Social Link</Label>
                  <Input id="socialLink" name="social_link" type="url" defaultValue={post.social_link} />
                </div>
  
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" name="company" defaultValue={post.company} required />
                </div>
  
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="aboutCompany">About Company</Label>
                  <Textarea id="aboutCompany" name="about_company" rows="3" defaultValue={post.about_company} required />
                </div>
  
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="eligibility">Eligibility</Label>
                  <Input id="eligibility" name="eligiblity" defaultValue={post.eligiblity} required />
                </div>
  
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="ctc">CTC</Label>
                  <Input id="ctc" name="ctc" defaultValue={post.ctc} required />
                </div>
  
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="rounds">Rounds</Label>
                  <Input id="rounds" name="rounds" defaultValue={post.rounds} required />
                </div>
  
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="desc" rows="3" defaultValue={post.desc} required />
                </div>
  
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image">User Image</Label>
                  <Input id="image" name="image" type="file" accept="image/*" />
                </div>
              </div>
              <CardFooter className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    );
}

export default UpdatePost;
