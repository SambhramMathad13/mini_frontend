import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';
import api from '../Utils/Axios';
import { formatDistanceToNow } from 'date-fns';
import { useQuery } from '@tanstack/react-query';



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

  return (load ? (<h1>Loading...</h1>) : (
    <>
      <Navbar isauth={true} />
      <h1>Welcome to home page you made it...</h1>
      <br />
      <br />

      <div className="row mx-3">
      {msg ? (
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <h4 style={{ color: 'white' }}>{msg.message}</h4>
          </div>
        </div>
      ) : (
        posts ? (
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
                  <button className="btn btn-primary btn-sm mt-3" onClick={() => view(ele)}>Manage</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <h1>No Posts</h1>
          </div>
        )
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
