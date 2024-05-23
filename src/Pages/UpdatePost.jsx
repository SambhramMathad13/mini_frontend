import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function UpdatePost() {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state?.ele;

    useEffect(() => {
        if (post) {
            // Populate form fields with post data
            Object.keys(post).forEach(key => {
                if (formRef.current[key]) {
                    formRef.current[key].value = post[key];
                }
            });
        }
    }, [post]);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(formRef.current);
    //     const data = {};
    //     formData.forEach((value, key) => {
    //         data[key] = value;
    //     });

    //     // Handle form submission here

    //     alert('Successfully updated the Post');
    //     navigate('/home');
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
    
        
    
        console.log(data);
        alert('Successfully created new Post');
        navigate('/home');
      };
    

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card bg-dark text-white" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="card-body bg-white text-dark p-4 rounded">
                    <form ref={formRef} onSubmit={handleSubmit}>

                    <div className="mb-3">
              <label htmlFor="usn" className="form-label">USN</label>
              <input type="text" className="form-control" id="usn" name="usn" defaultValue={post.usn} required />
            </div>

            <div className="mb-3">
              <label htmlFor="branch" className="form-label">Branch</label>
              <input type="text" className="form-control" id="branch" name="branch" defaultValue={post.branch} required />
            </div>


            <div className="mb-3">
              <label htmlFor="link" className="form-label">Link (Google Drive link)</label>
              <input type="url" className="form-control" id="link" name="link"  defaultValue={post.link}/>
            </div>
            
            <div className="mb-3">
              <label htmlFor="socialLink" className="form-label">Social Link</label>
              <input type="url" className="form-control" id="socialLink" name="socialLink" defaultValue={post.social_link}  />
            </div>

                        <div className="mb-3">
                            <label htmlFor="companyName" className="form-label">Company Name</label>
                            <input type="text" className="form-control" id="companyName" name="companyName" defaultValue={post.company} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="aboutCompany" className="form-label">About Company</label>
                            <textarea className="form-control" id="aboutCompany" name="aboutCompany" rows="3" defaultValue={post.about_company} required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="eligibility" className="form-label">Eligibility</label>
                            <input type="text" className="form-control" id="eligibility" name="eligibility" defaultValue={post.eligiblity} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ctc" className="form-label">CTC</label>
                            <input type="text" className="form-control" id="ctc" name="ctc"  defaultValue={post.ctc} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rounds" className="form-label">Rounds</label>
                            <input type="text" className="form-control" id="rounds" name="rounds" defaultValue={post.rounds} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" rows="3" defaultValue={post.desc} required></textarea>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdatePost;
