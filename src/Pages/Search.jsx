import axios from 'axios';
import Navbar from "../Components/Navbar";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

const searchposts = async (s) => {
    const res = await axios.get(`https://mytodolistwebapp.pythonanywhere.com/api/posts/search/?search=${s}`);
    return res.data;
};

function Search() {
    const navigate = useNavigate();
    const location = useLocation();

    const searchKey = location.state?.searchKey;

    const { data: posts, isLoading: load, error: msg } = useQuery(
        {
            queryKey: ['search', searchKey],
            queryFn: () => searchposts(searchKey),
            staleTime: 300000
        }
    );

    // console.log(posts)

    if (!Array.isArray(posts) || posts.length === 0) {
        return (load ? (<h1>Loading...</h1>) : (
          <div>
            <h1>No Search result found...</h1>
          </div>
        ));
      }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const view = (ele) => {
        const from = 'search';
        navigate('/view', { state: { ele, from, searchKey } });
    };

    return (
        load ? (<h1>Loading...</h1>) : (
            <>
                <Navbar isauth={false} />
                <h1 className="text-3xl font-bold text-center my-6">Search Results</h1>
                <div className="flex justify-center mb-6">
                    <Button onClick={() => navigate('/')}>Back</Button>
                </div>
                {msg ? <h3>{msg.message}</h3> : null}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
                    {posts?.map((ele) => (
                        <Card key={ele.id} className="w-full">
                            <CardHeader>
                                <div className="flex items-center mb-3">
                                    <img
                                        src={ele.image}
                                        alt={`${ele.author.username} profile`}
                                        className="rounded-full mr-3"
                                        style={{ width: '50px', height: '50px', border: '0.1px solid' }}
                                    />
                                    <div>
                                        <h5 className="text-gray-500">{ele.author.username}</h5>
                                    </div>
                                    <small className="text-gray-400 ml-auto">
                                        {formatDistanceToNow(new Date(ele.created_at), { addSuffix: true })}
                                    </small>
                                </div>
                                <CardTitle>Company name: {ele.company}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">Branch: {ele.branch}</p>
                                <p className="text-gray-700">
                                    <strong>About company:</strong> {truncateText(ele.about_company, 100)}
                                </p>
                                <p className="text-gray-700">
                                    <strong>CTC:</strong> {ele.ctc}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Eligibility:</strong> {truncateText(ele.eligiblity, 100)}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Rounds:</strong> {ele.rounds}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <Button onClick={() => view(ele)}>Read More</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </>
        )
    );
}

export default Search;

