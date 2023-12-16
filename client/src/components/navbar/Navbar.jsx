import React from 'react'
import "./navbar.css"
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
          <div className="navContainer">
            
           
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
               <img className="logo" src="https://onlinebooking.vn/wp-content/uploads/online-booking-logo-no-1.png" alt="" />
            </Link>

            
            <div className="navItems">
              <button className="navButton" >List your Hotel</button>
              <button className="navButton" >Register</button>
              <button className="navButton" >Login</button>
            </div>
          </div>
        </div>
      )
}

export default Navbar
