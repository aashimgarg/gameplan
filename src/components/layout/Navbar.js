import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = props =>{
    const { isValidate , userData } = props
    const links = isValidate 
                ? <SignedInLinks userData={userData}  /> 
                : <SignedOutLinks />
    return (
       <nav className = "nav-wrapper grey darken-3">
           <div className ="container">
               <Link style={{outline:'none'}} to='/' className="brand-logo"> GamePlan</Link>
           </div>
           { links }
       </nav>  
    )
}

const mapStateToProps = state => {
    return {
        isValidate:state.auth.isValidate,
        userData:state.auth.userData
    }
}

export default connect(
    mapStateToProps
)(Navbar);