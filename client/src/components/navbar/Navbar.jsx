import React, { useContext } from 'react'
import "./navbar.css"
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const {user} = useContext(AuthContext)
    return (
        <div className="navbar">
          <div className="navContainer">
        
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
               <img className="logo" src="https://onlinebooking.vn/wp-content/uploads/online-booking-logo-no-1.png" alt="" />
            </Link>

            {user ? (<h1>Account: {user.username}</h1>) : (
            <div className="navItems">
              {/* <button className="navButton" >List your Hotel</button> */}
              <button className="navButton" >Register</button>
              <button className="navButton" >Login</button>
            </div>
            )}
          </div>
        </div>
      )
}

export default Navbar
