import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <div>

        <h1>Navbar</h1>

       
        {props.isauth ?(<><Link to="/">Home</Link> <br /> 
        <Link to="/changepassword">ChangePassword</Link> <br /> 
        <Link to="/logout">Logout</Link> <br />
        </>) : (<> <Link to="/">Home</Link> <br /> 
        <Link to="/home">create post</Link> <br />
        <Link to="/login">Login</Link> <br /></>)}
        
    </div>
  )
}


export default Navbar