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

      <div className="flex flex-col md:flex-row p-4 md:p-12 lg:p-24 space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex-1 p-4 md:p-12 bg-blue-900 text-white rounded-md">
          <div className="text-center">
            <p>{post.social_link}</p>
            <h3 className="font-medium text-lg md:text-xl lg:text-2xl">
              Eligibility Criteria
            </h3>
            <p className="text-base md:text-lg lg:text-xl">CGPA: {post.cgpa}</p>
            <p className="text-base md:text-lg lg:text-xl">
              10TH: {post.tenth}
            </p>
            <p className="text-base md:text-lg lg:text-xl">
              12TH: {post.twelfth}
            </p>
            <br />
            <p className="font-medium text-base md:text-lg lg:text-xl">
              No Active Backlogs
            </p>
            <h3 className="font-medium text-lg md:text-xl lg:text-2xl">
              CTC offered: {post.ctc}
            </h3>
            <br />
            <p className="font-medium text-base md:text-lg lg:text-xl">
              <strong>Rounds:</strong> {post.rounds}
            </p>
            <h3 className="text-base md:text-lg lg:text-xl">
              Online assessment
            </h3>
            <h3 className="text-base md:text-lg lg:text-xl">
              Technical Interview
            </h3>
            <h3 className="text-base md:text-lg lg:text-xl">HR+Managerial</h3>
          </div>
        </div>
        <div className="flex-1 p-4 md:p-12 bg-gray-100 rounded-md mt-4 md:mt-0">
          <h3 className="font-bold text-gray-800 text-lg md:text-xl lg:text-2xl">
            Brief about company
          </h3>
          <p className="text-base md:text-lg lg:text-xl text-gray-800">
            {post.about_company}
            <br></br>
            {post.link}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ViewPost;