import React, { Component } from 'react'
import { connect } from 'react-redux'
import { forgetPassword } from '../../store/actions/authActions'
import Spinner from "../spinner";

class ResetPassword extends Component {
  state = {
    email: '',
    password:''
  }

  handleChange = (e) => {
    const { id, value } = e.target
    this.setState({
      [id]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.forgetPassword(this.state.email);
  }

  render() {
    const {
      isSendingMail,
      failure,
      success,
      auth
    } = this.props

    return (
      <div className="container">
        <form style={{ width: '85%' }} className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Reset Password</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
              <div style={{ justifyContent: 'center', display: 'flex' }}>
                Reset&nbsp;
                  {isSendingMail ? (
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
              {failure ? (
                <div className="login-error-message">
                  <i className="fa fa-sign-in" aria-hidden="true"></i>
                  <strong>Invalid credentials!</strong>
                </div>
              ) : success ? (
                <div className="login-error-message">
                  <i className="fa fa-sign-in" aria-hidden="true"></i>
                  <strong>Email sent!</strong>
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSendingMail: state.auth.isForgetPasswordRequested,
    success: state.auth.isPasswordResetEmailSend,
    failure: state.auth.forgetPasswordFailure,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forgetPassword: (email) => dispatch(forgetPassword(email))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword)
