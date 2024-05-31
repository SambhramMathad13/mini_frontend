import React, { useState, useEffect } from 'react';
import api from '../Utils/Axios';
import Navbar from "../Components/Navbar";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate, useLocation } from "react-router-dom";

function Search() {
    const [load, setload] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [posts, setposts] = useState([]);
    const [msg, setmsg] = useState('');

    const searchKey = location.state?.searchKey;

    useEffect(() => {
        if (searchKey) {
            searchposts(searchKey);
        }
    }, [searchKey]);

    async function searchposts(searchKey) {
        setload(true);
        try {
            const res = await api.get(`/api/posts/search/?search=${searchKey}`);
            const data = res.data;
            if (data.length === 0) {
                setmsg("No posts found");
            }
            setposts(data);
        } catch (err) {
            console.log(err.response.data);
        } finally {
            setload(false);
        }
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const view = function (ele) {
        navigate(`/view`, { state: { ele } });
    };

    return (load ? (<h1>Loading...</h1>) : (
        <>
            <Navbar isauth={false} />
            <h1>Search Results</h1> <br /> <br />
            <button onClick={() => navigate('/')} className="btn btn-sm bg-primary text-white mt-3">Back</button>
            <br /><br />
            {msg ? <><h3>{msg}</h3></> : <></>}
            <div className="row mx-3">
                {posts.map((ele, index) => (
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
                                <h6 className="card-subtitle mb-2 text-muted"> <strong>Company name: {ele.company}</strong> </h6>
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
        </>))
}

export default Search;
