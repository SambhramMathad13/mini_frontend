import axios from 'axios';
import Navbar from "../Components/Navbar";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

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

  
    if (posts.length==0)
        {
            return(<><h1>No Search result found...</h1></>)
        }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const view = (ele) => {
        const from = 'search';
        navigate('/view', { state: { ele, from,searchKey } });
    };

    return (
        load ? (<h1>Loading...</h1>) : (
            <>
                <Navbar isauth={false} />
                <h1>Search Results</h1>
                <br />
                <br />
                <button onClick={() => navigate('/')} className="btn btn-sm bg-primary text-white mt-3">Back</button>
                <br /><br />
                {msg ? <h3>{msg.message}</h3> : null}
                <div className="row mx-3">
                    {posts?.map((ele, index) => (
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
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        <strong>Company name: {ele.company}</strong>
                                    </h6>
                                    <p className="card-text">Branch: {ele.branch}</p>
                                    <p className="card-text"><strong>About company:</strong> {truncateText(ele.about_company, 100)}</p>
                                    <p className="card-text"><strong>CTC:</strong> {ele.ctc}</p>
                                    <p className="card-text"><strong>Eligibility:</strong> {truncateText(ele.eligiblity, 100)}</p>
                                    <p className="card-text"><strong>Rounds:</strong> {ele.rounds}</p>
                                    <button className="btn btn-primary btn-sm mt-3" onClick={() => view(ele)}>Read More</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    );
}

export default Search;

