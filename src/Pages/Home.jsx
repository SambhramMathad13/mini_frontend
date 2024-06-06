import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';
import api from '../Utils/Axios';
import { formatDistanceToNow } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

const fetchPosts = async () => {
  const res = await api.get('/api/uposts');
  return res.data;
};

function Home() {
  const { data: posts, isLoading: load, error: msg } = useQuery({ queryKey: ['uposts'], queryFn: fetchPosts,staleTime: 900000 })
  const navigate = useNavigate();

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const view = (ele) => {
    navigate(`/viewuserpost`, { state: { ele } });
  };

  const handleClick = () => {  
    navigate("/form");
  };

  return (load ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Navbar isauth={true} />
      <h1>Welcome to the home page, you made it...</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
        {msg ? (
          <div className="col-span-full">
            <div className="flex justify-center">
              <h4>{msg.message}</h4>
            </div>
          </div>
        ) : (
          posts ? (
            posts.map((ele) => (
              <Card key={ele.id} className="w-full">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    {ele.image && (
                      <img
                        src={ele.image}
                        alt={`${ele.author.username} profile`}
                        className="rounded-full mr-3"
                        style={{ width: '50px', height: '50px', border: '0.1px solid' }}
                      />
                    )}
                    <div>
                      <h5>{ele.author.username}</h5>
                    </div>
                    <small className="ml-auto">
                      {formatDistanceToNow(new Date(ele.created_at), { addSuffix: true })}
                    </small>
                  </div>
                  <CardTitle>Company name: {ele.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Branch:</strong> {ele.branch}</p>
                  <p><strong>About company:</strong> {truncateText(ele.about_company, 100)}</p>
                  <p><strong>CTC:</strong> {ele.ctc}</p>
                  <p><strong>Eligibility:</strong> {truncateText(ele.eligiblity, 100)}</p>
                  <p><strong>Rounds:</strong> {ele.rounds}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => view(ele)}>Manage</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <h1>No Posts</h1>
            </div>
          )
        )}
      </div>
      <br />
      <div className="flex justify-center">
        <Button onClick={handleClick}>Create New Post</Button>
      </div>
    </>
  ));
}

export default Home;
