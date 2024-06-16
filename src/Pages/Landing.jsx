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
import { Button } from "@/Components/ui/button"

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
        className="relative bg-cover bg-center mb-24"
        style={{
          backgroundImage: `url('/Group 12.png')`,
          height: "65vh",
        }}
      >
        <Navbar isauth={false} />
        <div className="relative flex flex-col items-center justify-center py-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-gray-800 dark:text-white">
            Journey to success starts here.
            <br />
            Learn from those who've been there.
          </h2>

          <form onSubmit={searchposts} className="relative">
            <div className="box-content h-8 sm:w-full md:w-82 p-4 border-2 flex border-gray-800">
              <input
                type="text"
                onChange={(e) => setsearchkey(e.target.value)}
                className="bg-transparent flex-grow px-4 placeholder-gray-800 dark:placeholder-white border-none font-medium text-xl"
                placeholder="Search posts..." required minLength="2"
                maxLength="15"
              />
              <div className="absolute inset-y-0 left-80 h-20 border-1 border-gray-800"></div>
              <Button
                type="submit"
                className="ml-2 bg-gray-800 dark:bg-white dark:text-black w-20 sm:w-40 h-full text-white flex items-center justify-center"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
        <div className="flex flex-wrap justify-around text-xl font-bold text-gray-600 dark:text-white">
          <h2 className="m-2 text-base sm:text-lg md:text-xl font-allerta">
            FALABELLA
          </h2>
          <h2 className="m-2 text-base sm:text-lg md:text-xl">
            paloalto NETWORKS
          </h2>
          <div className="relative flex flex-col items-center justify-center m-2 text-base sm:text-lg md:text-xl">
            <h2>TEJAS</h2>
            <h2>NETWORKS</h2>
          </div>
          <h2 className="m-2 text-base sm:text-lg md:text-xl font-abhaya">
            Mercedes-Benz
          </h2>
        </div>
      </div>
      <br />
      <br />
      {msg ? (
        <>
          <h3>{msg.message}</h3>
          <a href="/" className="btn btn-sm bg-primary text-white mt-3">
            Back
          </a>
        </>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-3">
        {posts ? (
          posts.map((ele) => (
            <Card key={ele.id} className="w-full">
              <CardHeader>
                <div className="flex items-center mb-3">
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
                    <h5 className="text-gray-500">{ele.author.username}</h5>
                  </div>
                  <small className="text-gray-400 ml-auto">
                    {formatDistanceToNow(new Date(ele.created_at), {
                      addSuffix: true,
                    })}
                  </small>
                </div>
              </CardHeader>
              <CardContent>
                <h6 className="font-semibold">
                  Company name: {ele.company}
                </h6>
                <p >Branch: {ele.branch}</p>
                <p>
                  <strong>About company:</strong>{" "}
                  {truncateText(ele.about_company, 100)}
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
          ))
        ) : (
          <div className="col-span-full">
            <h1>No Posts</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Landing;
