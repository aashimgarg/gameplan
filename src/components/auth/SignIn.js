import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Spinner from "../spinner";
import { Link } from "react-router-dom";


class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  
  handleChange = (e) => {
    const {id,value} = e.target
    this.setState({
      [id]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  render() {
    const {
       isLoggingUp ,
       loginError,
       isValidate
      } = this.props  

      if(isValidate)
      return <Redirect to='/' />

      return (
      <div className="container">
        <form style={{width:'85%'}} className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
              <div style ={{justifyContent:'center',display: 'flex'}}>
                Login&nbsp;
                  {isLoggingUp ? (
                    <Spinner 
                      style={{ margin: "0px 10px"}}
                      color="white"
                      width="16px"
                      height="16px"
                    />
                  ) : null}
             </div>
            </button>
            <div>
              <strong>
                {" "}
                <Link to="/resetPassword">Forgot your password?</Link>{" "}
              </strong>
            </div>
            <div className= "red-text center">
              { loginError ? (
                <strong> Invalid Credentials </strong> ) :
                 null }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggingUp: state.auth.isLoggingUp,
    loginError: state.auth.loginError,
    isValidate:state.auth.isValidate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
