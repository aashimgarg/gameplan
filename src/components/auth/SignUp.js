import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import Spinner from "../spinner";

class SignUp extends Component {

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    profileImage: {
      image: '',
      profileUrl: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  inputImageHandler = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    console.log(reader,event.target.files)
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        profileImage: {
          image: file,
          profileUrl: reader.result,
        }
      });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password,profileImage, ...data } = this.state
    this.props.signUp(email, password, data, profileImage)
  }
  render() {
    const {
      signUpError,
      isSigningUp,
      isValidate
    } = this.props

    if (isValidate) {
      return <Redirect to='/' />
    }

    return (
      <div className="container">
        <form style={{ width: '85%' }} className="white" onSubmit={this.handleSubmit}>
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
          <br />
          <div class="file-field input-field">
            <div class="btn">
              <span>Profile Pic</span>
              <input type="file"  onChange={this.inputImageHandler} />
            </div>
            <div class="file-path-wrapper">
              <input required class="file-path validate" type="text"/>
            </div>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
              <div style={{ justifyContent: 'center', display: 'flex' }}>
                Sign Up&nbsp;
                  {isSigningUp ? (
                  <Spinner
                    style={{ margin: "0px 10px" }}
                    color="white"
                    width="16px"
                    height="16px"
                  />
                ) : null}
              </div>
            </button>
            <div className="red-text center">
              {signUpError ?
                <p> Already have an account </p> : null}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isValidate: state.auth.isValidate,
    signUpError: state.auth.signUpError,
    isSigningUp: state.auth.isSigningUp,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (email, password, data,profileImage) => dispatch(signUp(email, password, data,profileImage))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)