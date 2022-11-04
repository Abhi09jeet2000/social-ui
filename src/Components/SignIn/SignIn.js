import React, { Component } from 'react'

import './SignIn.css'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <input
          className="loginpage_text"
          type="text"
          placeholder="Phone number, username, or email"
        />
        <input
          className="loginpage_text"
          type="password"
          placeholder="Password"
        />
        <button className="loginpage_button">Log In</button>
      </div>
    )
  }
}
export default SignIn
