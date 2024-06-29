import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import Footer from "./Footer";

const fetchPosts = async () => {
  const res = await axios.get(
    "https://mytodolistwebapp.pythonanywhere.com/api/tposts"
  );
  return res.data;
};

function Landing() {
  const {
    data: posts,
    isLoading: load,
    error: msg,
  } = useQuery({
    queryKey: ["tposts"],
    queryFn: fetchPosts,
    staleTime: 900000,
  });
  const navigate = useNavigate();
  const [search, setsearchkey] = useState("");

  async function searchposts(e) {
    e.preventDefault();
    navigate(`/search`, { state: { searchKey: search } });
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const view = function (ele) {
    const from = "landing";
    navigate("/view", { state: { ele, from } });
  };

  return load ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div
        className="relative bg-cover bg-center mb-24 "
        style={{
          backgroundImage: `url('/Group 12.png')`,
          height: "72vh",
        }}
      >
        <Navbar isauth={false} />
        <div className="relative flex flex-col items-center justify-center py-10 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-gray-800 dark:text-white">
            Journey to success starts here.
            <br />
            Learn from those who've been there.
          </h2>

          <form
            onSubmit={searchposts}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="w-full max-w-md mx-auto p-4 border-2 border-gray-800 flex items-center space-x-2">
              <input
                type="text"
                onChange={(e) => setsearchkey(e.target.value)}
                className="bg-transparent flex-grow px-4 py-2 placeholder-gray-800 dark:placeholder-white border-none font-medium text-lg w-full"
                placeholder="Search posts..."
                required
                minLength="2"
                maxLength="15"
              />
              <Button
                type="submit"
                className="bg-gray-800 dark:bg-white dark:text-black w-20 sm:w-24 lg:w-32 h-10 sm:h-12 text-white flex items-center justify-center"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
        <div className="flex flex-wrap justify-around items-center text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-600 dark:text-white px-4">
          <h2 className="mt-1 sm:mt-2 md:mt-3 lg:mt-4 m-2 font-allerta whitespace-nowrap">
            FALABELLA
          </h2>
          <h2 className="mt-1 sm:mt-2 md:mt-3 lg:mt-4 m-2 whitespace-nowrap">
            paloalto NETWORKS
          </h2>
          <div className="relative flex flex-col items-center justify-center mt-1 sm:mt-2 md:mt-3 lg:mt-4 m-2 whitespace-nowrap">
            <h2>TEJAS</h2>
            <h2>NETWORKS</h2>
          </div>
          <h2 className="mt-1 sm:mt-2 md:mt-3 lg:mt-4 m-2 font-abhaya whitespace-nowrap">
            Mercedes-Benz
          </h2>
        </div>
      </div>

      <h1 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl my-8">
        Recent Interview Experience
      </h1>
      {msg ? (
        <>
          <h3>{msg.message}</h3>
          <a href="/" className="btn btn-sm bg-primary text-white mt-3">
            Back
          </a>
        </>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
        {posts ? (
          posts.map((ele) => (
            <div
              key={ele.id}
              className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Card className="w-full">
                <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
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
                    <div>
                      <h5 className="text-gray-500 dark:text-gray-300">
                        {ele.author.username}
                      </h5>
                      <small className="text-gray-400 dark:text-gray-500">
                        {formatDistanceToNow(new Date(ele.created_at), {
                          addSuffix: true,
                        })}
                      </small>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h6 className="font-semibold text-gray-700 dark:text-gray-200">
                    Company name: {ele.company}
                  </h6>
                  <p className="text-gray-600 dark:text-gray-300">
                    Branch: {ele.branch}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>About company:</strong>{" "}
                    {truncateText(ele.about_company, 100)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>CTC:</strong> {ele.ctc}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Eligibility:</strong>{" "}
                    {truncateText(ele.eligiblity, 100)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Rounds:</strong> {ele.rounds}
                  </p>
                </CardContent>
                <CardFooter className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                  <Button
                    onClick={() => view(ele)}
                    className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                  >
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <h1>No Posts</h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Landing;
