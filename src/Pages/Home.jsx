import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../Utils/Axios";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/Components/ui/button";
import { Skeleton } from "@/Components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import Footer from "./Footer";

const fetchPosts = async () => {
  const res = await api.get("/api/uposts");
  return res.data;
};

function Home() {
  const {
    data: posts,
    isLoading: load,
    error: msg,
  } = useQuery({
    queryKey: ["uposts"],
    queryFn: fetchPosts,
    staleTime: 900000,
  });
  const navigate = useNavigate();

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const view = (ele) => {
    navigate(`/viewuserpost`, { state: { ele } });
  };

  const handleClick = () => {
    navigate("/form");
  };

  return load ? (
    <>
        <div className="p-4">
          <Skeleton className="h-10 w-full mb-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg"
          >
            <Card className="w-full">
              <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <Skeleton className="rounded-full mr-3" style={{ width: "50px", height: "50px" }} />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
              </CardContent>
              <CardFooter className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                <Skeleton className="h-10 w-24" />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </>    
  ) : (
    <>
      <Navbar isauth={true} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
        {msg ? (
          <div className="col-span-full">
            <div className="flex justify-center">
              <h4>{msg.message}</h4>
            </div>
          </div>
        ) : posts ? (
          posts.map((ele) => (
            <Card
              key={ele.id}
              className="w-full transform transition-transform hover:-translate-y-2 hover:shadow-2xl shadow-lg rounded-lg overflow-hidden"
            >
              <CardHeader className="bg-gray-200 p-4 dark:bg-gray-500">
                <div className="flex items-center mb-3">
                  {ele.image && (
                    <img
                      src={ele.image}
                      alt={`${ele.author.username} profile`}
                      className="rounded-full mr-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "0.1px solid",
                      }}
                    />
                  )}
                  <div>
                    <h5 className="text-lg font-semibold">
                      {ele.author.username}
                    </h5>
                  </div>
                  <small className="ml-auto text-gray-500">
                    {formatDistanceToNow(new Date(ele.created_at), {
                      addSuffix: true,
                    })}
                  </small>
                </div>
                <CardTitle className="text-xl font-bold">
                  Company name: {ele.company}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="mb-2">
                  <strong>Branch:</strong> {ele.branch}
                </p>
                <p className="mb-2">
                  <strong>About company:</strong>{" "}
                  {truncateText(ele.about_company, 100)}
                </p>
                <p className="mb-2">
                  <strong>CTC:</strong> {ele.ctc}
                </p>
                <p className="mb-2">
                  <strong>Eligibility:</strong>{" "}
                  {truncateText(ele.eligiblity, 100)}
                </p>
                <p className="mb-2">
                  <strong>Rounds:</strong> {ele.rounds}
                </p>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  onClick={() => view(ele)}
                  className="bg-gray-800 text-white dark:bg-white dark:text-black"
                >
                  Manage
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <h1>No Posts</h1>
          </div>
        )}
      </div>
      <br />
      <div className="flex justify-center">
        <Button
          onClick={handleClick}
          className="bg-gray-800 text-white dark:bg-white dark:text-black"
        >
          Create New Post
        </Button>
      </div>
      <Footer />
    </>
  );
}

export default Home;
