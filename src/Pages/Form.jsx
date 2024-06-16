import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Utils/Axios';
import { useQueryClient } from '@tanstack/react-query'
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Textarea } from '@/Components/ui/textarea';
import { Input } from "@/Components/ui/input";
import { ModeToggle } from "@/Components/mode-toggle"


function Form() {
  const formRef = useRef(null);
  const [load, setload] = useState(false)
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSubmit(event) {
    event.preventDefault();
    setload(true)
    const formData = new FormData(formRef.current);

    try {
      const res = await api.post('/api/uposts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      queryClient.setQueryData(['uposts'], (oldPosts) => {
        return [...oldPosts, res.data];
      });
    } catch (err) {
      console.log(err);

    } finally {
      setload(false)
      navigate('/home');
    }
  };

  return (load ? (<div className="loader-container">
    <div className="loader"></div>
  </div>) : (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="usn">USN</label>
                <Input id="usn" name="usn" required minLength="9" maxLength="11" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="branch">Branch</label>
                <Input id="branch" name="branch" required minLength="2" maxLength="17" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="link">Link (Google Drive link)</label>
                <Input id="link" name="link" type="url" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="socialLink">Social Link</label>
                <Input id="socialLink" name="social_link" type="url" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="companyName">Company Name</label>
                <Input id="companyName" name="company" required minLength="4" maxLength="20" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="aboutCompany">About Company</label>
                <Textarea id="aboutCompany" name="about_company" rows="3" required minLength="20" maxLength="3000" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="eligibility">Eligibility</label>
                <Input id="eligibility" name="eligiblity" required minLength="9" maxLength="500" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="ctc">CTC</label>
                <Input type="number" id="ctc" name="ctc" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="rounds">Rounds</label>
                <Input type="number" id="rounds" name="rounds" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="description">Description</label>
                <Textarea id="description" name="desc" rows="3" required minLength="20" maxLength="4000" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="image">User Image</label>
                <Input type="file" name="image" accept="image/*" />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
  );
}

export default Form;
