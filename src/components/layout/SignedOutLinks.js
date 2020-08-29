import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () =>{
    return (
        <ul className ="right">
          <li>
              <NavLink style={{outline:'none'}}to='/signup'>
                  Signup
              </NavLink>
          </li>
          <li>
              <NavLink style={{outline:'none'}}to='/signin'>
                  Login
              </NavLink>
          </li>
      </ul>  
    )
}

export default SignedOutLinks;