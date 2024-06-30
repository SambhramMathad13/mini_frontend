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
import { Skeleton } from '@/Components/ui/skeleton';
const searchposts = async (s) => {
    const res = await axios.get(`https://placed.pythonanywhere.com/api/posts/search/?search=${s}`);
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
        return (load ? (
            <>
            <div className="p-4">
                <Skeleton className="h-10 w-full mb-4" />
            </div>
            <h1 className="text-3xl font-bold text-center my-6">
                <Skeleton className="w-48 h-8 mb-4 mx-auto" />
            </h1>
            <div className="flex justify-center mb-6">
                <Skeleton className="w-20 h-10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
                {[...Array(3)].map((_, index) => (
                    <Card key={index} className="w-full">
                        <CardHeader>
                            <div className="flex items-center mb-3">
                                <Skeleton className="rounded-full mr-3" style={{ width: '50px', height: '50px' }} />
                                <div>
                                    <Skeleton className="h-6 w-24 mb-1" />
                                </div>
                                <small className="text-gray-400 ml-auto">
                                    <Skeleton className="h-4 w-20" />
                                </small>
                            </div>
                            <CardTitle>
                                <Skeleton className="text-xl font-bold w-3/4" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="mb-2 w-full" />
                            <Skeleton className="mb-2 w-full" />
                            <Skeleton className="mb-2 w-full" />
                            <Skeleton className="mb-2 w-3/4" />
                            <Skeleton className="mb-2 w-1/2" />
                            <Skeleton className="mb-2 w-2/3" />
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Skeleton className="h-10 w-24" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 mt-3">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">No Search Results Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-200 mb-6">
            It looks like we couldn’t find any matches for your search.
        </p>
        <Button onClick={() => navigate('/')}>Go Back</Button>
        <img
                src="/no-res-found.svg"
                alt="404 Not Found"
                className="w-[350px] h-[350px] mt-4"
            />
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
        load ? (
        <>
        <h1>Loading.....</h1>
        </>
    ) : (
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
                                <p>Branch: {ele.branch}</p>
                                <p>
                                    <strong>About company:</strong> {truncateText(ele.about_company, 100)}
                                </p>
                                <p>
                                    <strong>CTC:</strong> {ele.ctc}
                                </p>
                                <p>
                                    <strong>Eligibility:</strong> {truncateText(ele.eligiblity, 100)}
                                </p>
                                <p>
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

