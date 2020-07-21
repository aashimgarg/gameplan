import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Spinner from "../spinner";

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  render() {
    const {
       authError , 
       auth ,
       isLoggingUp
      } = this.props
      
    if (auth.uid) {
      return <Redirect to = '/' />
    }

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
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
            <div className= "red-text center">
              { authError ? <p> {authError} </p>  : null }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth:state.firebase.auth,
    isLoggingUp:state.auth.isLoggingUp
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
