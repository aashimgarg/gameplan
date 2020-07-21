import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp} from '../../store/actions/authActions'
import Spinner from "../spinner";

class SignUp extends Component {

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state)
  }
  render() {
    const { 
       auth ,
       authError,
       isSigningUp
      } = this.props
     
    if (auth.uid) {
      return <Redirect to = '/' />
    }
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
             <div style ={{justifyContent:'center',display: 'flex'}}>
                Sign Up&nbsp;
                  {isSigningUp ? (
                    <Spinner 
                      style={{ margin: "0px 10px"}}
                      color="white"
                      width="16px"
                      height="16px"
                    />
                  ) : null}
             </div>
            </button>
            <div className = "red-text center">
              { authError ? <p> { authError} </p> : null }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    isSigningUp: state.auth.isSigningUp
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (userData) => dispatch(signUp(userData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)