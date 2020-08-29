import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = ({
    signOut , 
    userData
    }) =>{
    return (
      <ul className ="right">
          <li>
              <NavLink style={{outline:'none'}}to='/create'>
                  New Project
              </NavLink>
          </li>
          <li>
              <NavLink style={{outline:'none'}}to='/myprojects'>
                  My Projects
              </NavLink>
          </li>
          <li>
              <a style={{outline:'none'}}onClick = {signOut}>
                  Log Out
              </a>
          </li>
          <li>
              <NavLink to='/' className ='btn btn-floating blue lighten-1'>
                  {userData.initials}
              </NavLink>
          </li>
      </ul> 
    )
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(
    null,
    mapDispatchToProps
) (SignedInLinks)