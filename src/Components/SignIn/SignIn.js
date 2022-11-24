import React, { Component } from 'react'

import './SignIn.css'

import { app } from '../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailId: null,
      password: null,
    }
  }

  newSignUp = () => {
    const authentication = getAuth(app)
    signInWithEmailAndPassword(
      authentication,
      this.state.emailId,
      this.state.password,
    ).then((response) => {
      // navigate('/home')
      const user = response.user
      localStorage.setItem('users', user)
      window.location.reload()
      sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
    })
  }

  render() {
    return (
      <div>
        <input
          className="loginpage_text"
          type="text"
          placeholder="Phone number, username, or email"
          onChange={(event) => {
            this.state.emailId = event.currentTarget.value
          }}
        />
        <input
          className="loginpage_text"
          type="password"
          placeholder="Password"
          onChange={(event) => {
            this.state.password = event.currentTarget.value
          }}
        />
        <button className="loginpage_button" onClick={() => this.newSignUp()}>
          Log In
        </button>
      </div>
    )
  }
}
export default SignIn
