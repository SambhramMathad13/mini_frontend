import React, { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';
import api from '../Utils/Axios';
import { formatDistanceToNow } from 'date-fns';

function Home() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [posts, setPosts] = useState([]);
  const [search, setSearchKey] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    setLoad(true);
    try {
      const res = await api.get('/api/uposts');
      const data = res.data;
      setPosts(data);
      if (data.length === 0) {
        setMsg("You have not created any posts");
      } else {
        setMsg('');
      }
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setLoad(false);
    }
  }

  async function searchPosts(e) {
    setLoad(true);
    e.preventDefault();
    try {
      const res = await api.get(`/api/posts/search/?search=${search}`);
      const data = res.data;
      if (data.length === 0) {
        setMsg("No posts found");
      }
      setPosts(data);
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setLoad(false);
    }
  }

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

  return (load ? (<h1>Loading...</h1>) : (
    <>
      <Navbar isauth={true} />
      <h1>Welcome to home page you made it...</h1>
      <br />
      <form onSubmit={searchPosts}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <br />
      <br />
      {/* {msg && (
        <h4 style={{ color: 'white' }}>{msg}</h4>
      )} */}
      <div className="row mx-3">
        {posts.length === 0 ? (
          <div className="col-12">
            <div className="d-flex justify-content-center">
            <h4 style={{ color: 'white' }}>You have not created any posts</h4>
            </div>
          </div>
        ) : (
          posts.map((ele) => (
            <div key={ele.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={ele.image}
                      alt={`${ele.author.username} profile`}
                      className="rounded-circle me-3"
                      style={{ width: '50px', height: '50px', border: '0.1px solid' }}
                    />
                    <div>
                      <h5 className="card-subtitle mb-2 text-muted">{ele.author.username}</h5>
                    </div>
                    <small className="text-muted ms-5">
                      {formatDistanceToNow(new Date(ele.created_at), { addSuffix: true })}
                    </small>
                  </div>
                  <h6 className="card-subtitle mb-2 text-muted"><strong>Company name: {ele.company}</strong></h6>
                  <p className="card-text">Branch: {ele.branch}</p>
                  <p className="card-text"><strong>About company:</strong> {truncateText(ele.about_company, 100)}</p>
                  <p className="card-text"><strong>CTC:</strong> {ele.ctc}</p>
                  <p className="card-text"><strong>Eligibility:</strong> {truncateText(ele.eligiblity, 100)}</p>
                  <p className="card-text"><strong>Rounds:</strong> {ele.rounds}</p>
                  <button className="btn btn-primary btn-sm mt-3" onClick={() => view(ele)}>Read More</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <button className='btn btn-primary' onClick={handleClick}>Create New post</button>
      </div>
    </>
  ));
}

export default Home;
