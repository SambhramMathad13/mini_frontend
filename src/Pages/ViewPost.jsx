import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";

function ViewPost() {
  const { state } = useLocation();
  const post = state?.ele;
  const searchKey = state?.searchKey;
  const navigate = useNavigate();
  

  if (!post) {
    return <div>Post not found</div>;
  }

  const goBack = () => {
    navigate("/search", { state: { searchKey } });
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center text-white mb-8 md:mb-24"
        style={{ backgroundImage: `url('Group 12.png')`, height: "50vh" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center p-6 md:p-12 lg:p-24">
          <div className="flex flex-col md:flex-row items-center">
            {post.author && post.image && (
              <img
                src={post.image}
                alt={`${post.author.username} profile`}
                className="rounded-full w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 object-cover md:mr-6 lg:mr-12 mt-6 md:mt-0"
              />
            )}
            <div className="text-center md:text-left mt-6 md:mt-0">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-semibold text-gray-800">
                {post.author?.username}
              </h2>
              <h1 className="mt-2 text-2xl md:text-3xl lg:text-5xl text-gray-800 font-medium">
                {post.company}
              </h1>
              <button className="mt-4 px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 border border-black text-black rounded-full text-base md:text-lg">
                View Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-gray-800 text-white rounded-lg shadow-md overflow-hidden">
  <div className="p-4 md:p-6 space-y-6">
    
    <div className="flex flex-col md:flex-row md:items-center">
      <h3 className="font-bold text-lg md:text-xl lg:text-2xl mr-2 mb-2 md:mb-0">Branch:</h3>
      <p className="text-base md:text-lg lg:text-xl">{post.branch}</p>
    </div>

    <div className="flex flex-col md:flex-row md:items-center">
      <h3 className="font-bold text-lg md:text-xl lg:text-2xl mr-2 mb-2 md:mb-0">About Company:</h3>
      <p className="text-base md:text-lg lg:text-xl">
        {post.about_company}
        <br />
        <a href={post.link} className="text-blue-400 underline">
          {post.link}
        </a>
      </p>
    </div>

    <div className="flex flex-col md:flex-row md:items-center">
      <h3 className="font-bold text-lg md:text-xl lg:text-2xl mr-2 mb-2 md:mb-0">Eligibility Criteria:</h3>
      <p className="text-base md:text-lg lg:text-xl">{post.eligiblity}</p>
    </div>

    <div className="flex flex-col md:flex-row md:items-center">
      <h3 className="font-bold text-lg md:text-xl lg:text-2xl mr-2 mb-2 md:mb-0">CTC offered:</h3>
      <p className="text-base md:text-lg lg:text-xl">{post.ctc}</p>
    </div>

    <div className="flex flex-col md:flex-row md:items-center">
      <h3 className="font-bold text-lg md:text-xl lg:text-2xl mr-2 mb-2 md:mb-0">Rounds:</h3>
      <p className="text-base md:text-lg lg:text-xl">{post.rounds}</p>
    </div>

    <div className="flex flex-col md:flex-row md:items-center">
      <h3 className="font-bold text-lg md:text-xl lg:text-2xl mr-2 mb-2 md:mb-0">Description:</h3>
      <p className="text-base md:text-lg lg:text-xl">{post.desc}</p>
    </div>

    <div className="flex flex-col md:flex-row md:items-center">
      <h3 className="font-bold text-lg md:text-xl lg:text-2xl mr-2 mb-2 md:mb-0">Contact Details:</h3>
      <p className="text-base md:text-lg lg:text-xl">{post.social_link}</p>
    </div>

  </div>
</div>



      <Footer />
    </div>
  );
}

export default ViewPost;
