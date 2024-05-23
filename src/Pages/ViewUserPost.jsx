import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ViewUserPost() {
    const { state } = useLocation();
    const post = state?.ele;
    // console.log(post)

    const navigate = useNavigate();

    if (!post) {
        return <div className="container mt-5">Post not found</div>;
    }

    const navigateToUpdate = () => {
        navigate(`/updatepost`, { state: { ele: post } });
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center">
                            {post.author && post.image && (
                                <img 
                                    src={post.image} 
                                    alt={`${post.author.username} profile`} 
                                    className="rounded-circle me-3" 
                                    style={{ width: '50px', height: '50px' }} 
                                />
                            )}
                            <div>
                                <h5 className="card-title mb-0">Company name: {post.company}</h5>
                                {post.author && post.author.username && (
                                    <h6 className="card-subtitle mb-2 text-muted">by - {post.author.username}</h6>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="card-text"><strong>Branch:</strong> {post.branch}</p>
                    <p className="card-text"><strong>About Company:</strong> {post.about_company}</p>
                    <p className="card-text"><strong>CTC:</strong> {post.ctc}</p>
                    <p className="card-text"><strong>Eligibility:</strong> {post.eligiblity}</p>
                    <p className="card-text"><strong>Rounds:</strong> {post.rounds}</p>
                    <p className="card-text"><strong>Description:</strong> {post.desc}</p>
      
                    <Link to="/home" className="btn btn-sm bg-primary text-white mt-3 mx-3">Back</Link>
                    <button onClick={navigateToUpdate} className="btn btn-sm bg-warning text-white mt-3">Update</button>
                    <Link to="/home" className="btn btn-sm bg-danger text-white mt-3 mx-3">Delete</Link>
                </div>
            </div>
        </div>
    );
}

export default ViewUserPost;


