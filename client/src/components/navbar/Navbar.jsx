import React from 'react'
import "./navbar.css"
const Navbar = () => {
    return (
        <div className="navbar">
          <div className="navContainer">
            {/* <div className="navTitle"> */}
              {/* <span className="title" >Hotel Booking</span> */}
               <img className="logo" src="https://onlinebooking.vn/wp-content/uploads/online-booking-logo-no-1.png" alt="" />
            {/* </div> */}
            
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
