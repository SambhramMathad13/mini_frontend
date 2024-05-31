import React, { useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Utils/Axios';
import { useQueryClient } from '@tanstack/react-query'


function Form() {
  const formRef = useRef(null);
  const [load, setload] = useState(false)
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  async function  handleSubmit(event){
    event.preventDefault();
    setload(true)
    const formData = new FormData(formRef.current);

    try {
      const res = await api.post('/api/uposts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      queryClient.setQueryData(['uposts'], (oldPosts) => {
        return [...oldPosts, res.data];
      });
    } catch (err) {
      console.log(err);

    } finally {
      setload(false)
      navigate('/home');
    }
  };

  return (load ? (<h1>Loading...</h1>) : (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card bg-dark text-white" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body bg-white text-dark p-4 rounded">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="usn" className="form-label">USN</label>
              <input type="text" className="form-control" id="usn" name="usn" required />
            </div>

            <div className="mb-3">
              <label htmlFor="branch" className="form-label">Branch</label>
              <input type="text" className="form-control" id="branch" name="branch" required />
            </div>

            <div className="mb-3">
              <label htmlFor="link" className="form-label">Link (Google Drive link)</label>
              <input type="url" className="form-control" id="link" name="link"  />
            </div>
            
            <div className="mb-3">
              <label htmlFor="socialLink" className="form-label">Social Link</label>
              <input type="url" className="form-control" id="socialLink" name="social_link"  />
            </div>

            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input type="text" className="form-control" id="companyName" name="company" required />
            </div>
            <div className="mb-3">
              <label htmlFor="aboutCompany" className="form-label">About Company</label>
              <textarea className="form-control" id="aboutCompany" name="about_company" rows="3" required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="eligibility" className="form-label">Eligibility</label>
              <input type="text" className="form-control" id="eligibility" name="eligiblity" required />
            </div>
            <div className="mb-3">
              <label htmlFor="ctc" className="form-label">CTC</label>
              <input type="text" className="form-control" id="ctc" name="ctc" required />
            </div>
            <div className="mb-3">
              <label htmlFor="rounds" className="form-label">Rounds</label>
              <input type="text" className="form-control" id="rounds" name="rounds" required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" name="desc" rows="3" required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">User image</label>
              <input type="file" name='image' accept="image/*" />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
  );
}

export default Form;
